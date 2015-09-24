var randographApp = angular.module('randographApp', ['ngResource']);

// RANDOGRAPH CONTROLLERS
randographApp.controller('RandographController', ['$scope', '$log', '$filter', 'InstagramFactory', 'PlaceholderFactory', 'PlaceHTTPFactory', 'GettyFactory', 'PostFactory', 'PostHTTP',
	function($scope, $log, $filter, InstagramFactory, PlaceholderFactory, PlaceHTTPFactory, GettyFactory, PostFactory, PostHTTP){
	$scope.project = "Randograph Generator";
	$scope.getPlace = function () {
		var data = PlaceholderFactory.query();
		console.log(data);
		$scope.album = data;
	};
	$scope.getInsta = function () {
		var data = InstagramFactory().query();
		console.log(data);
		$scope.album = data;
	};
	$scope.getGetty = function () {
		var data = GettyFactory.get();
		$scope.album = data;
		console.log(data);
	}
	$scope.gettyHttp = function () {
		$scope.album = PlaceHTTPFactory.query();
	};
		var postData = PostFactory.get({posId: 3});
		$scope.posts = postData;
		$log.log("Post Data: " + postData);
}]);

// RANDOGRAPH FACTORIES
randographApp.factory('InstagramFactory', ['$resource', function ($resource){
	return function (latatude, longatude, distance){
		//var instagram = $resource('https://api.instagram.com/v1/media/search?access_token=1575516998.f07020d.c738ca401e7f43078bdf5652eb352a7c&lat=41.87&lng=-87.62&distance=20');
		var shinstagram = $resource('https://api.instagram.com/v1/users/3/media/recent/?client_id=f07020d1fd964c5dbe15984c3a96893e', {}, {
			get: {
				method: 'GET',
				headers: {
					access_token: '1575516998.f07020d.c738ca401e7f43078bdf5652eb352a7c',
					response_type: 'token'
				}
			}
		});
		return shinstagram;
	}
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
	return $resource('http://jsonplaceholder.typicode.com/posts/:posId', {posId: 'id'});
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