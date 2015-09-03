///		GENTETIFY 
var genetifyApp = angular.module('genetifyApp', []);


///		CONTROLLERS
genetifyApp.controller('GenetifyController', ['$scope', 'GeneService',  function ($scope, GeneService) {
	$scope.gene = "Monkeys" + " " + GeneService.stuff;
}]);


///		SERVICES
genetifyApp.service('GeneService', [function () {
	this.stuff = "poo";
}]);