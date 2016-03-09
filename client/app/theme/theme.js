'use strict';

angular.module('alandotApp')
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('orange', {
                'default': '900'
            })
            .accentPalette('blue-grey');
    })