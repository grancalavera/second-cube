/* jshint devel:true */
define(function(require) {
    'use strict';
    var $ = require('jquery'),
        doc = $(document),
        cube = require('app/cube'),
        $cube = $('#cube')


    var init = function () {
      var cubeFace = cube(150)
      $cube.append(cubeFace())
      $cube.append(cubeFace.next())
      $cube.append(cubeFace.next().next())
      $cube.append(cubeFace.next().next().next())
      $cube.append(cubeFace.next().next().next().next())
    }

    $(function () {
      init()
    })

    return {
      title: 'Second Cube',
      doc: doc
    };
});
