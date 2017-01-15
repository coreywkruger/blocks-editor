var editorControllers = angular.module('editorControllers', [
  'editorServices'
]);

editorControllers.controller('editorController', ['$scope', '$stateParams', 'editorService',	function($scope, $stateParams, editorService){

  var template = editorService.get($stateParams.id);
  $scope.content = template.content;
  $scope.editing = false;

  $scope.$on(editorService.events.EDITING, function(){
    $scope.editing = true;
  });

  $scope.$on(editorService.events.CANCEL, function(){
    $scope.editing = false;
  });

  $scope.saveMethod = function(newContent){
    $scope.content = newContent;
  };

  $scope.$on(editorService.events.SAVE, function(){
    $scope.editing = false;
    editorService.update(template.id, $scope.content);
  });
}]);