var randographApp = angular.module('randographApp', ['ngResource', 'ngAnimate']);

// RANDOGRAPH CONTROLLER
randographApp.controller('RandographController', ['$scope', '$log', '$filter', 'InstagramFactory', 'MapService',
	function($scope, $log, $filter, InstagramFactory, MapService){

	$scope.project = "Randograph Generator";
	$scope.getInsta = function (lat, lng) {
		var params =  {lat: lat, lng: lng, distance: '200', count: '32'};   
		InstagramFactory.query(params, function (response) {
			$scope.album = response.data;
			console.log($scope.album);
		});
	};
	$scope.updatePhotos = function (center) {
		var lat = center.lat(),
			lng = center.lng();
		$scope.getInsta(lat, lng);
	};
	$scope.setImage = function (element) {
		$scope.currentPhoto = $scope.album[element];
	};
	$scope.timeTaken = function (date) {
		var drate =  {};
			drate.day = $filter('date')(date * 1000, 'EEEE, MMMM d');
			drate.clock = $filter('date')(date * 1000, 'h:mm a');
		return drate;
	};

	$scope.$watch('$viewContentLoaded', function () {
		$scope.updatePhotos(MapService.map.getCenter());
	});
	MapService.map.addListener('dragend', function () {
		var center = MapService.map.getCenter();
		$scope.updatePhotos(center);
	});
	MapService.map.addListener('click', function () {
		var center = MapService.map.getCenter();
		$scope.updatePhotos(center);
	});
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
		mapCenter = new google.maps.LatLng(37.759703, -122.428093),
		mapOptions = {
			center: mapCenter,
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
		radius: 200,
		clickable: false
	});
	thisMap.map.addListener('bounds_changed', function () {
		sampleCircle.setCenter(thisMap.map.getCenter());
	});
	thisMap.map.addListener('click', function (event) {
		thisMap.map.panTo(event.latLng);
	});
	return thisMap;
}]);


randographApp.controller('GalleryController', ['$log', function($log){

}]);
// RANDOGRAPH DIRECTIVES
randographApp.directive('galleryFade', ['$log', function($log){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		restrict: 'E',
		controller: 'GalleryController',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}]);