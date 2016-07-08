angular.module('contractPie').factory('DatabaseService', ['$window', function (window) {
  testJson = function (jsonData) {
    try {
      JSON.parse(jsonData);
    } catch (e) {
      return false;
    }
    return true;
  };
  
  return {
    get: function () {
      return $q(function (resolve, reject) {
        var jsonData = $window.localStorage.getItem('contractPieData');
        if (jsonData === null) {
          reject('could not retrieve jsonData: ' + jsonData);
        } else {
          resolve(jsonData);
        }
      });
    },
    insert: function (jsonData) {
      return $q(function (resolve, reject) {
        if (testJson(jsonData)) {
          resolve($window.localStorage.setItem(json));
        } else {
          reject('the file is not valid JSON');
        }
      });
    },
    exists: function () {
      if (testJson($window.localStorage.getItem('contractPieData'))) {
        return true;
      } else {
        return false;
      }
    }
  };
}]);