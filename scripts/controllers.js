// CONTROLLER

mainApp.controller('MainController', ['$scope', function($scope, ProjectListService){

}]);

mainApp.controller('ProjectListController', ['$scope', 'ProjectListService', function($scope, ProjectListService){
		ProjectListService.getList().then(function(data){
			$scope.projects = data.data;
		});
}]);

mainApp.controller('BrainController', [function () {

}]);

mainApp.controller('ProjectController', [function () {

}]);

mainApp.controller('ScienceController', [function () {

}]);

mainApp.controller('WowController', [function () {

}]);

mainApp.controller('FartsmellerController', ['$scope', function($scope){
	$scope.smell = 'You delt it!';	
}]);

mainApp.controller('CounterController', ['$scope', function ($scope) {
	$scope.numbers = [0];
	$scope.addNumber = function () {
		$scope.numbers[$scope.numbers.length] = $scope.numbers.length;
	}
}]);