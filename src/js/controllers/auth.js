var authControllers = angular.module('authControllers', [
  'authServices'
]);

authControllers.controller('authController', ['$scope', '$state', 'authService',	function($scope, $state, authService){
  
  $scope.login = function(){
    authService
      .login($scope.email, $scope.password)
      .then(function(){
        $state.go('teams');
      })
      .catch(function(err){
        if(err){
          alert(err);
        }
      });
  };

  $scope.signup = function(){
    authService
      .signup({
        email: $scope.email,
        password: $scope.password,
        name: $scope.name,
        job: $scope.job  
      })
      .then(function(success){
        $state.go('login');
      })
      .catch(function(err){
        if(err){
          alert(err);
        }
      });
  };
}]);

authControllers.controller('teamMenuController', ['$scope', '$state', 'authService',
  function($scope, $state, authService){
    $scope.organizations = authService.organizations;
    $scope.chooseTeam = function(organization_id){
      authService
        .loginTeam(organization_id)
        .then(function(){
          var session = authService.session.team_token;
          console.log('\n\n\n==>', authService.session);
          authService.setSessionHeader(session);
          $state.go('dashboard');
        })
        .catch(function(err){
          if(err){
            alert(err);
          }
        });
    }
  }
]);