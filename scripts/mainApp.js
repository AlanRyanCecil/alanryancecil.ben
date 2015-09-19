var mainApp = angular.module('mainApp', [
	'ui.router',
	'todoApp',
	'weatherApp',
	'contactApp',
	'randographApp',
	'genetifyApp'
	]);


// SERVICES
mainApp.service('ProjectListService', ['$http', '$q', function($http, $q){
	var deferred = $q.defer();
	$http.get('projects/projectList.json').then(function(data){
		deferred.resolve(data);
	});
	this.getList = function(){
		return deferred.promise;
		};
}]);