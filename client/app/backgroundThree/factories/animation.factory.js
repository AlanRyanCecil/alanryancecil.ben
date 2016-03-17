'use strict';

angular.module('alandotApp').factory('Animation', function(){
    var Animation = {
        rotateObject: function ( object, xs, ys, zs ) {
            object.rotation.x += xs;
            object.rotation.y += ys;
            object.rotation.z += zs;
        }
    };
    return Animation;
})