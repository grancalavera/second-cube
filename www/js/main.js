/*
 * second-cube: application bootstrap.
 * https://github.com/grancalavera/second-cube
 *
 * Copyright (c) 2013 Leon Coto
 * Licensed under the MIT license.
 */
;(function () {
  'use strict';

  requirejs.config({
    urlArgs:'bust=' + new Date().getTime(),
    baseUrl: 'js/lib',
    paths: {
      app: '../app',
      templates: '../templates/built/templates'
    },
    // http://requirejs.org/docs/api.html#config-shim
    shim: {
      'handlebars': {
        exports: 'Handlebars'
      },
      'lodash': {
        exports: '_'
      },
      // see
      // https://github.com/gruntjs/grunt-contrib-handlebars/pull/4#issuecomment-8510600
      'templates': {
        exports: 'JST',
        deps: ['handlebars']
      }
    }
  });

  requirejs(['app/second-cube']);
})();
