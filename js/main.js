$(function() {

  //--------------------------------------------------------------------------
  //
  // Framework
  //
  //--------------------------------------------------------------------------

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
  };

  var scalePoint = function (point, scale) {
    return _.map(point, function (value) {
      return value * scale;
    });
  };

  var makeContext = function (size) {
    size = parseFloat(size);
    size = _.isNaN(size) ? 100 : size;
    var context = {};
    context.size = size;
    context.points = _.reduce(points, function (scaledPoints, points, property) {
      scaledPoints[property] = _.map(points, function (point) {
        return scalePoint(point, size);
      });
      return scaledPoints;
    }, {});
    return context;
  };

  var faceMaker = function (position, next) {
    return function (template, context, level) {
      context = _.extend({}, context, {position: position});
      var face = {};
      face.next = function (level) {
        return next(template, context, level);
      };
      face.render = function () {
        context.bottom = context.size * level;
        context.id = face.id();
        return template(context);
      };
      face.id = function () {
        return context.position + level;
      };
      return face;
    };
  };

  var floor = faceMaker('floor', function (t, c, l) { return left(t, c, l) });
  var left = faceMaker('left', function (t, c, l) { return back(t, c, l) });
  var back = faceMaker('back', function (t, c, l) { return right(t, c, l) });
  var right = faceMaker('right', function (t, c, l) { return front(t, c, l) });
  var front = faceMaker('front', function (t, c, l) { return floor(t, c, l) });

  //--------------------------------------------------------------------------
  //
  // App
  //
  //--------------------------------------------------------------------------

  var tmpl = _.template($('#face').html()),
      $tower = $('#tower'),
      $cubes = $('#cubes'),
      size = 200,
      ctx = makeContext(size),
      limit = 40,
      count = 0,
      level = 0,
      levels = [[]],
      face = floor(tmpl, ctx, 0),
      maxLevels = 4;

  var moveTower = function () {
    var distance = size / 5;
    var css = 'translateY(' + (distance * count) + 'px)';
    $tower.css('transform', css);
  };

  var cleanupOldLevels = function () {
    if (levels.length > maxLevels) {
      var first = levels.shift().join(',');
      $(first).remove();
    }
  };

  var updateLevels = function () {
    var l = Math.floor(count / 5);
    if (l !== level) {
      level = l;
      levels.push([]);
      cleanupOldLevels();
    }
  };

  var appendFace = function () {
    $cubes.append(face.render());
    levels[levels.length - 1].push('#' + face.id());
    count ++;
    updateLevels();
    moveTower();
    face = face.next(level);
  };

  $cubes.bind('webkitAnimationEnd animationend', function () {
    appendFace();
  });

  appendFace();
});
