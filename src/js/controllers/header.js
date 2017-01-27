var headerTools = angular.module('headerTools', []);

headerTools.controller('headerController', ['$scope', '$rootScope', '$stateParams', 'editorService',	function($scope, $rootScope, $stateParams, editorService){

  $scope.showProfileOptions = false;
  $scope.toggleProfileOptions = function(){
    $scope.showProfileOptions = $scope.showProfileOptions ? false : true;
  };
}]);

headerTools.directive('profileOptions', [function(){
  return {
    restrict: 'AE',
    scope: {
      profileOptions: '='
    },
    link: function(scope, element){
      scope.$watch('profileOptions', function(newVal, oldVal){
        if(newVal === true && newVal !== oldVal){
          element.show();
        } else {
          element.hide();
        }
      });
      element.mouseleave(function(e){
        scope.$apply(function(){
          if(scope.profileOptions === true) {
            scope.profileOptions = false;
            element.hide();
          }
        });
      });
    }
  };
}]);