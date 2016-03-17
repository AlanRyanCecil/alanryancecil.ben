'use strict';

angular.module('alandotApp').factory('Cloud', function(Utilities){

    function create (number, size, color, X, Y, Z, hole ) {
        var cloud = new THREE.Object3D();
        var count = 0;

        while (count < number) {
            var bird = new THREE.Geometry();
            bird.speed = Number((Math.abs(Utilities.randomNumber(200)) * 0.00001).toFixed(5));
            var feather = new THREE.Vector3();
            feather.x = Utilities.randomNumber(X);
            var YR = Utilities.randomNumber(Y);
            feather.y = Math.log2(YR) * 30;
            feather.z = Utilities.randomNumber(Z);
            var distance = feather.length();
            if ( distance > hole && distance < X ) {
                bird.vertices.push( feather );
                cloud.add(new THREE.Points(bird, new THREE.PointsMaterial({color: color, size: size})));
                count++;
            }
        }
        return cloud;
    }
    return create;
})