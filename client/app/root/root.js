'use strict';

angular.module('alandotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('root', {
        abstract: true,
        url: '',
        views: {
            'background': {
                templateUrl: 'app/background/background.html',
                controller: 'BackgroundCtrl'
            },
            'header': {
                templateUrl: 'app/header/header.html',
                controller: 'HeaderCtrl'
            },
            'sidenav': {
                templateUrl: 'app/sidenav/sidenav.html',
                controller: 'SidenavCtrl'
            },
            'footer': {
                templateUrl: 'app/footer/footer.html',
                controller: 'FooterCtrl'
            }
        }
      });
  });