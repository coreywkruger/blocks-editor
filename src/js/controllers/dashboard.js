var dashboardControllers = angular.module('dashboardControllers', [
  'editorServices',
  'fileServices'
]);

dashboardControllers.controller('dashboardController', ['$scope', '$rootScope',	'$state', 'editorService', 'fileService', function($scope, $rootScope, $state, editorService, fileService){

  $scope.templates = editorService.templates;
  $scope.uploading = false;
  $scope.title = '';
  $scope.error;

  $scope.fileHandler = function(file){
    $scope.uploading = true;
    $scope.file = file;
  };

  $scope.saveNewTemplate = function(){
    fileService.readAsText($scope.file, $scope)
      .then(function(result) {
        editorService.create($scope.title, result)
          .then(function(res){
            $scope.loadTemplates();
          })
          .catch(function(err){
            $scope.error = err;
          })
          .finally(function(){
            $scope.title = '';
            $scope.uploading = false;
          });
      });
  };

  $scope.loadTemplates = function(){
    editorService.list(true)
      .then(function(templates){
        $scope.templates = templates;
        $scope.templates.forEach(function(template){
          editorService.getUsers(template.id)
            .then(function(users){
              template.users = users;
            });
        });
      })
      .catch(function(err){
        $scope.error = err;
      });
  };

  $scope.deleteTemplate = function(id){
    editorService.delete(id)
      .then(function(res){
        $scope.loadTemplates();
      })
      .catch(function(err){
        $scope.error = err;
      });
  };

  $scope.loadTemplates();

  $scope.cancelUpload = function(){
    $scope.uploading = false;
    $scope.title = '';
    $scope.file = undefined;
  };

  $scope.invite = function(id){
    $state.go('users', {
      id: id
    });
  };

  $scope.duplicate = function(id){
    console.log('duplicate', id);
  };

  $scope.export = function(id){
    console.log('export', id);
  };

  $scope.share = function(id){
    console.log('share', id);
  };

  $scope.delete = function(id){
    console.log('delete', id);
  };

  $scope.edit = function(id){
    $state.go('editor', {
      id: id
    });
  };
}]);

dashboardControllers.controller('usersController', ['$scope', '$stateParams',	'$state', 'editorService',
  function($scope, $stateParams, $state, editorService){
    $scope.users = [];
    $scope.template = {};
    $scope.loadTemplate = function(){
      editorService
        .get($stateParams.id, true)
        .catch(function(err){
          alert(err);
        })
        .then(function(template){
          $scope.template = editorService.template;
        });
    };
    $scope.loadUsers = function(){
      editorService
        .getUsers($stateParams.id)
        .catch(function(err){
          alert(err);
        })
        .then(function(users){
          $scope.users = users;
        });
    };
    $scope.loadTemplate();
    $scope.loadUsers();
  }
]);

dashboardControllers.filter('initals', function(){
  return function(value){
    var names = value.split(' ');
    var initials = [];
    for(var i = 0 ; i < names.length ; i++){
      initials.push(names[i][0].toUpperCase());
    }
    return initials.join('');
  }
});