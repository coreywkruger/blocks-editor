var authControllers = angular.module('authControllers', [
  'authServices'
]);

authControllers.controller('loginController', ['$scope', '$state', 'authService',	function($scope, $state, authService){
  $scope.username = null;
  $scope.password = null;
  $scope.login = function(username, password){
    authService.authenticate(username, password, function(err, success){
      if(err){
        alert(err);
      }
      if(!success){
        alert('could not authenticate');
      }
      $state.go('dashboard');
    });
  };
}]);