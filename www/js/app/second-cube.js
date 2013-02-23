/* jshint devel:true */
define(function(require) {
    'use strict';
    var $ = require('jquery'),
        size = 150,
        faces = require('app/face-stream'),
        tmpl = require('templates')['cube-face'],
        ctx = require('app/rendering-context')(size),
        $cubes = $('#cubes'),
        face = faces(tmpl, ctx),
        render = face.render(),
        limit = 25,
        count = 0,
        level = 1,
        bottom = level * size


    $cubes.on('webkitAnimationEnd', function () {
      appendFace()
    })


    var appendFace = function () {
      if (count >= limit) {
        return
      }
      $cubes.append(render)
      count ++
      level = Math.floor(count / 5) + 1
      face = face.next(level * size)
      render = face.render()
    }

    var init = function () {
      appendFace()
    }

    $(function () {
      init()
    })

});
