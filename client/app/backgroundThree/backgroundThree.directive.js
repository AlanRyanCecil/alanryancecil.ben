'use strict';

angular.module('alandotApp')
  .directive('backgroundThree', function ($log, CreateRenderer, Utilities, Animation, Cloud) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        var scene, svgScene,
                width = window.innerWidth,
                height = window.innerHeight,
                container = document.getElementById('three-scene'),
                fov = 50,
                aspect = width / height,
                near = 0.1,
                far = 10000,
                cameraTarget,
            camera = new THREE.PerspectiveCamera( fov, aspect, near, far ),
            svgCamera = new THREE.PerspectiveCamera( fov, aspect, near, far ),
            renderer,
                svgRenderer, cssRenderer,
            lightAmbient = new THREE.AmbientLight(),
                lightTop = new THREE.SpotLight(0xFFFFFF),
                deerLight,
                topLightHelper, // = new THREE.SpotLightHelper(lightTop),
            textLoader = new THREE.TextureLoader(),
            objLoader = new THREE.OBJLoader(),
            jsonLoader = new THREE.JSONLoader(),
            mouse = new THREE.Vector2( 20000, 0 ),
                mouseClick  = new THREE.Vector2(),
                onClickPosition = new THREE.Vector2(),
            raycaster = new THREE.Raycaster(),
                intersects,
                intersected,

            objectGroup = new THREE.Object3D(),
                cube,
                deer,
                frame,
                icosahedron,
                    icosahedronMaterial, wireMaterialIcosa,icosaPivot,
                torus, flock,
                sky, stars,
                    skyGeometry, skyWidth, skyHeight, skyPinch,
                ground,
                barn,
                oakTree, tree,
                    oakTreeTexture, oakTreeMaterial,
                wwwBenita, hello,
            videoStatic,
                movieScreen, movieGeometry, movieMaterial, videoImage, videoImageContext, videoTexture,

            gridHelper,
            benita,
            svgLoader = new THREE.SVGLoader(),
            endVar;

        window.addEventListener( 'resize', onWindowResize, false );
        window.addEventListener( 'scroll', scrollScene, false );


        function createPlane(w, h) {
            var material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.NoBlending });
            var geometry = new THREE.PlaneGeometry(w, h);
            var mesh = new THREE.Mesh(geometry, material);

            return mesh;
        }


        function createCssObject ( w, h, url ) {
            var html = [
                '<div>',
                    '<iframe src="' + url + '" width="' + w + '" height="' + h + '" frameBorder="0"></iframe>',
                '</div>'
            ].join('\n');

            var div = document.createElement('div');
            $(div).html(html);
            var cssObject = new THREE.CSS3DObject(div);

            return cssObject;
        }


        function create3dPage(w, h, url) {
            var group = new THREE.Object3D(),
                plane = createPlane( w, h ),
                cssObject = createCssObject( w, h, url);

            plane.scale.set(.1, .1, .1);
            cssObject.scale.set(.1, .1, .1);
            group.add(plane, cssObject);

            return group;
        }


        function createHtmlElement ( w, h, content ) {
            var element = document.createElement( 'div' );
            element.className = content;
            element.textContent = content;
            var object = new THREE.CSS3DObject( element );

            return object;
        }


        function createTextObject (text, font, color) {
            var width = 2048;
            var height = 512;
            var canvas = document.createElement('canvas');
            canvas.id = text;
            canvas.width = width;
            canvas.height = height;

            var context = canvas.getContext('2d');
            context.font = '20em ' + font;
            context.fillStyle = color;
            context.textAlign = 'center';
            context.fillText(text, width / 2, height - (height * .4));

            var texture = new THREE.Texture( canvas );
            texture.anisotropy = 4;
            texture.minFilter = THREE.LinearFilter;
            texture.needsUpdate = true;

            var plane = new THREE.Mesh(
                new THREE.PlaneGeometry(400, 100),
                new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
            );
            return plane
        }


        function scrollScene () {
            var minCam = ( ground.position.y + objectGroup.position.y + 10 );
            if ( camera.position.y >= minCam ) {
                var max_cam = 120,
                    min_cam = -10,
                    scrollPercentage = $(window).scrollTop() / $(window).height();

                camera.position.y = -(max_cam - min_cam) * scrollPercentage + min_cam;
            } else if ( camera.position.y <= minCam ) {
                camera.position.y = minCam;
            }
        }


        function onWindowResize () {
            width = window.innerWidth;
            height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize( width, height );
            svgRenderer.setSize( width, height );
            cssRenderer.setSize( width, height );
        }


        function createBgStaticVideo() {
            //video, videoImage, videoImageContext, videoTexture,

            // create the video element
            videoStatic = document.createElement( 'video' );
            // video.id = 'video';
            // video.type = ' video/ogg; codecs="theora, vorbis" ';
            videoStatic.src = '../../assets/video/236   tv_distortion_close.mp4';
            videoStatic.load(); // must call after setting/changing source
            videoStatic.muted = true;
            videoStatic.loop = true;
            videoStatic.play();
            videoStatic.name = "videoStatic";
            
            videoImage = document.createElement( 'canvas' );
            videoImage.width = 400;
            videoImage.height = 113;

            videoImageContext = videoImage.getContext( '2d' );

            // background color if no video present
            videoImageContext.fillStyle = '#000000';
            videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

            videoTexture = new THREE.Texture( videoImage );
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            
            movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, transparent: true, opacity: .2 } );

            // the geometry on which the movie will be displayed;
            //      movie image will be scaled to fit these dimensions.
            movieGeometry = new THREE.PlaneGeometry( 2400, 1600  * (226/400) );
            movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );

            // var movieScreen = new THREE.Mesh( movieGeometry, new THREE.MeshBasicMaterial({ color: 0xFF0000 }));
            movieScreen.position.set(0, 350, -2000);

            var moreStatic = movieScreen.clone();
            moreStatic.rotation.z = Utilities.$1(180);
            // moreStatic.position.set(0, 0, 0);

            objectGroup.add( movieScreen, moreStatic );
        }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        function initScene () {

            renderer = CreateRenderer.WebGl( width, height );
            svgRenderer = CreateRenderer.Svg( width, height );
            cssRenderer = CreateRenderer.Css( width, height );
            scene = new THREE.Scene();
            svgScene = new THREE.Scene();
            container.appendChild(renderer.domElement);
            container.appendChild(svgRenderer.domElement);
            container.appendChild(cssRenderer.domElement);

            camera.position.set(0, 0, 200);
            svgCamera.position.set(0, 60, 120);

            lightAmbient.intensity = .2;

            lightTop.position.set(-200, 50, 40);
                lightTop.target.position.set(0, 0, 0);
                lightTop.intensity = 1;
                lightTop.angle = Utilities.degToRad(90);
                lightTop.exponent = 50;
                lightTop.castShadow = true;
                lightTop.shadow.bias = 0;
                lightTop.shadow.mapSize.set(1024, 1024);
                lightTop.shadow.camera.near = 1;
                topLightHelper = new THREE.SpotLightHelper( lightTop );


////////////////////////////////////////////////////////////EXPERIMENTS/////////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            icosahedronMaterial = new THREE.MeshPhongMaterial({color: 0xBEE489, shading: THREE.FlatShading});
            wireMaterialIcosa = new THREE.MeshBasicMaterial({ color: 0xDDDDDD, wireframe: true, wireframeLinewidth: 1 });
            icosahedron = new THREE.SceneUtils.createMultiMaterialObject(
                new THREE.IcosahedronGeometry( 15, 1 ),
                [ icosahedronMaterial, wireMaterialIcosa ]);

                icosahedron.children[0].castShadow = true;
                // icosahedron.children[0].receiveShadow = true;
                icosahedron.children[1].scale.set(1.06, 1.06, 1.06);
                icosahedron.children[0].add( icosahedron.children[1] )
                icosahedron.children[0].position.set(-80, 50, 50);

            deerLight = new THREE.SpotLight(0xFFECBE, .3 );
                deerLight.castShadow = true;
                deerLight.position.set(-30, 100, -200);
                deerLight.target.position.set(20, 0, -320);
                objectGroup.add(deerLight);

            jsonLoader.load('../../assets/models/json/deer.json', function ( geometry ) {
                deer = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ color: 0xFFFFFF, shading: THREE.FlatShading }));
                deer.scale.set(4, 4, 4);
                deer.position.set( -5, 0, 0 );
                deer.rotation.y = Utilities.degToRad(30);
                deer.castShadow = true;
                // deer.add(deerLight);
                objectGroup.add( deer );
            });

            jsonLoader.load('../../assets/models/json/frame.json', function ( geometry ) {
                frame = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color: 0xD9D186, transparent: true, opacity: 1}) );
                objectGroup.add( frame );
            });

            jsonLoader.load('../../assets/models/json/tree.json', function (geometry) {
                tree = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0x23180E}));
                console.log("tree", tree);
                tree.rotation.x = Utilities.degToRad(90);
                tree.position.set(0, 30, -300);
                tree.scale.set(3, 3, 3);
                objectGroup.add(tree);
            });

            torus = new THREE.Mesh(
                new THREE.TorusGeometry( 240, 30, 10, 50 ),
                new THREE.MeshBasicMaterial({ color: 0xF7F5F1, shading: THREE.FlatShading, wireframe: true })
                );
                torus.rotation.x = Utilities.degToRad(90);
                torus.position.set(0, 150, -200);

            cube = new THREE.Mesh(
                new THREE.BoxGeometry( 50, 5, 50, 20, 2, 20 ),
                new THREE.MeshPhongMaterial({ color: 0xF7F7F7, shading: THREE.SmoothShading, }));
                cube.position.set(60, 5, 50);
                cube.rotation.y = Utilities.degToRad(45);
                cube.castShadow = true;
                console.log(cube);

            oakTreeTexture = new THREE.TextureLoader().load('../../assets/images/deer.png');
                oakTreeMaterial = new THREE.MeshBasicMaterial( {
                    map: oakTreeTexture,
                    transparent: true,
                    alphaTest: 0.1
                });

                var uniforms = { texture:  { type: "t", value: oakTreeTexture } },
                    vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent,
                    fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;
                oakTree = new THREE.Mesh( new THREE.PlaneGeometry( 150, 150, 30, 30 ), oakTreeMaterial );
                oakTree.customDepthMaterial = new THREE.ShaderMaterial( {
                    uniforms: uniforms,
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    // side: THREE.DoubleSide
                });

                oakTree.position.set(-60, 73, 20);
                oakTree.rotation.y = Utilities.degToRad(0);
                oakTree.receiveShadow = true;
                oakTree.castShadow = true;

            skyGeometry = new THREE.Geometry();
                skyWidth = 480, skyHeight = 300, skyPinch = 240;
                skyGeometry.vertices.push(
                    new THREE.Vector3(-skyWidth / 2, 0, 0),
                    new THREE.Vector3(skyWidth / 2, 0, 0),
                    new THREE.Vector3( (skyWidth / 2) - skyPinch, skyHeight, 0),
                    new THREE.Vector3( -(skyWidth / 2) + skyPinch, skyHeight, 0)
                    )
                skyGeometry.faces.push( new THREE.Face3( 0, 1, 2));
                skyGeometry.faces.push( new THREE.Face3( 2, 3, 0));

                var skyHighColor = new THREE.Color( 0x3600B2 );
                var skyLowColor = new THREE.Color( 0x77CCFF );
                skyGeometry.faces[0].vertexColors[0] = skyLowColor;
                skyGeometry.faces[0].vertexColors[1] = skyLowColor;
                skyGeometry.faces[0].vertexColors[2] = skyHighColor;
                skyGeometry.faces[1].vertexColors[0] = skyHighColor;
                skyGeometry.faces[1].vertexColors[1] = skyHighColor;
                skyGeometry.faces[1].vertexColors[2] = skyLowColor;

            sky = new THREE.Mesh( skyGeometry, new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors }) );
                sky.position.set(0, 0, -400);

            stars = Cloud(300, .5, 0x7BDCFF, 500, 300, 500, 0);
            stars.position.set(0, 150, -250);

            ground = new THREE.Mesh(
                new THREE.BoxGeometry( 480, 550, .1, 48, 55, 1 ),
                new THREE.MeshPhongMaterial({ color: 0x995522, shading: THREE.FlatShading, }));
                ground.rotation.x = Utilities.degToRad(-90);
                ground.up = new THREE.Vector3( 1, 0, 0 );
                ground.position.set(0, 0, -130);
                ground.receiveShadow = true;


