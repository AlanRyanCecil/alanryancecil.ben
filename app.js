var arcomApp = angular.module('arcomApp', ['ngRoute']);

arcomApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})
		.when('/science', {
			templateUrl: 'views/science.html',
			controller: 'ScienceController'
		})
		.when('/wow', {
			templateUrl: 'views/wow.html',
			controller: 'WowController'
		})
		.otherwise({
            redirectTo: '/'
        });
}]);

arcomApp.controller('MainController', ['$scope', function($scope){
	
}]);

arcomApp.controller('ScienceController', ['$scope', function($scope){

}]);

arcomApp.controller('WowController', ['$scope', function($scope){
	
}]);

arcomApp.controller('IndexController', ['$scope', '$location',function($scope){

}]);