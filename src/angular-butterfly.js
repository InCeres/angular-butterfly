'use strict';

angular.module('butterfly', [])
  .factory('VersionService', ['$rootScope', '$q', '$resource', function($rootScope, $q, $resource) {

    this.notifyIfNotUpdated = function(url, version) {
      var Version = $resource(url, null);

      Version.get(
        {},
        function(response) {
          $rootScope.isAppUpdated = response.version === version;
        },
        function(error) {
        }
      );
    };
  }])

  .directive('butterflyDirective', ['$rootScope', 'VersionService', function($rootScope, VersionService) {
    return {
      restrict: 'E',
      scope: {
        url: '@url',
        version: '@version'
      },
      link: function(scope, elm, attrs, ctrl) {
        if ($rootScope.isAppUpdated) {
          VersionService.notifyIfNotUpdated(scope.url, scope.version);
        }
      }
    }

  }]);
