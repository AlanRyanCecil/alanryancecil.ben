'use strict';

angular.module('alandotApp')
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('amber', {
                'default': '50'
            })
            .accentPalette('amber', {
                'default': '100'
            });
    })