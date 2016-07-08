angular.module('contractPie').factory('Categories', 'byPropertyFilter', [function (Categories, byPropertyFilter) {
  var dataPrepare = {
    PieData: function (options, category) {
      var pieData;
      var redux = function (prev, curr) { return prev + curr[options.aggregator]; };
      for (var i = 0; i < category.length; i++) {
        var sumOfAggregator = category[i].reduce(redux, 0);  //  this might be broken; I think this is the right syntax, but....
        pieData.push([category[i][options.category], sumOfAggregator]);
      }
      
      return [options.category, options.aggregator].concat(pieData);
    },
    DetailData: function (options, category) {
      var detailData;
      for (var i = 0; i < category.length; i++) {
        detailData.push([category[i][options.category], category[i]]);
      }
      return detailData;
    }
  };

  var categories;
  var jsonData;
  return {
    contractData: function (jsonData) {
      contracts = JSON.parse(jsonData);
      //  begin/end date are unix epochs; need year numbers for proper sorting
      for (var i = 0; i < contracts.length; i++) {
        contracts[i].beginyear = new Date(contracts[i].begindate).getFullYear();
        contracts[i].endyear = new Date(contracts[i].enddate).getFullYear();
      }
    },
    get: function (options) {
      var final = dataPrepare[options.format](options, categories[options.category]);
      return final;
    },
    set: function (category, options) {
      //  category is a category name ('agency') and the subCategories is a list of different agencies ('mayor's office)
      var subCategories;
      var i, j;
      
      for (i = 0; i < contracts.length; i++) {
        subCategories[contracts[i][category]] = 1;
      }
      subCategories = Object.keys(subCategories);
      
      for (i = 0; i < subCategories.length; i++) {
        for (j = 0; j < contracts.length; j++) {
          if (contracts[j][category] === subCategories[i]) {
            categories[category][subCategories[i]].push(contracts[j]);
          }
        }
      }
    },
    list: function () {
      return Object.keys(categories);
    }
  };
}]);