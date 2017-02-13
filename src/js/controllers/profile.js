var profileControllers = angular.module('profileControllers', [
  'authServices'
]);

profileControllers.controller('profileController', ['$scope', 'authService', 
  function($scope, authService){

    $scope.user = authService.getUser();

    $scope.submit = function(form){
      console.log(form)
      authService
        .updateUser($scope.user.id, $scope.user)
        .then(function(userd){
          $scope.user = authService.getUser();
        })
        .catch(function(err){
          $scope.error = err;
        })
    };
  }
]);