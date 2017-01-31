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

authControllers.controller('inviteController', ['$scope', '$state', 'authService',
  function($scope, $state, authService){
    $scope.users = authService.users;
    $scope.invite = function(name, email, job, company){
      authService
        .invite(name, email, job, company)
        .then(function(){
          alert('success')
        })
        .catch(function(err){
          if(err){
            alert(err);
          }
        });
    };
  }
]);