var blockDirectives = angular.module('blockDirectives', []);

blockDirectives.directive('block', function() {
  return {
    replace: true,
    restrict: 'EA',
    scope: {
      templateId: '@'
    },
    link: function(scope, element, attributes) {
      element.addClass('template-id-' + scope.templateId);
      var editor = new MediumEditor('.template-id-' + scope.templateId);
      // console.log(editor.getContent())
    }
  };
});