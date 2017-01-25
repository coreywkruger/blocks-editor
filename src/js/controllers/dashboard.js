var dashboardControllers = angular.module('dashboardControllers', [
  'editorServices',
  'fileServices'
]);

dashboardControllers.controller('dashboardController', ['$scope', '$rootScope',	'$state', 'editorService', 'fileService', function($scope, $rootScope, $state, editorService, fileService){

  $scope.templates = editorService.templates;

  $scope.edit = function(id){
    $state.go('editor', {
      id: id
    });
  };

  $scope.uploading = false;
  $scope.fileChanged = function(file){
    $scope.uploading = true;
    $scope.file = file;
  };

  $scope.title = '';
  $scope.uploadFile = function(){
    fileService.readAsText($scope.file, $scope).then(function(result) {
      editorService.create($scope.title, result);
    });
  };

  $scope.cancelUpload = function(){
    $scope.uploading = false;
    $scope.title = '';
    $scope.file = undefined;
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
