'use strict';

angular.module('butterfly', [])
  .service('VersionService', ['$rootScope', '$q', '$resource', function($rootScope, $q, $resource) {

    var version = null;
    var deferrer = $q.defer();
    var loading = false;

    this.get = function(url) {
      if (version != null) {
        deferrer.resolve(version);
      }
      else {
        if (!loading) {
          loading = true;
          var Version = $resource(url, null);
          Version.get(
            function(response) {
              loading = false;
              if (response.version === undefined) {
                deferrer.reject(response);
                return;
              }
              version = response.version;
              deferrer.resolve(response.version);
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
  .directive('versionVerifier', ['$rootScope', 'VersionService', function($rootScope, VersionService) {
    return {
      restrict: 'E',
      scope: {
        url: '@url',
        version: '@version',
        notifyOutside: '='
      },
      link: function(scope, elm, attrs, ctrl) {
        if ($rootScope.isAppUpdated) {
          VersionService.get(scope.url).then(
            function(version){
              $rootScope.isAppUpdated = $rootScope.isAppUpdated && scope.version === version;
              if (scope.notifyOutside && !$rootScope.isAppUpdated) {
                window.parent.postMessage("outdated-version", "*");
              }
            },
            function(error) {
              console.log('error', error);
            }
          );
        }
      }
    }

  }]);
