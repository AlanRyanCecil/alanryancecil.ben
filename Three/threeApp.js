var helloCube = (function () {
    'use strict';

    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    var light = new THREE.AmbientLight( 0xffffff );
    var camera;
    var box;

    function initScene () {
        renderer.setSize( 500, 500 );

        renderer.setClearColor(0x555555, 0);
        document.getElementById('webgl-container').appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera( 45, 1, 0.1, 1000 );
        // camera.position.x = 0;
        // camera.position.y = -120;
        camera.position.z = 50;
        scene.add( camera );

        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(15, 60, 2),
            new THREE.MeshBasicMaterial( {
                color: 0xDDDDDD,
                transparent: true,
                opacity: 1,
                wireframe: true
            } )
        );
        scene.add(sphere);

        var triMaterial = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors,
            side: THREE.DoubleSide
        })

        var triangleGeometry = new THREE.Geometry();
        triangleGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
        triangleGeometry.vertices.push(new THREE.Vector3(-10, -10, 0));
        triangleGeometry.vertices.push(new THREE.Vector3(10, -10, 0));
        triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

        triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFFFF00);
        triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FFFF);
        triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0xFF00FF);


        var manualGeometry = new THREE.Mesh(triangleGeometry, triMaterial);

        render();

        function render () {
            sphere.rotation.z = 45 * (Math.PI / 180);
            sphere.rotation.x += 0.01;
            // sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
    }

    window.onload = initScene;

    return {
        scene: scene
    }

})();