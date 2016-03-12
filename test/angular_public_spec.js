var publishExternalApi = require('../src/angular_public.js');
var createInjector = require('../src/injector.js');

describe('angularPublic', function () {

  it('sets up the angular object and the module loader', function() {
    publishExternalApi();

    expect(window.angular).toBeDefined();
    expect(window.angular.module).toBeDefined();
  });

  it('sets up the ng module', function() {
    publishExternalApi();

    expect(createInjector(['ng'])).toBeDefined();
  });

  it('sets up the $parse service', function() {
    publishExternalApi();
    var injector = createInjector(['ng']);
    expect(injector.has('$parse')).toBe(true);
  });

  it('sets up the $rootScope', function() {
    publishExternalApi();
    var injector = createInjector(['ng']);
    expect(injector.has('$rootScope')).toBe(true);
  });

  it('sets up $q', function() {
    publishExternalApi();
    var injector = createInjector(['ng']);
    expect(injector.has('$q')).toBe(true);
  });

  it('sets up $http and $httpBackend', function() {
    publishExternalApi();
    var injector = createInjector(['ng']);
    expect(injector.has('$http')).toBe(true);
    expect(injector.has('$httpBackend')).toBe(true);
  });

  it('sets up $compile', function() {
    publishExternalApi();
    var injector = createInjector(['ng']);
    expect(injector.has('$compile')).toBe(true);
  });

  it('sets up $controller', function() {
    publishExternalApi();
    var injector = createInjector(['ng']);
    expect(injector.has('$controller')).toBe(true);
  });
});
