var photoMapperApp = angular.module('photoMapperApp', []);

// CONTROLLERS
photoMapperApp.controller('PhotoMapperController', ['$scope', function ($scope) {
	$scope.photoMapper = "Everything is under control.";
	$scope.initialze = function () {
		var mapOptions = {
			center: new google.maps.LatLng(37.830615, -122.387867),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			disableDefaultUI: true
		};
		var map = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);
	};
	$scope.$watch('$viewContentLoaded', function () {
		$scope.initialze();
		console.log("Fired!!!");
	});
}]);