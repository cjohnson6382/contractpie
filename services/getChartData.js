angular.module('contractPie').factory('GetChartData', ['$q', '$http', 'DatabaseService', function ($q, $http, DatabaseService) {
  return {
    get: function () {
      var contractData;
      var dbGetter = $q.defer();
      
      if (DatabaseService.exists()) {
        DatabaseService.get()
          .then(function (dbResponseContracts) {
            dbGetter.resolve(dbResonseContracts);
          });
      } else {
        $http.get('https://data.baltimorecity.gov/resource/e7gh-hui5.json')
          .then(DatabaseService.insert(jsonReponse))
          .then(DatabaseService.get())
          .then(function (dbResponseContracts) {
            dbGetter.resolve(dbResponseContracts);
          });
      }

      return dbGetter.promise;
    }
  };
}]);