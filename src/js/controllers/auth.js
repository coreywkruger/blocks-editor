var authControllers = angular.module('authControllers', [
  'authServices'
]);

authControllers.controller('authController', ['$scope', '$state', 'authService',	function($scope, $state, authService){
  $scope.login = function(){
    authService.authenticate($scope.email, $scope.password).then(function(success){
      if(!success){
        alert('could not authenticate');
      }
      $state.go('dashboard');
    }).catch(function(err){
      if(err){
        alert(err);
      }
    });
  };
  $scope.signup = function(){
    authService.signup({
      email: $scope.email,
      password: $scope.password,
      name: $scope.name,
      job: $scope.job  
    }).then(function(success){
      if(!success){
        alert('could not signup');
      }
      $state.go('login');
    }).catch(function(err){
      if(err){
        alert(err);
      }
    });
  };
}]);