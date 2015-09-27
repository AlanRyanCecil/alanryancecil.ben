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
		// $scope.addKmlLayer(map);
		$scope.addHeatmapLayer(map);
	};
	$scope.$watch('$viewContentLoaded', function () {
		$scope.initialze();
	});

	$scope.addKmlLayer = function (map) {
		var offasDykeLayer = new google.maps.KmlLayer('http://hikeview.co.uk/tracks/hikeview-offas-dyke.kml');
		var sanFranciscoVisit = new google.maps.KmlLayer('http://www.city-sightseeing.us/locations.kml');
		sanFranciscoVisit.setMap(map);
	};
	$scope.addHeatmapLayer = function (map) {
		var heatmapData = [
		  new google.maps.LatLng(37.782, -122.447),
		  new google.maps.LatLng(37.785, -122.435)
];
		var heatmap = new google.maps.visualization.HeatmapLayer({
			data: heatmapData
		});
		heatmap.setMap(map);
	};
}]);