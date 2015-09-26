var contactApp = angular.module('contactApp', ['ngResource']);

// CONTACT CONTROLLERS
contactApp.controller('ContactController', ['$scope', '$http', 'UserFactory', function($scope, $http, UserFactory){
	var users = $http.get('http://jsonplaceholder.typicode.com/users');
		users.then(function (result) {
			$scope.users = result.data;
		});

	var contacts = $http.get('projects/contact/contacts.json');
		contacts.then(function (result) {
			$scope.contacts = result.data;
		});

	$scope.people = UserFactory.query();

	$scope.getInfo = function (userID) {
		$scope.currentUser = UserFactory.get({ParamId: userID});
	};

	$scope.addUser = function () {
		UserFactory.update({MethId: 3, name: "Alan Cecil", company: {name: "Farts", type: "smelly"} });
	};
	$scope.heading = "people."
}]);

// CONTACT SERVICES
contactApp.service('ContactListService', ['$resource', function(){
	this.getContactList = function () {
		var contactList = $resource('contacts.json')
	}	
}]);

// CONTACT FACTORYS
contactApp.factory('UserFactory', ['$resource', function($resource){
	var data = $resource('http://jsonplaceholder.typicode.com/users/:ParamId', {ParamId: '@MethId'}, {
		update: { method: 'PUT' }
	});
	return data;
}]);