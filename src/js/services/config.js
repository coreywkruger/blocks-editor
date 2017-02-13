var configModule = angular.module('configServices', [
  'LocalStorageModule'
]);

configModule.service('configService', ['$location', '$rootScope', '$q',
	function($location, $rootScope, $q) {
		this.api_host = API_HOST;
	}
]);
