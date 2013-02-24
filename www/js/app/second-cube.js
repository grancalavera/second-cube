/* jshint devel:true */
/*!
 * second-cube.js
 * leoncoto@gmail.com
 */
define(function(require) {
    'use strict';
    var $ = require('jquery'),
        _ = require('lodash'),
        faces = require('app/face-stream'),
        ctx = require('app/rendering-context'),
        tmpl = require('templates')['cube-face'],

        $tower = $('#tower'),
        $cubes = $('#cubes'),

        size = 200,
        limit = 40,
        count = 0,
        level = 0,
        levels = [[]],
        maxLevels = 4,

        face, render


    ctx = ctx(size)
    face = faces(tmpl, ctx, 0)

    var moveTower = function () {
      var distance = size / 5
      var css = 'translateY(' + (distance * count) + 'px)'
      $tower.css('transform', css)
    }

    var cleanupOldLevels = function () {
      if (levels.length > maxLevels) {
        var first = levels.shift().join(',')
        $(first).remove()
      }
    }

    var updateLevels = function () {
      var l = Math.floor(count / 5)
      if (l !== level) {
        level = l
        levels.push([])
        cleanupOldLevels()
      }
    }

    var appendFace = function () {
      $cubes.append(face.render())
      levels[levels.length - 1].push('#' + face.id())
      count ++
      updateLevels()
      moveTower()
      face = face.next(level)
    }

    $cubes.bind('webkitAnimationEnd animationend', function () {
      appendFace()
    })

    var init = function () {
      appendFace()
    }

    $(function () {
      init()
    })

});
