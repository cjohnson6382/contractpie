angular.module('balirest', ['ngAnimate', 'ui.bootstrap'])
  .controller('GetDb', ['DataService', 'DbInserter', function (DataService, DbInserter) {
    DataService.query().then(function (response) {
      $scope.crimes = response;
      for (var i = 0; i < $scope.crimes.length; i++) {
        DbInserter.dbInsert($scope.crimes[i]).then($scope.successfulInserts.push($scope.crimes[i]), $scope.failInserts.push($scope.crimes[i]));
      }
    });
  }])
  .directive('dbentry', [function () {
    return {
      template: '<div name="crimeListing">' +
                '<span ng-bind=crime.crimedate></span> ' +
                '<span ng-bind=crime.description></span> ' +
                '<span ng-bind=crime.location></span>' +
                '</div>',
      restrict: 'E',
      scope: { crime: '='}
    };
  }])
  .factory('DataService', ['$http', function ($http) {
    return {
      query: function () {
        return $http.get('https://data.baltimorecity.gov/6ayg-3z5z.json');
      }
    };
  }])
  .factory('DbInserter', ['$http', function ($http) {
    return {
      dbInsert: function (dbobject) {
        //  return a promise so the response can be chained onto
        return $http('cjohnson.ignorelist.com:4343/dbInserter', {params: dbobject});
      }
    }
  }]);