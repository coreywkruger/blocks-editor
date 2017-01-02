var editorControllers = angular.module('editorControllers', [
  'editorServices'
]);

editorControllers.controller('editorController', ['$scope', '$stateParams', 'editorService',	function($scope, $stateParams, editorService){

  console.log('editing', $stateParams.id)
  $scope.template = editorService.get($stateParams.id);

}]);