'use strict';

describe('Directive: backgroundThree', function () {

  // load the directive's module and view
  beforeEach(module('alandotApp'));
  beforeEach(module('app/backgroundThree/backgroundThree.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<background-three></background-three>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the backgroundThree directive');
  }));
});