///		GENTETIFY 
var genetifyApp = angular.module('genetifyApp', []);


///		CONTROLLERS
genetifyApp.controller('GenetifyController', ['$scope', '$element', 'GeneService', function ($scope, $element, GeneService) {
	$scope.gene = "Monkeys" + " " + GeneService.stuff;
}]);


///		SERVICES
genetifyApp.service('GeneService', [function () {
	this.stuff = "poo";
}]);


/// DIRECTIVES
genetifyApp.directive('direct', ['$compile', '$interval', function ($compile, $interval) {
	var linkFunk = function (scope, elem, attrs) {
		var space = 10;
		var created = 1;
		var build = function () {
			var indent = space * created;
			var height = attrs.height - indent;
			var width = attrs.width - indent;
			var top = (indent / 2) - 2;
			var left = (indent / 2) - 2;

			elem.append('<div id="' + created + '" class="mouseFade" style="height: ' +
				height + 'px; width: ' +
				width + 'px; top: ' +
				top + 'px; left: ' +
				left + 'px; border: 2px solid black; padding: 0; margin: 0 auto; float: left; position: absolute; display: inline-block"></div>');
		};
		while (created < 30) {
			build();
			created++;
		};
		var lastId = 0;
		elem.mouseover(function (event) {
			elem.children('.dark').removeClass('dark');
			var currentId = event.target.id;
			for (var i = 1; i < currentId; i++) {
				elem.children('#' + i ).addClass('dark');
			}
		});
		elem.mouseleave(function (event) {
			elem.children('.dark').removeClass('dark');
		});
	};
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'projects/genetify/direct.html',
		link: linkFunk,
		scope: {
			height: "@",
			width: "@"
		}
	}
}]);