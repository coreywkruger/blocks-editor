var app = angular.module('bdApp', [
  'editorServices',
  'editorControllers',
  'dashboardControllers',
  'blockDirectives',
  'editorDirectives',
  'headerControllers',
  'templates',
  'ui.router'
]);

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    // $httpProvider.interceptors.push(/* */);

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/partials/login.html',
      controller: $scope => {
        console.log('Login'); 
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/partials/signup.html',
      controller: $scope => {
        console.log('signup');  
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '/partials/dashboard.html',
      controller: 'dashboardController'
    })
    .state('editor', {
      url: '/editor/:id',
      templateUrl: '/partials/editor.html',
      controller: 'editorController'
    });
}]);

app.run(() => {
  console.log("hello world")
});
