var setupModuleLoader = require('./loader.js');

function publishExternalApi() {
  setupModuleLoader(window);

  var ngModule = angular.module('ng', []);
  ngModule.provider('$parse', require('./parse.js'));
  ngModule.provider('$rootScope', require('./scope.js'));
}

module.exports = publishExternalApi;
