/* jshint devel:true */
define(function(require) {
    'use strict';
    var $ = require('jquery'),
        faces = require('app/face-stream'),
        tmpl = require('templates')['cube-face'],
        ctx = require('app/rendering-context')(150),
        $cube = $('#cube')

    var init = function () {
      var firstFace = faces(tmpl, ctx)
      $cube.append(firstFace.render())
      $cube.append(firstFace.next().render())
      $cube.append(firstFace.next().next().render())
      $cube.append(firstFace.next().next().next().render())
      $cube.append(firstFace.next().next().next().next().render())
    }

    $(function () {
      init()
    })

});
