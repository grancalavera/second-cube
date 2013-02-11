// Given a size, creates a rendering context for a cube face
// leoncoto@gmail.com
define(function (require) {
    'use strict';
    var _ = require('lodash')
    // corners defined clockwise from top right
    var points = {
      tr: [[0.83, 0], [0.83,0.01], [0.99,0.01], [0.99,0.17], [1,0.17], [1, 0]],
      tl: [[0.01, 0.01], [0.17,0.01], [0.17,0], [0,0], [0,0.17], [0.01, 0.17]],
      bl: [[0.01, 0.99], [0.01,0.83], [0,0.83], [0,1], [0.17,1], [0.17, 0.99]],
      br: [[0.99, 0.99], [0.83,0.99], [0.83,1], [1,1], [1,0.83], [0.99, 0.83]],
      cross: [
        [0.67, 0.50],
        [0.50, 0.50],
        [0.50, 0.33],
        [0.49, 0.33],
        [0.49, 0.50],
        [0.33, 0.50],
        [0.33, 0.51],
        [0.49, 0.51],
        [0.49, 0.67],
        [0.50, 0.67],
        [0.50, 0.51],
        [0.67, 0.51]
      ]
    }
    var scalePoint = function (point, scale) {
      return _.map(point, function (value) {
        return value * scale
      })
    }
    return function(size) {
      size = parseFloat(size)
      size = _.isNaN(size) ? 100 : size
      var context = {}
      context.size = size
      context.points = _.reduce(points, function (scaledPoints, points, property) {
        scaledPoints[property] = _.map(points, function (point) {
          return scalePoint(point, size)
        })
        return scaledPoints
      }, {})
      return context
    }
})
