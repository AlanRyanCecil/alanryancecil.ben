var randographApp = angular.module('randographApp', ['ngResource']);

// RANDOGRAPH CONTROLLERS
randographApp.controller('RandographController', ['$scope', '$filter', 'InstagramFactory', 'PlaceholderFactory', function($scope, $filter, InstagramFactory, PlaceholderFactory){
	$scope.project = "Randograph Generator";
	$scope.getPlace = function () {
		var data = PlaceholderFactory().query();
		console.log(data);
		$scope.album = data;
	};
	$scope.getInsta = function () {
		var data = InstagramFactory().query();
		console.log(data);
		$scope.album = data;
	};
	$scope.testFunk = function (lat, lon, dist) {
		console.log("Test: " + lat + " " + lon + " " + dist);
	};
}]);

// RANDOGRAPH FACTORIES
randographApp.factory('InstagramFactory', ['$resource', function ($resource){
	return function (latatude, longatude, distance){
		var instagram = $resource('https://instagram.com/oauth/authorize/?client_id=f07020d1fd964c5dbe15984c3a96893e&redirect_uri=http://www.alanryancecil.com&response_type=code');
		return instagram;
	};
}]);

randographApp.factory('PlaceholderFactory', ['$resource', function ($resource) {
	return function () {
		var data = $resource('http://jsonplaceholder.typicode.com/photos');
		return data;
	};
}]);