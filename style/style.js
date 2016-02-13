'use strict';
angular.module('mainApp')
    .controller('PageStyleController', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.on('$viewContentLoaded', function () {
            angular.element('#title').removeClass('blur');
        });
    }])