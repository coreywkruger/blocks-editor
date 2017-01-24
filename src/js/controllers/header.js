var headerControllers = angular.module('headerControllers', []);

headerControllers.controller('headerController', ['$scope', '$stateParams', 'editorService',	function($scope, $stateParams, editorService){

  console.log('header');
  
  $scope.importedTemplate = {};
  $scope.$watch('importedTemplate.name', function(newVal){
    console.log(newVal, $scope.importedTemplate);
    editorService.startImport($scope.importedTemplate);
  });

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