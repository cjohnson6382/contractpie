angular.module('contractPie').controller('DetailCtrl', ['Categories', function (Categories) {
  $scope.categoryData = Categories.list();
  for (var i =0; i < $scope.categoryData.length; i++) {
    $scope.detailedViewsArray.push(Categories.get({
      category: category,
      format: "DetailData"
    }));
  }
}]);