var earthquakeTrackerApp = angular.module('earthquakeTrackerApp', []);

/// CONTROLLERS
earthquakeTrackerApp.controller('QuakeController', ['$scope', 'QuakeMapFactory', function ($scope, QuakeMapFactory) {
	$scope.project = "Well it's not the latest technology, but hey, it's technology.";
}]);

/// FACTORIES
earthquakeTrackerApp.factory('QuakeMapFactory', [function () {
	var thisQuakeMap = {},
		mapCenter = new google.maps.LatLng(37, -120),
		mapOptions = {
			center: mapCenter,
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.HYBRID,
			disableDefaultUI: true
		};
	thisQuakeMap.map = new google.maps.Map(document.getElementById('quakeMap'), mapOptions);

	return thisQuakeMap;
}])