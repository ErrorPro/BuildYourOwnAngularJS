var _ = require('lodash');

function $QProvider() {
  this.$get = ['$rootScope', function($rootScope) {
    function Promise() {
      this.$$state = {};
    }

    Promise.prototype.then = function (onFullFiled, onRejected) {
      var result = new Deferred();
      this.$$state.pending = this.$$state.pending || [];
      this.$$state.pending.push([result, onFullFiled, onRejected]);
      if (this.$$state.status > 0) {
        scheduleProcessQueue(this.$$state);
      }
      return result.promise;
    };

    Promise.prototype.catch = function(onRejected) {
      return this.then(null, onRejected);
    };

    Promise.prototype.finally = function(callback) {
      return this.then(function(value) {
        var callbackValue = callback();
        if (callbackValue && callbackValue.then) {
          return callbackValue.then(function() {
            return value;
          });
        } else {
          return value;
        }
      }, function(rejection) {
        var callbackValue = callback();
        if (callbackValue && callbackValue.then) {
          return callbackValue.then(function() {
            var d = new Deferred();
            d.reject(rejection);
            return d.promise;
          });
        } else {
          var d = new Deferred();
          d.reject(rejection);
          return d.promise;
        }
      });
    };

    function Deferred() {
      this.promise = new Promise();
    }

    Deferred.prototype.resolve = function(value) {
      if (this.promise.$$state.status) {
        return;
      }
      if (value && _.isFunction(value.then)){
        value.then(
          _.bind(this.resolve, this),
          _.bind(this.reject, this)
        );
      } else {
        this.promise.$$state.value = value;
        this.promise.$$state.status = 1;
        scheduleProcessQueue(this.promise.$$state);
      }
    };

    Deferred.prototype.reject = function(reason) {
      if (this.promise.$$state.status) {
        return;
      }
      this.promise.$$state.value = reason;
      this.promise.$$state.status = 2;
      scheduleProcessQueue(this.promise.$$state);
    };

    function defer() {
      return new Deferred();
    }

    function scheduleProcessQueue(state) {
      $rootScope.$evalAsync(function() {
        processQueue(state);
      });
    }

    function processQueue(state) {
      if (state.pending) {
        var pending = state.pending;
        delete state.pending;
        pending.forEach(function(handlers) {
          var deferred = handlers[0];
          var fn = handlers[state.status];
          try{
            if (_.isFunction(fn)) {
              deferred.resolve(fn(state.value));
            } else if (state.status === 1) {
              deferred.resolve(state.value);
            } else if (state.status === 2) {
              deferred.reject(state.value);
            }
          } catch (e) {
            deferred.reject(e);
          }
        });
      }
    }

    return {
      defer: defer
    };
  }];
}

module.exports = $QProvider;
