var blockDirectives = angular.module('blockDirectives', []);

blockDirectives.directive('block', function() {
  return {
    replace: true,
    restrict: 'EA',
    scope: {
      blockId: '@',
      blockEditable: '='
    },
    link: function(scope, element, attributes) {
      scope.editor;
      scope.$watch('blockEditable', function(newVal){
        if(newVal){
          element.addClass('block-id-' + scope.blockId);
          scope.editor = new MediumEditor('.block-id-' + scope.blockId);
          scope.editor.subscribe('editableInput', function () {
            scope.$emit('template-changed');
          });
        } else if (scope.editor){
          scope.editor.destroy();
        }
      });
    }
  };
});