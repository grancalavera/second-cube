// Provides an infinite stream of cube faces
// leoncoto@gmail.com
define(function (require) {
    'use strict';
    var _ = require('lodash')

    var faceMaker = function (position, next) {
      return function (template, context, level) {
        context = _.extend({}, context, {position: position})

        var make = function() {
          return render()
        }
        var render = function () {
          context.bottom = context.size * level
          context.id = id()
          return template(context)
        }
        var id = function () {
          return context.position + level
        }

        make.next = function (level) {
          return next(template, context, level)
        }
        make.render = function () {
          return render ()
        }
        make.id = function () {
          return id()
        }
        return make
      }
    }

    var floor = faceMaker('floor', function (t, c, l) { return left(t, c, l) })
    var left = faceMaker('left', function (t, c, l) { return back(t, c, l) })
    var back = faceMaker('back', function (t, c, l) { return right(t, c, l) })
    var right = faceMaker('right', function (t, c, l) { return front(t, c, l) })
    var front = faceMaker('front', function (t, c, l) { return floor(t, c, l) })

    return function (template, context, level) {
      return floor(template, context, level)
    }
})
