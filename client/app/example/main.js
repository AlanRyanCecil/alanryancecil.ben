'use strict';

angular.module('alandotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('root.example', {
        url: '/example',
        views: {
            'main@': {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
                }
        }
      });
  });