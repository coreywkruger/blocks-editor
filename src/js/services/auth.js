var authServices = angular.module('authServices', [
  'restangularServices',
  'LocalStorageModule'
]);

authServices.factory('authService', ['restangularService', 'localStorageService',
  function(restangularService, localStorageService) {
    return new function(){

      this.api = restangularService;
      this.organizations = [];
      this.user = {
        email: null,
        authenticated: false
      };
      this.session = {
        user_token: null,
        team_token: null
      };

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
            this.user = res.user;
            localStorageService.set('user', JSON.stringify(this.user));
          }.bind(this));
      };

      this.getUser = function(){
        return JSON.parse(localStorageService.get('user'));
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
            localStorageService.set('team-session', this.session.team_token);
          }.bind(this));
      };

      this.signup = function(args){
        return this.api
          .one('signup')
          .post('', args);
      };

      this.resetPassword = function(token, newPassword, oldPassword){
        return this.api
          .one('reset-password')
          .post('', {
            token: token,
            password: newPassword,
            old_password: oldPassword
          });
      };

      this.requestPassword = function(email){
        return this.api
          .one('request-password')
          .post('', {
            email: email
          });
      };

      this.updateUser = function(id, args){
        return this.api
          .one('users')
          .one(id)
          .customPUT(args)
          .then(function(res){
            this.user = res;
            localStorageService.set('user', JSON.stringify(this.user));
          });
      };

      this.joinTeam = function(user_id, token){
        return this.api
          .one('join-team')
          .post('', {
            user_id: user_id,
            token: token
          })
          .then(function(res){
            this.session.team_token = res.token;
            localStorageService.set('team-session', this.session.team_token);
          }.bind(this));
      };

      this.invite = function(template_id, name, email, job, company){
        return this.api
          .one('invite')
          .one(template_id)
          .post('', {
            name: name,
            email: email,
            job: job,
            company: company
          });
      };

      this.getUsers = function(){
        return this.api
          .one('users')
          .get();
      };

      this.setSessionHeader = function(key, type) {
        if(type == 'team'){
          this.session.team_token = key;
        }
        restangularService.defaultHeaders = {};
        restangularService.setDefaultHeaders({
          'blocks-session': key
        });
      };

      this.getSessionHeader = function(){
        return localStorageService.get('team-session');
      };
    };
  }
]);
