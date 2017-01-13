var editorControllers = angular.module('editorControllers', [
  'editorServices'
]);

editorControllers.controller('editorController', ['$scope', '$stateParams', 'editorService',	function($scope, $stateParams, editorService){

  $scope.template = editorService.get($stateParams.id);
  $scope.editing = false;
  $scope.update = false;

  $scope.$on(editorService.events.EDITING, function(){
    $scope.editing = true;
  });

  $scope.$on(editorService.events.CANCEL, function(){
    $scope.editing = false;
  });

  $scope.saveMethod = function(newContent){
    $scope.template.content = newContent;
  };

  $scope.$on(editorService.events.SAVE, function(){
    $scope.update = true;
    editorService.update($scope.template.id, $scope.template.content);
  });
}]);