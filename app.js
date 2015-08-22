var arcomApp = angular.module('arcomApp', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainController',
				controllerAs: 'main'
			})
			.when('/science', {
				templateUrl: 'views/science.html',
				controller: 'ScienceController',
				controllerAs: 'science'
			})
			.when('/wow', {
				templateUrl: 'views/wow.html',
				controller: 'WowController',
				controllerAs: 'wow'
			})
			.otherwiser({
				redirecTo: '/'
			});
	}])
	.controller('MainController', function () {

	})
	.controller('ScienceController', function () {

	})
	.controller('WowController', function () {

	});