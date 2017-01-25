var fileUploadDirectives = angular.module('fileUploadDirectives', []);

fileUploadDirectives.directive('fileUpload', function() {
  return {
    replace: true,
    restrict: 'EA',
    scope: {
      fileUpload: '='
    },
    link: function(scope, element, attributes) {
      element.bind('change', function(event){
        scope.$apply(function(){
          var file = file = (event.srcElement || event.target).files[0];
          scope.fileUpload(file);
        });
      });
    }
  };
});