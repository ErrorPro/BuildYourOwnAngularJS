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
}

module.exports = publishExternalApi;
