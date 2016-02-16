angular.module('mainApp')

    .directive('svgDirect', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'style/circle.html',
            link: function (scope, elem, attr) {
                
            }
        }
    })