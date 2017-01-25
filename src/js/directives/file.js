var fileDirectives = angular.module('fileDirectives', []);

fileDirectives.directive('fileUpload', function() {
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

fileDirectives.directive('download', function(){
  return {
    replace: true,
    restrict: 'EA',
    scope: {
      content: '=',
      name: '='
    },
    link: function(scope, element){
      var a = element[0];
      var blob = new Blob([scope.content], {
        'type': 'text/plain;charset=utf-8' // 'application/octet-stream'
      });
      a.href = URL.createObjectURL(blob);
      a.download = `${scope.name}.txt`;
    }
  };
});

function str2bytes(str){
  var bytes = new Uint8Array(str.length);
  for (var i=0; i<str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}