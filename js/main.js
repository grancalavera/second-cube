/*
 * second-cube: application bootstrap.
 * https://github.com/grancalavera/second-cube
 *
 * Copyright (c) 2013 Leon Coto
 * Licensed under the MIT license.
 */

(function() {
    requirejs.config({
        urlArgs: "bust=" + (new Date).getTime(),
        baseUrl: "js/lib",
        paths: {
            app: "../app",
            templates: "../templates/built/templates"
        },
        shim: {
            handlebars: {
                exports: "Handlebars"
            },
            lodash: {
                exports: "_"
            },
            templates: {
                exports: "JST",
                deps: [ "handlebars" ]
            }
        }
    }), requirejs([ "app/second-cube" ]);
})();;