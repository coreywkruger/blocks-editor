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
}]);

authControllers.controller('signupController', ['$scope', '$state', '$stateParams', 'authService',	
  function($scope, $state, $stateParams, authService){
    $scope.signup = function(name, email, password, job){
      authService
        .signup({
          email: email,
          password: password,
          name: name,
          job: job
        })
        .then(function(res){
          
          var invite_token = decodeURIComponent($stateParams.invite_token); // 

          authService
            .joinTeam(res.user_id, invite_token)
            .then(function(res){
              authService.setSessionHeader(authService.session.team_token);
              $state.go('dashboard');
            })
            .catch(function(err){
              if(err){
                alert(err);
              }
            });
        })
        .catch(function(err){
          if(err){
            alert(err);
          }
        });
    };
  }
]);

authControllers.controller('teamMenuController', ['$scope', '$state', 'authService',
  function($scope, $state, authService){
    $scope.organizations = authService.organizations;
    $scope.chooseTeam = function(organization_id){
      authService
        .loginTeam(organization_id)
        .then(function(){
          authService.setSessionHeader(authService.session.team_token);
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
