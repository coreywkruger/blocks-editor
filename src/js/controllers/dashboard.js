var dashboardControllers = angular.module('dashboardControllers', [
  'editorServices'
]);

dashboardControllers.controller('dashboardController', ['$scope',	'$state', 'editorService', function($scope, $state, editorService){

  $scope.templates = editorService.templates;

  $scope.edit = function(id){
    $state.go('editor', {
      id: id
    });
  };

  $scope.duplicate = function(id){
    console.log('duplicate', id);
  };

  $scope.export = function(id){
    console.log('export', id);
  };

  $scope.share = function(id){
    console.log('share', id);
  };

  $scope.delete = function(id){
    console.log('delete', id);
  };
}]);
