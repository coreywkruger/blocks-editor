var headerControllers = angular.module('headerControllers', []);

headerControllers.controller('headerController', ['$scope', '$stateParams', 'editorService',	function($scope, $stateParams, editorService){

  console.log('header');

  $scope.edit = function(){
    editorService.edit($stateParams.id);
  };
  $scope.cancel = function(){
    editorService.cancel($stateParams.id);
  };
  $scope.save = function(){
    editorService.save($stateParams.id);
  };
}]);