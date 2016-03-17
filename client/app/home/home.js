'use strict';

angular.module('alandotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('root.home', {
        url: '/',
        views: {
            'main@': {
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl'
            }
        }
      });
  });