//////////////////////////////////                          TEXT                             /////////////////////////////////////////////////////////


            wwwBenita = create3dPage( 900, 600, 'http://benitawlee.com/');
                wwwBenita.position.set(-110, 120, -100);
                wwwBenita.castShadow = true;
                // objectGroup.add(wwwBenita);

            hello = createTextObject('Hello Benita', 'Amatic SC', '#E8DED5');
            hello.position.set(0, 320, -140);

            var love = createTextObject('I love you', 'Amatic SC', '#3BB19F');
            love.position.set(0, 8, 130);
            love.scale.set(.25, .25, .25);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            gridHelper = new THREE.GridHelper(400, 20);
                gridHelper.position.set(0, -1, 0);

                objectGroup.add(
                    sky,
                    stars,
                    // flock,
                    // icosahedron,
                    // torus,
                    // oakTree,
                    // tree,
                    ground,
                    // cube,
                    hello,
                    love,
                    lightTop.target,
                    deerLight.target,
                    gridHelper
                );
                objectGroup.position.set(0, -250, 0);


            scene.add(
                camera,
                lightAmbient,
                lightTop,
                objectGroup
                );
            // createBgStaticVideo();
            
        }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function renderStaticBgVideo () {
            videoImageContext.drawImage( videoStatic, 0, 0 );
            videoTexture.needsUpdate = true;
        }

        var elev = .001;
        function fly () {
            flock.children.forEach(function(elem){
                Animation.rotateObject( elem, 0, elem.geometry.speed, 0 );
                var posy = elem.position.y;
            })
        }

        function render () {
            // Animation.rotateObject( torus, 0, 0, -0.001 );
            // Animation.rotateObject( birds, 0, 0, -0.001 );
            Animation.rotateObject(stars, 0, -.0002, 0);
            Animation.rotateObject( icosahedron.children[0], .0003, .001, .0002 );
            renderer.render(scene, camera);
            // svgRenderer.render(svgScene, svgCamera);
            // cssRenderer.render( scene, camera );
            requestAnimationFrame( render );

            topLightHelper.update();
            // renderStaticBgVideo();
        }

        initScene();
        render();

      }
    };
  });