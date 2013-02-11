// Renders all the faces of the cube
// leoncoto@gmail.com
define(function (require) {
    'use strict';
    var _ = require('lodash')
    
    var faceMaker = function (position, next) {
      return function (template, context) {
        context = _.extend({}, context, {position: position})
        var make = function() {
          return template(context)
        }
        make.next = function () {
          return next(template, context)
        }
        return make
      }
    }

    var floor = faceMaker('floor', function (t, c) { return left(t, c) })
    var left = faceMaker('left', function (t, c) { return back(t, c) })
    var back = faceMaker('back', function (t, c) { return right(t, c) })
    var right = faceMaker('right', function (t, c) { return front(t, c) })
    var front = faceMaker('front', function (t, c) { return floor(t, c) })

    return function (template, context) {
      return floor(template, context)
    }
})
