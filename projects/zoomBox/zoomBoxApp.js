var zoomBoxApp = angular.module('zoomBoxApp', []);

// CONTROLLERS
zoomBoxApp.controller('ZoomBoxController', ['$scope', function ($scope) {
	$scope.project = "Zoom Box!";
}]);

// DIRECTIVES
zoomBoxApp.directive('zoomBox', ['$log', '$interval', function ($log, $interval) {
	var zoom = function (scope, elem, attrs) {
		var speed = attrs.speed || 50,
			depth = attrs.depth || 10;

		elem.mouseenter(function (event) {
			var build = function () {
				var boxesCreated = elem.children('.shine').length,
					space = attrs.space * (boxesCreated + 1),
					high = elem.height() - space,
					wide = elem.width() - space,
					color = Number(attrs.color) + space,
					box = '<div class="shine" style="height: ' + 
						high + 'px; width: ' + 
						wide + 'px; top: ' + 
						space/2 + 'px; left: ' + 
						space/2 + 'px; position: absolute; background-color: #' + 
						color + ';"></div>';
				elem.append(box);
			};
			var inMotion = $interval(build, speed, depth);
			elem.mouseleave(function (){$interval.cancel(inMotion)});
		});
		elem.mouseleave(function (event) {
			var startDepth = elem.children('.shine').length || 1;
			var destroy = function () {
				var boxes  = elem.children('.shine'),
				numb = boxes.length - 1;
				if (numb >= 0) {
					boxes[numb].remove();
				}
			};
			$interval(destroy, speed, startDepth);
		});
	};
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'projects/zoomBox/directives/zoomBox.html',
		link: zoom,
		scope: {
			height: "@",
			width: "@",
			color: "@"
			// attrs: speed, depth, space
		}
	}
}]);