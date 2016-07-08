angular.module('contractPieMocks', [])
  .factory('DatabaseService', [function () {
    return {
      get: function (query) {
        return query;
      }
    }
  }])