var authServices = angular.module('authServices', [
  'restangularServices'
]);

authServices.factory('authService', ['restangularService',
  function(restangularService) {
    return new function(){

      this.api = restangularService;
      this.user = {
        email: null,
        authenticated: false
      };
      this.session = {
        user_token: null,
        team_token: null
      };
      this.organizations = [];

      this.login = function(email, password){
        return this.api
          .one('login')
          .post('', {
            email: email,
            password: password
          })
          .then(function(res){
            this.session.user_token = res.token;
            this.organizations = res.organizations;
          }.bind(this));
      };

      this.loginTeam = function(organization_id){
        return this.api
          .one('login')
          .one(organization_id)
          .post('', {
            token: this.session.user_token
          })
          .then(function(res){
            this.session.team_token = res.token;
          }.bind(this));
      };

      this.signup = function(args){
        return this.api
          .one('signup')
          .post('', args);
      };

      this.setSessionHeader = function(key) {
        restangularService.defaultHeaders = {};
        restangularService.setDefaultHeaders({
          'blocks-session': key
        });
      };
    };
  }
]);
