'use strict';

describe('Controller: AnimationCtrl', function () {

  // load the controller's module
  beforeEach(module('alandotApp'));

  var AnimationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnimationCtrl = $controller('AnimationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
