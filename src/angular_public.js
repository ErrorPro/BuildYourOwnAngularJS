var setupModuleLoader = require('./loader.js');

function publishExternalApi() {
  setupModuleLoader(window);

  var ngModule = angular.module('ng', []);
  ngModule.provider('$parse', require('./parse.js'));
  ngModule.provider('$rootScope', require('./scope.js'));
  ngModule.provider('$q', require('./q.js').$QProvider);
  ngModule.provider('$$q', require('./q.js').$$QProvider);
  ngModule.provider('$http', require('./http.js'));
  ngModule.provider('$httpBackend', require('./http_backend.js'));
  ngModule.provider('$compile', require('./compile.js'));
  ngModule.provider('$controller', require('./controller.js'));
  ngModule.directive('ngController', require('./directives/ng-controller.js'));
}

module.exports = publishExternalApi;
