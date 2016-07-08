angular.module('contractPie').directive('detailWidget', [function () {
  return {
    restrict: 'A',
    scope: {
      detailData: '=',
      detailConfig: '='
    },
    template: '<div ng-repeat="data in detail-data">' +
                '<div ng-repeat="contract in data">' +
                  '<span>contract.agency</span>' +
                  ' -- <span>Begin: contract.beginyear</span>' +
                  ' -- <span>End: contract.endyear</span>' +
                  ' | <span>Value: contract.totalcontractamt</span>' +
                '</div>' +
              '<div>'
  };
}]);