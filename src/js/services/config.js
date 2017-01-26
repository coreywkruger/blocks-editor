var configModule = angular.module('configServices', []);

configModule.service('configService', ['$location', '$rootScope', '$q',
	function($location, $rootScope, $q) {
    this.api_host = 'http://localhost:8888';
	}
]);
