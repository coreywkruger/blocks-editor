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

  $scope.title = '';

  $scope.uploadFile = function(){
    var reader = new FileReader();
    reader.onload = function(e){
      $scope.$apply(function(){
        editorService.create($scope.title, reader.result);
      });
    };
    reader.readAsText(editorService.importedTemplateFile);
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
