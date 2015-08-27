  // MAIN ROUTES

arcomApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})
		.state('brain', {
			url: '/brain',
			templateUrl: 'views/brain.html',
			controller: 'BrainController'
		}) 
		.state('science', {
			url: '/science',
			templateUrl: 'views/science.html',
			controller: 'ScienceController'
		}) 
		.state('wow', {
			url: '/wow',
			templateUrl: 'views/wow.html',
			controller: 'WowController'
		})
		.state('projects', {
			url: '/projects',
			templateUrl: 'views/projectList.html',
			controller: 'ProjectListController'
		})

		/// ROUTER FOR EVERY PROJECT!!!!
		.state('project', {
			url: '/project/:id',
			templateUrl: function(params){
				return '/projects/' + params.id + '/index.html';
			},
			controllerProvider: function ($stateParams) {
				var prefix = $stateParams.id.slice(0, 1).toUpperCase() +
					$stateParams.id.slice(1);
				return prefix + 'Controller';
			}
		})
}]);