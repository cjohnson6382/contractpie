describe('Controller: dbGetter', function () {
  beforeEach(module('balirest'));
  
  var respondo = ([
      {crimecode: '5F', district: 'NORTHERN', location: '3100 GREENMONT AVE', neighborhood: 'Abell'},
      {crimecode: '5D', district: 'SOUTHWESTERN', location: '400 N EDGEWOOD ST', neighborhood: 'Allendale'}
    ]);
    
  var ctrl, mockBackend, mockService, mockDbService;

  beforeEach(inject(function ($controller, $httpBackend) {
    mockBackend = $httpBackend;
    ctrl = $controller('GetDb');
  }));

  beforeEach(module(function ($provide) {
    mockService = {
      dbInsert: function (dbobject) {
        return [{success: dbobject, error: null}];
      }
    };
    
    $provide.value('DbInserter', mockService);
  }));

  afterEach(function () {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
  });
  
  it('should get from one of the Open Data URLs', function () {
    
    mockBackend.expectGET('https://data.baltimorecity.gov/6ayg-3z5z.json').respond(respondo);
    
    expect(ctrl.crimes).toEqual([]);
    
    mockBackend.flush();
    
    expect(ctrl.crimes).toEqual(respondo);
  });
  
  
  it('should perform a mock db insertion', function () {
    mockBackend.expectGET('https://cjohnson.ignorelist.com:4343/dbInserter').respond(respondo[0]);
    
    expect(ctrl.dbInsert(respondo[0]).success).toEqual(respondo[0]);
  });
  
});