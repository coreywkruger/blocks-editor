var editorControllers = angular.module('editorControllers', [
  'editorServices'
]);

editorControllers.controller('editorController', ['$scope', '$state', '$stateParams', 'editorService',	function($scope, $state, $stateParams, editorService){

  var template = editorService.get($stateParams.id);
  $scope.rules = editorService.rules;
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