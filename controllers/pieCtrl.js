angular.module('contractPie').controller('PieCtrl', ['Categories', 'GetChartData', 'DatabaseService', function (Categories, GetChartData, DatabaseService) {
  var jsonData = GetChartData.get();
  Categories.contractData(jsonData);
  Categories.set('begindate', { special: 'beginyear' });
  Categories.set('agency');

  $scope.dateChartData = Categories.get({
    category: 'begindate',
    format: 'PieData',
    aggregator: 'totalcontractamt'
  });
  $scope.dateChartConfig = { title: 'By Year' };
  
  $scope.agencyChartData = Categories.get({
    category: 'agency',
    format: 'PieData',
    aggregator: 'totalcontractamt'
  });
  $scope.agencyChartConfig = { title: 'By Agency' };
}]);