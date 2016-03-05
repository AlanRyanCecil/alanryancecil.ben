'use strict';

angular.module('alandotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('root.animation', {
        url: '/animation',
        views: {
            'main@': {
                templateUrl: 'app/animation/animation.html',
                controller: 'AnimationCtrl'
            }
        }
      });
  });