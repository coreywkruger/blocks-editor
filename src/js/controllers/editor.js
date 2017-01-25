var editorControllers = angular.module('editorControllers', [
  'editorServices'
]);

editorControllers.controller('editorController', ['$scope', '$state', '$stateParams', 'editorService',	
  function($scope, $state, $stateParams, editorService){

  var template = editorService.get($stateParams.id);
  if(!template){
    $state.go('dashboard');
  } else {
    $scope.rules = editorService.rules;
    $scope.content = template.content;
    $scope.title = template.title;
  }

  $scope.editing = false;
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

  $scope.export = function(){
    var blob = new Blob([$scope.content], {
      type: 'text/plain;charset=utf-8' // 'octet/stream' // application/zip' // 'text/plain;charset=utf-8'
    });
    saveAs(blob, `${$scope.title}.html`);
  };

  $scope.saveMethod = function(newContent){
    $scope.content = newContent;
  };

  $scope.$on(editorService.events.SAVE, function(){
    $scope.editing = false;
    editorService.update(template.id, $scope.content);
  });
}]);