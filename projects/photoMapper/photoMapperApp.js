var photoMapperApp = angular.module('photoMapperApp', []);

// CONTROLLERS
photoMapperApp.controller('PhotoMapperController', ['$scope', 'PhotoMapFactory', 'PhotoLayerFactory', function ($scope, PhotoMapFactory, PhotoLayerFactory) {
	$scope.photoMapper = "Everything is under control.";
	PhotoLayerFactory.addHeatmapLayer(PhotoMapFactory.map);
}]);

/// FACTORIES
photoMapperApp.factory('PhotoMapFactory', [function (){
	var thisMap = {},
		mapCenter = new google.maps.LatLng(37.830615, -122.387867),
		mapOptions = {
			center: mapCenter,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			disableDefaultUI: true
		};
	thisMap.map = new google.maps.Map(document.getElementById('photoMap'), mapOptions);
	return thisMap;
}]);
photoMapperApp.factory('PhotoLayerFactory', ['$log', function ($log) {
	var thisLayerFactory = {};

	thisLayerFactory.addHeatmapLayer = function (map) {
		var heatmapData = [
			new google.maps.LatLng(37.782, -122.447),
			new google.maps.LatLng(37.785, -122.435)
		];
		var heatmap = new google.maps.visualization.HeatmapLayer({
			data: heatmapData
		});
		heatmap.setMap(map);
	};

	thisLayerFactory.addKmlLayer = function (map) {

	};
	return thisLayerFactory;
}]);

/// SERVICES
