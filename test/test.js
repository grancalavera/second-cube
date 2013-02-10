/*jshint devel:true */
;(function () {
  'use strict';
  requirejs.config({
    urlArgs:'bust=' + new Date().getTime(),
    baseUrl: '../www/js/lib',
    paths: {
      app: '../app',
      templates: '../templates/built/templates',
      tests: '../../../test/tests'
    },
    // http://requirejs.org/docs/api.html#config-shim
    shim: {
      'handlebars': {
        exports: 'Handlebars'
      },
      // see
      // https://github.com/gruntjs/grunt-contrib-handlebars/pull/4#issuecomment-8510600
      'templates': {
        exports: 'JST',
        deps: ['handlebars']
      }
    }
  });
  var allTests = [
    'tests/second-cube-tests'
    // add more tests here...
  ];
  requirejs(allTests, function () {
    QUnit.start();
  });
})();
