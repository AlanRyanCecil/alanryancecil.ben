// CONTROLLER


arcomApp.controller('ProjectListController', ['$scope', 'ProjectListService', function($scope, ProjectListService){
		ProjectListService.getList().then(function(data){
			$scope.projects = data.data;
		});
}]);

arcomApp.controller('ProjectController', [function () {

}]);

arcomApp.controller('ScienceController', [function () {

}]);

arcomApp.controller('WowController', [function () {

}]);

arcomApp.controller('FartsmellerController', ['$scope', function($scope){
	$scope.smell = 'You delt it!';	
}]);

arcomApp.controller('WeatherController', ['$scope', function($scope){
	
}]);

arcomApp.controller('TodoController', ['$scope', '$localStorage', function($scope, $localStorage){
	//$localStorage.$reset();
	$localStorage.todos = $localStorage.todos || [];
	$scope.todos = $localStorage.todos;

	$scope.addTodo = function () {
		$localStorage.todos.unshift($scope.todo);
		$scope.todo = '';
	};

	$scope.removeTodo = function (index) {
		$scope.todos.splice(index, 1);
	};

	$scope.$watch(function(){
		return $scope.todos;
	},
	function () {
		$localStorage.todos = $scope.todos;
	 }
	);
}]);

arcomApp.controller('CounterController', ['$scope', function ($scope) {
	$scope.numbers = [0];
	$scope.addNumber = function () {
		$scope.numbers[$scope.numbers.length] = $scope.numbers.length;
	}
}]);

