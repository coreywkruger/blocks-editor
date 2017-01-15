var editorDirectives = angular.module('editorDirectives', []);

editorDirectives.directive('editor', ['$compile', function($compile) {
  return {
    replace: true,
    restrict: 'EA',
    scope: {
      content: '=',
      editing: '=',
      update: '=',
      saveMethod: '='
    },
    link: function(scope, element) {

      var content = $compile(scope.content)(scope);
      // get all editable regions
      var blocks = content.find('.block');

      // append content into page
      element.append(content);

      // add block directive to editable regions
      angular.forEach(blocks, function(block){
        var editable = angular.element(block);
        var blockId = Math.floor(Math.random() * (100000));
        editable.attr('block', '');
        editable.attr('block-id', blockId);
        editable.attr('block-editable', `editing`);
        $compile(editable)(scope);
      });

      // return clean content from newly edited template
      scope.saveContent = function(){
        // var copy = element.clone()
        // var all = copy.find('*');
        // all.removeClass('ng-binding');
        // all.removeClass('ng-isolate-scope');
        // all.removeClass('ng-scope');
        // return all.html();
        return element.html();
      };

      scope.$on('template-changed', function(){
        scope.saveMethod(scope.saveContent());
      });
    }
  };
}]);
