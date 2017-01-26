var authServices = angular.module('authServices', [
  'restangularServices'
]);

authServices.factory('authService', ['restangularService',
  function(restangularService) {
    return new function(){

      this.user = {
        email: null,
        authenticated: false
      };

      this.authenticate = function(email, password){
        return restangularService.one('login').post('', {
          email: email,
          password: password
        }).then(function(res){
          this.user.email = email;
          this.user.authenticated = true;
          return true;
        }.bind(this));
      };

      this.signup = function(args){
        return restangularService.one('signup').post('', args);
      };
    };
  }
]);
