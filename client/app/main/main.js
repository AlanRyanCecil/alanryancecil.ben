'use strict';

angular.module('alandotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('root.main', {
        url: '/main',
        views: {
            'main@': {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
                }
        }
      });
  });