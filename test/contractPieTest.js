//  test the Categories factory ***


//  PieCtrl should do:
//    get JSON from the server (GetHttpChartData)   TEST DONE
//    parse JSON into discrete objects (no testing needed: just use JSON.parse(jsonString) )
//    store contract objects in the local DB    TEST DONE

//  just going to load the entire database whenever the page loads; it's only 770 entires and I'll be loading locally

//      need a thing that aggregates data that has been pulled from the DB    TEST DONE
  
describe('Controller: PieCtrl', function () {

  var respondo = ([
      {
        "amtremaining" : "197028.00",
        "amtspent" : "344620.00",
        "begindate" : 1313823600,
        "enddate" : 1345359600,
        "totalcontractamt" : "541648.00",
        "agency" : "MAYOR'S OFFICE OF CIVIC PROMOTION",
        "contractno" : "P503784:0",
        "vendorid" : "00000363",
        "vendorname" : "Triangle Sign & Service",
        "desc" : "Way Finding Signage - Heritage"
      },
      {
        "amtremaining" : "23980.00",
        "amtspent" : "76020.00",
        "begindate" : 1313823600,
        "enddate" : 1345359600,
        "totalcontractamt" : "100000.00",
        "agency" : "City-Wide",
        "contractno" : "P503784:0",
        "vendorid" : "00000363",
        "vendorname" : "Triangle Sign & Service",
        "desc" : "Way Finding Signage - Heritage"
      }
    ]);
  
  var ctrl;
  beforeEach(module('contractPie'));
  beforeEach(inject(function ($controller) {
    ctrl = $controller('PieCtrl');
  }));
  
  //  testing the aggregator function
  describe('the function that aggregates data pulled from the database', function () {
    it('should sum the totalcontractamt properties in the objects passed to it', function () {
      var dataTableFormattedArray = ctrl.aggregate('agency', 'totalcontractamt', respondo);
      //  return an object that has the headers and the actual data table info
      expect(dataTableFormattedArray).toEqual([['agency', 'totalcontractamt'], ["MAYOR'S OFFICE OF CIVIC PROMOTION", 541648.00], ["City-Wide", "100000.00"]]);
    });
  });
  
    
  //  testing GetHttpChartData
  describe('testing the GetHttpChartData service', function () {
    beforeEach(inject(function ($httpBackend) {
      mockBackend = $httpBackend;
    }));
  
    afterEach(function () {
      mockBackend.verifyNoOutstandingExpectation();
      mockBackend.verifyNoOutstandingRequest();
    });
    
    it('should get from an Open Data URL (testing factory: GetHttpChartData)', function () {
      
      mockBackend.expectGET('https://data.baltimorecity.gov/resource/e7gh-hui5.json').respond(respondo);
      
      expect(ctrl.categories).toEqual([]);
      
      mockBackend.flush();
      
      expect(ctrl.categories).toEqual(respondo);
    });
  });

  describe('insert objects into the local DB', function () {

    beforeEach(module('contractPieMocks'));

    it('should pass a contract object to the DatabaseService', function () {
      expect(ctrl.dbInsert(respondo[0])).toEqual(respondo[0]);
    });
  });

});

describe('Controller: DetailCtrl', function () {
  //  the detail control is going to be an ng-repeat of each category in the pie chart
  //    so one of the things is going to be a list
  
  var yearRange = [2011, 2012, 2013, 2014];
  var recipientList = ['Mayor', 'City-Wide'];
  
  //  inject the controller
  beforeEach(inject(function ($controller) {
    ctrl = $controller('DetailCtrl');
  }));
  
  //  need to mock the Categories service so that it provides a fixed list of categories
    //  the service that downloads the JSON
    //    needs to convert the epoch time into a datetime
    //    so that I can query by year

  describe('providing a list of dates for Categories', function () {
    beforeEach(module(function ($provide) {
      mockService = {
        get: function () {
          return yearRange;
        }
      };
    
      $provide.value('Categories', mockService);
    }));
    
    it('should be a list of slices from a pie chart', function () {
      expect(ctrl.categories).toEqual(yearRange);
    });
  });

  describe('providing a list of recipients for Categories', function () {
    beforeEach(module(function ($provide) {
      mockService = {
        get: function () {
          return recipientList;
        }
      };
    
      $provide.value('Categories', mockService);
    }));
    
    it('should be a list of slices from a pie chart', function () {
      expect(ctrl.categories).toEqual(recipientList);
    });
  });

});