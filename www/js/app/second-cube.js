/* jshint devel:true */
define(function(require) {
    'use strict';
    var $ = require('jquery'),
        faces = require('app/face-stream'),
        tmpl = require('templates')['cube-face'],
        ctx = require('app/rendering-context')(150),
        $cubes = $('#cubes')

    var init = function () {
      var firstFace = faces(tmpl, ctx)
      $cubes.append(firstFace.render())
      $cubes.append(firstFace.next().render())
      $cubes.append(firstFace.next().next().render())
      $cubes.append(firstFace.next().next().next().render())
      $cubes.append(firstFace.next().next().next().next().render())
    }

    $(function () {
      init()
    })

});
