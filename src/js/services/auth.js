var authServices = angular.module('authServices', []);

authServices.factory('authService', [
  function() {
    return new function(){

      this.user = {
        username: null,
        authenticated: false
      };

      this.authenticate = function(username, password, cb){
        // stubbed
        this.user.username = username;
        this.user.authenticated = true;
        cb(null, this.user.authenticated);
      };
    };
  }
]);
