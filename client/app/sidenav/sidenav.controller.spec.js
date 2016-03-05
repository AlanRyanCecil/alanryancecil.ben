'use strict';

describe('Controller: SidenavCtrl', function () {

  // load the controller's module
  beforeEach(module('alandotApp'));

  var SidenavCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidenavCtrl = $controller('SidenavCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
