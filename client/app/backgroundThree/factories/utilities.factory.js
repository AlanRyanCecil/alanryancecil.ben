'use strict';

angular.module('alandotApp').factory('Utilities', function(){

        function randomNumber (maximum) {
            return (Math.floor(Math.random() * ((maximum * 2) + 1)) - maximum);
        }

        function degToRad (deg) {
            return (Math.PI / 180) * deg;
        }

        return {
            randomNumber: randomNumber,
            degToRad: degToRad
        };
});