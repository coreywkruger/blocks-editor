var headerControllers = angular.module('headerControllers', []);

headerControllers.controller('headerController', ['$scope', '$rootScope', '$stateParams', 'editorService',	function($scope, $rootScope, $stateParams, editorService){

  console.log('header');
  
  // $scope.importedTemplate = {};
  
  // $scope.fileChanged = function(file){
  //   editorService.startImport(file);
  // };

  $scope.edit = function(){
    editorService.startEdit($stateParams.id);
  };
  $scope.cancel = function(){
    editorService.startCancel($stateParams.id);
  };
  $scope.save = function(){
    editorService.startSave($stateParams.id);
  };
}]);