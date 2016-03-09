'use strict';

angular.module('alandotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('root.temp', {
        url: '/temp',
        views: {
            'main@': {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
                }
        }
      });
  });