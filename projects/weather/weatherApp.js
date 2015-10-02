var weatherApp = angular.module('weatherApp', ['ngResource']);


/// WEATHER CONTROLLERS
weatherApp.controller('WeatherController', ['$scope', '$location', '$stateParams', 'cityService', 'weatherService', function ($scope, $location, $stateParams, cityService, weatherService) {
	$scope.city = cityService.city;
	$scope.days = $stateParams.days || '2';
	$scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);

	$scope.$watch('city', function () {
		cityService.city = $scope.city; 
	});
	$scope.submit = function () {
		$location.path('/forecast/2');
	};
	$scope.convertToFahrenheight = function (degK) {
		return Math.round(1.8 * (degK - 273)) + 32 + "˚ F";
	};
	$scope.convertToDate = function (dt) {
		return new Date(dt * 1000);
	};
}]);


/// WEATHER SERVICES
weatherApp.service('cityService', [function () {
	this.city = "No Name, CO";
}]);

weatherApp.service('weatherService', ['$resource', function($resource){
	this.getWeather = function (city, days) {
	var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
                callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
		return weatherAPI.get({q: city, cnt: days});
	};	
}]);


/// DIRECTIVES

weatherApp.directive('weatherReport', function () {
	return {	
		restrict: 'E',
		templateUrl: 'projects/weather/weatherReport.html',
		replace: true,
		scope: {
			weatherDay: "=",
			convertToStandard: "&",
			convertToDate: "&",
			dateFormat: "@"
		}
	}
});