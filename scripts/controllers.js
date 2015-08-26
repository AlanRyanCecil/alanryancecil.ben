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

arcomApp.controller('TodoController', ['$scope', function($scope){
	$scope.todos = [];
	$scope.addTodo = function () {
		$scope.todos.push($scope.todo);
		$scope.todo = '';
	};

	$scope.removeTodo = function (index) {
		$scope.todos.splice(index, 1);
	};
}]);