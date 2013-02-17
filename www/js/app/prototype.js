// Prototype stuff
// leoncoto@gmail.com
define(function (require) {
  'use strict';
  var $ = require('jquery')
  var _ = require('lodash')
  var Handlebars = require('handlebars')

  var css = Handlebars.compile('translate3d({{ tx }}px, {{ ty }}px, {{ tz }}px) rotateX({{ rx }}deg) rotateY({{ ry }}deg) rotateZ({{ rz }}deg)')

  // -

  var $reset = $('#reset')
  var $selectFace = $('#select-face')
  var $inputs = $('input[type="range"]')
  var inputs = {}
  $inputs.each(function (index, input) {
    var $input = $(input)
    var name = $input.attr('name')
    inputs[name] = {
      $el: $input,
      name: name
    }
  })

  function defaultData() {
    return {
      tx: 0,
      ty: 0,
      tz: 0,
      rx: 0,
      ry: 0,
      rz: 0
    }
  }

  function makeFace(name) {
    return {
      name: name,
      $el: $('.' + name),
      data: defaultData()
    }
  }

  var faces = {
    floor: makeFace('floor'),
    left:  makeFace('left'),
    back:  makeFace('back'),
    right: makeFace('right'),
    front: makeFace('front'),
    // this is not really a face...
    cubes: makeFace('cubes')
  }

  // -

  var face = null
  function selectFace(name) {
    face = faces[name]
    $selectFace.val(name)
  }

  function updateData() {
    _.each(inputs, function (input) {
      face.data[input.name] = input.$el.val()
    })
  }

  function resetData () {
    face.data = defaultData()
  }
  function updateControls () {
    _.each(inputs, function (input) {
      input.$el.val(face.data[input.name])
    })
  }

  function updateFace () {
    face.$el.css('transform', css(face.data))
  }

  $selectFace.on('change', function () {
    selectFace($selectFace.val())
    updateControls()
  })

  $inputs.on('change', function () {
    updateData()
    updateFace()
  })

  $reset.on('click', function () {
    resetData()
    updateFace()
    updateControls()
  })

  selectFace('floor')
  // var $cubes = $('#cubes')
  // $cubes.css('transform', css(defaultData()))
})
