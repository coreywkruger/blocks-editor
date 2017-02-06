var editorServices = angular.module('editorServices', []);

editorServices.factory('editorService', ['$rootScope', '$q', 'restangularService',
  function($rootScope, $q, restangularService) {
    return new function(){
      
      this.api = restangularService;
      this.templates = [];
      this.template;

      this.get = function(id, force){
        if(force){
          return this.api
            .one('templates')
            .one(id)
            .get()
            .then(function(template){
              this.template = template;
              return this.template;
            }.bind(this));
        } else {
          var deferred = $q.defer();
          deferred.resolve(this.template);
          return deferred.promise;
        }
      };

      this.list = function(force){
        if(force){
          return this.api.one('templates').get()
            .then(function(data){
              this.templates = data.plain();
              return this.templates;
            });
        } else {
          var deferred = $q.defer();
          deferred.resolve(this.templates);
          return deferred.promise;
        }
      };

      this.update = function(id, newContent){
        return this.api.one('templates').one(id).customPUT({
          content: newContent
        });
      };

      this.delete = function(id){
        return this.api.one('templates').one(id).remove();
      };

      this.create = function(name, content){
        var newTemplate = {
          name: name,
          content: content
        };
        return this.api.one('templates').post('', newTemplate);
      };

      this.getUsers = function(id){
        return this.api.one('templates').one(id).one('users').get();
      };

      this.toolbarMap = {
        'blocks-edit-bold': 'bold',
        'blocks-edit-italic': 'italic',
        'blocks-edit-underline': 'underline',
        'blocks-edit-h2': 'h2',
        'blocks-edit-h3': 'h3'
      };
      this.rules = {
        text: {
          toolbar: {
            buttons: ['bold', 'italic', 'underline', 'h2', 'h3'],
          },
          placeholder: {
            text: 'Click to edit'
          }
        },
        image: {
          toolbar: {
            buttons: ['anchor'],
          },
          placeholder: {
            text: 'Click to edit'
          }
        },
        link: {
          toolbar: {
            buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'],
          },
          placeholder: {
            text: 'Click to edit'
          }
        }
      };
    };
  }
]);
