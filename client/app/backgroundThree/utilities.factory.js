'use strict';

angular.module('alandotApp').factory('Utilities', function(){
    var Utilities = {

        randomNumber: function (maximum) {
            return (Math.floor(Math.random() * ((maximum * 2) + 1)) - maximum);
        },

        degToRad: function (deg) {
            return (Math.PI / 180) * deg;
        }
    };
    return Utilities;
})