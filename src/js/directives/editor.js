var editorDirectives = angular.module('editorDirectives', []);

editorDirectives.directive('editor', ['$compile', function($compile) {
  return {
    replace: true,
    restrict: 'EA',
    scope: {
      content: '=',
      editing: '=',
      rules: '=',
      saveMethod: '='
    },
    link: function(scope, element) {

      scope.$watch('content', function(newVal, oldVal){
        if(!oldVal){
          $(element).append(scope.content);

          scope.editors = {};

          // get all editable regions
          var regions = element.find('.region');
          
          angular.forEach(regions, function(region){
            region = $(region);
            region
              .mouseover(function(e){
                if(!scope.editing){
                  $('.region-hover').removeClass('region-hover'); 
                  region.addClass('region-hover');
                }
              })
              .mouseout(function(e){
                if(!scope.editing){
                  region.removeClass('region-hover');
                }
              });
          });

          scope.$watch('editing', function(newVal){
            if(newVal){
              // apply new editors
              angular.forEach(regions, function(region){
                region = $(region);
                scope.applyEditor('.blocks-editable-text', region, scope.rules.text);
                scope.applyEditor('.blocks-editable-image', region, scope.rules.image);
                scope.applyEditor('.blocks-editable-link', region, scope.rules.link);
              });
            } else {
              // remove all editors
              for(var key in scope.editors){
                scope.removeEditor(key);
              }
            }
          });

          // return clean content from newly edited template
          scope.saveContent = function(){
            return element.html();
          };

          scope.$on('template-changed', function(){
            scope.saveMethod(scope.saveContent());
          });

          scope.applyEditor = function(id, el, rules){
            _.each(el.find(id), function(editArea){
              
              editArea = $(editArea);

              var classes = editArea.attr("class").split(' ');
              var mappedButtons = _.map(_.intersection(classes, _.keys(this.toolbarMap)), function(className){
                return this.toolbarMap[className];
              });

              // create unique id for new editor
              var id = 'block-editable-id-' + Math.floor(Math.random() * (100000));
              // add the class
              editArea.addClass(id);
              // creat the new editor
              var newEditor = new MediumEditor(`.${id}`, {
                toolbar: {
                  buttons: mappedButtons
                },
                placeholder: {
                  text: 'Insert Text Here'
                }  
              });
              // signal when the editor changes the template
              newEditor.subscribe('editableInput', function () {
                scope.$emit('template-changed');
              });
              // save editor
              scope.editors[id] = newEditor;
            });
          };

          scope.removeEditor = function(key){
            // identifiers
            var id = `block-editable-id-${key}`;
            // find original element
            var original = $(`.${id}`);
            // strip it
            original.removeClass(id);
            // destroy the editor
            scope.editors[key].destroy();
            // delete it so hard
            delete scope.editors[key];
          };
        }
      });
    }
  }
}]);
