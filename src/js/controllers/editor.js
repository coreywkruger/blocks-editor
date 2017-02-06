var editorControllers = angular.module('editorControllers', [
  'editorServices'
]);

editorControllers.controller('editorController', ['$scope', '$state', '$stateParams', 'editorService',	
  function($scope, $state, $stateParams, editorService){

  $scope.rules = editorService.rules;
  $scope.editing = false;

  this.loadTemplate = function(){
    editorService
      .get($stateParams.id, true)
      .then(function(template){
        $scope.content = template.content;
        $scope.name = template.name;
      });
  };

  $scope.$on('$stateChangeSuccess', this.loadTemplate);

  $scope.edit = function(){
    $scope.editing = true;
  };

  $scope.cancel = function(){
    $scope.editing = false;
  };

  $scope.save = function(){
    $scope.editing = false;
    editorService.update(template.id, $scope.content);
  };

  $scope.showExporter = false;
  $scope.startExport = function(){
    $scope.showExporter = $scope.showExporter ? false : true;
  };

  $scope.saveMethod = function(newContent){
    $scope.content = newContent;
  };
}]);