// SERVICES

arcomApp.service('ProjectListService', ['$http', '$q', function($http, $q){
	var deferred = $q.defer();
	$http.get('projects/projectList.json').then(function(data){
		deferred.resolve(data);
	});
	this.getList = function(){
		return deferred.promise;
		};
}]);

var string = "string";
var number = 9;
var funk = function(arguments){
	var real = arguments;
	var fake = notthere;
};