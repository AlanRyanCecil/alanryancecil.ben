var randographApp = angular.module('randographApp', ['ngResource']);

// RANDOGRAPH CONTROLLERS
randographApp.controller('RandographController', ['$scope', '$log', '$filter', 'InstagramFactory', 'PlaceholderFactory', 'PlaceHTTPFactory', 'GettyFactory', 'PostFactory', 'PostHTTP',
	function($scope, $log, $filter, InstagramFactory, PlaceholderFactory, PlaceHTTPFactory, GettyFactory, PostFactory, PostHTTP){
	$scope.project = "Randograph Generator";
		$scope.mapOptions = {
			center: new google.maps.LatLng(37.759703, -122.428093),
			zoom: 18,
			disableDefaultUI: true
		};
		$scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
		$scope.map.addListener('dragend', function () {
			$scope.updatePhotos();
		});
	$scope.updatePhotos = function () {
		var center = $scope.map.getCenter();
		var lat = center.lat();
		var lng = center.lng();
		$scope.getInsta(lat, lng);
	}
	$scope.getPlace = function () {
		var data = PlaceholderFactory.query();
		console.log(data);
		$scope.album = data;
	};
	$scope.getInsta = function (lat, lng) {
		var params =  {lat: lat, lng: lng, distance: '200', count: '21'};   
		InstagramFactory.query(params, function (response) {
			$scope.album = response.data;
			console.log($scope.album);
		});
	};
	$scope.getGetty = function () {
		var data = GettyFactory.get();
		$scope.album = data;
		console.log(data);
	};
	$scope.gettyHttp = function () {
		$scope.album = PlaceHTTPFactory.query();
	};
	$scope.$watch('$viewCOntentLoaded', function () {
		$scope.updatePhotos();
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
randographApp.factory('PlaceholderFactory', ['$resource', function ($resource) {
		return $resource('http://jsonplaceholder.typicode.com/photos');
}]);
randographApp.factory('GettyFactory', ['$resource', function ($resource) {
	return $resource('https://api.gettyimages.com:443/v3/search/images', {}, {
		get: {
			method: 'GET',
			headers: {
				key: '6v8sm7xqjh36dseakm8gyc33'
			}
		}
	})
}]);
randographApp.factory('PostFactory', ['$resource', function ($resource) {
	return $resource('http://jsonplaceholder.typicode.com/posts/:posId', {posId: '@id'});
}]);
randographApp.factory('PostHTTP', ['$http', function ($http) {
	return {
		getPost: function () {
			 $http.get('http://jsonplaceholder.typicode.com/posts');
		}
	}
}]);
randographApp.factory('PlaceHTTPFactory', ['$http', function ($http) {
	var data = $http.get('http://jsonplaceholder.typicode.com/photos');
	return data;
}]);