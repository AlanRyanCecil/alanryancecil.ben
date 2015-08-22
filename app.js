var smallApp = angular.module('smallApp', ['ngRoute']);

smallApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/main', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})
		.when('/second', {
			templateUrl: 'views/science.html',
			controller: 'SecondController'
		});
}]);

smallApp.controller('MainController', ['$scope', function($scope){
	
}]);

smallApp.controller('SecondController', ['$scope', function($scope){
	
}]);