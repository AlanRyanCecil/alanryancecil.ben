var randographApp = angular.module('randographApp', ['ngResource', 'ngAnimate']);

// RANDOGRAPH CONTROLLER
randographApp.controller('RandographController', ['$scope', '$log', '$filter', 'InstagramFactory', 'MapService',
	function($scope, $log, $filter, InstagramFactory, MapService){

	$scope.project = "Randograph Generator";
	$scope.getInsta = function (lat, lng) {
		var params =  {lat: lat, lng: lng, distance: '200', count: '21'};   
		InstagramFactory.query(params, function (response) {
			$scope.album = response.data;
			console.log($scope.album);
		});
	};

	$scope.updatePhotos = function () {
		var center = MapService.map.getCenter(),
			lat = center.lat(),
			lng = center.lng();
		$scope.getInsta(lat, lng);
	};
	$scope.$watch('$viewContentLoaded', function () {
		$scope.updatePhotos();
	});
	MapService.map.addListener('dragend', function () {
		$scope.updatePhotos();
	});
	

	$scope.timeTaken = function (date) {
		return $filter('date')(date * 1000, 'EEEE, MMMM d h:mm a');
	};
}]);

// RANDOGRAPH FACTORIES
randographApp.factory('InstagramFactory', ['$resource', function ($resource){
	var access_token = '1575516998.f07020d.c738ca401e7f43078bdf5652eb352a7c';
	var endpoint = 'https://api.instagram.com/v1/media/search?access_token=' + access_token + '&callback=JSON_CALLBACK';
	return $resource(endpoint, {}, {
		query: {method: 'JSONP'}
	});
}]);

// RANDOGRAPH SERVICES
randographApp.service('MapService', ['$log', function($log){
	var thisMap = {},
		mapOptions = {
			center: new google.maps.LatLng(37.759703, -122.428093),
			zoom: 17,
			disableDefaultUI: true
		};
		thisMap.map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var sampleCircle = new google.maps.Circle({
		fillColor: '#0099FF',
		fillOpacity: .15,
		strokeColor: '#0099FF',
		strokeOpacity: .2,
		map: thisMap.map,
		center: thisMap.map.getCenter(),
		radius: 200
	});
	thisMap.map.addListener('bounds_changed', function () {
		sampleCircle.setCenter(thisMap.map.getCenter());
	});
	return thisMap;
}]);
randographApp.service('glop', [function(){
		console.log('glop');
}]);