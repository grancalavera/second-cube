 /*jshint devel:true */
define(function (require) {
  'use strict';
  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */
  var $ = require('jquery'),
      main =  require('app/second-cube'),
      doc = $(document);

  module('Second Cube', {
    setup: function () {
      this.title = main.title;
      this.doc = doc;
    }
  });

  test('Second Cube title', function () {
    equal(this.title, 'Second Cube', 'main.title should be Second Cube');
  });

});
