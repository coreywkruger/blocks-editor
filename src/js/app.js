var app = angular.module('bdApp', [
  'editorServices',
  'editorControllers',
  'authControllers',
  'configServices',
  'profileControllers',
  'dashboardControllers',
  'blockDirectives',
  'editorDirectives',
  'headerTools',
  'fileDirectives',
  'fileServices',
  'templates',
  'ui.router',
  'LocalStorageModule'
]);

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    // $httpProvider.interceptors.push(/* */);

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/partials/login.html',
      controller: 'authController'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/partials/profile.html',
      controller: 'profileController'
    })
    .state('teams', {
      url: '/teams',
      templateUrl: '/partials/team-menu.html',
      controller: 'teamMenuController'
    })
    .state('signup', {
      url: '/signup?invite_token',
      templateUrl: '/partials/signup.html',
      controller: 'signupController'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '/partials/dashboard.html',
      controller: 'dashboardController'
    })
    .state('users', {
      url: '/users/:id',
      templateUrl: '/partials/users.html',
      controller: 'usersController'
    })
    .state('editor', {
      url: '/editor/:id',
      templateUrl: '/partials/editor.html',
      controller: 'editorController'
    });
}]);

app.run(['$state', '$rootScope', 'authService', ($state, $rootScope, authService) => {
  authService.setSessionHeader(authService.getSessionHeader());
}]);

app.config(function(localStorageServiceProvider){
  localStorageServiceProvider
    .setPrefix('blocks');
});