var todoApp = angular.module('todoApp', [
	'ui.sortable',
	'ngStorage'
	]);

/// 	TODOLIST CONTROLLER

todoApp.controller('TodoController', ['$scope', '$localStorage', function($scope, $localStorage){
	//$localStorage.$reset();
	$localStorage.todos = $localStorage.todos || [];
	$scope.todos = $localStorage.todos;

	$scope.addTodo = function () {
		var newItem = $scope.todo;
		$localStorage.todos.unshift(newItem);
		$scope.todo = '';
	};

	$scope.removeTodo = function (index) {
		$scope.todos.splice(index, 1);
	};

	$scope.$watch($scope.todos, function (){$localStorage.todos = $scope.todos;}
	);
}]);