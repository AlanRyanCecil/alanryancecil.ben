'use strict';

angular.module('alandotApp').factory('CreateRenderer', function(){
    var CreateRenderer = {

        WebGl: function (width, height) {
            var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

            renderer.setSize( width, height );
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x000000);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = 0;
            renderer.domElement.style.zIndex = 1;
            return renderer;
        },

        Svg: function (width, height) {
            var svgRenderer = new THREE.SVGRenderer();

            svgRenderer.setSize( width, height );
            svgRenderer.setPixelRatio( window.devicePixelRatio );
            svgRenderer.setClearColor(0x000000, 0);
            svgRenderer.domElement.style.position = 'absolute';
            svgRenderer.domElement.style.top = 0;
            svgRenderer.domElement.style.left = 0;
            svgRenderer.domElement.style.zIndex = 1;
            return svgRenderer;
        },

        Css: function (width, height) {
            var cssRenderer = new THREE.CSS3DRenderer({alpha: true});

            cssRenderer.setSize( width, height );
            cssRenderer.setClearColor(0x000000, 0);
            cssRenderer.domElement.style.position = 'absolute';
            cssRenderer.domElement.style.top = 0;
            cssRenderer.domElement.style.zIndex = 0;
            return cssRenderer;
        }
    };
    return CreateRenderer;
})