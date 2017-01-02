var editorDirectives = angular.module('editorDirectives', []);

editorDirectives.directive('editor', ['$compile', function($compile) {
  return {
    replace: true,
    restrict: 'EA',
    scope: {
      content: '='
    },
    link: function(scope, element) {

      var content = $compile(scope.content)(scope);
      element.append(content);    

      var blocks = element.find('.block');

      angular.forEach(blocks, function(block){
        var editable = angular.element(block);
        editable.attr('block', '');
        editable.attr('template-id', Math.floor(Math.random() * (100)));
        $compile(editable)(scope);
      });

      scope.getContent = function(){
        console.log(element.clone());
        var copy = element.clone()
        var all = copy.find('*');
        all.removeClass('ng-isolate-scope');
        all.removeClass('ng-scope');
      };
      scope.getContent();
    }
  };
}]);
