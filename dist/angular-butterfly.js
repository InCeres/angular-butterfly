'use strict';

angular.module('butterfly', [])
  .service('VersionService', ['$q', '$resource', function($q, $resource) {
    var isUpdated = null;

    var deferrer = $q.defer();
    var loading = false;

    this.checkIfIsUpdated = function(url, version) {
      if (isUpdated != null) {
        deferrer.resolve(isUpdated);
      }
      else {
        if (!loading) {
          loading = true;
          var Version = $resource(url, null);

          Version.get(
            function(response) {
              isUpdated = response.version === version;
              loading = false;
              deferrer.resolve(isUpdated);
            },
            function(error) {
              loading = false;
              console.log(error);
              deferrer.reject(error);
            }
          );
        }
      }
      return deferrer.promise;
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
        $rootScope.isAppUpdated = $rootScope.isAppUpdated && VersionService.checkIfIsUpdated(scope.url, scope.version);
      }
    }

  }]);