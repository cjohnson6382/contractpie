angular.module('contractPie').directive('pieChartWidget', ['GoogleChartLoader', function (GoogleChartLoader) {
  var arrayToDataTable = function (data) { return google.visualization.arrayToDataTable(data) };
  
  return {
    restrict: 'A',
    scope: {
      chartData: '=',
      chartConfig: '='
    },
    link: function ($scope, $element) {
      googleChartLoader.then(function () {
        var chart = new google.visualization.PieChart($element[0]);
      });
    }
  };
}]);