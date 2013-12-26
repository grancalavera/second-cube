'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'www/js/.jshintrc'
        },
        src: ['www/js/main.js']
      },
    },

    less: {
      dev: {
        options: {
        },
        files: {
          'www/css/main.css': 'www/less/main.less'
        }
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src']
      },
      less: {
        files: ['www/less/**/*.less'],
        tasks: ['less']
      }
    },

    connect: {
      dev: {
        options: {
          port: 8080,
          base: 'www'
        }
      },
      build: {
        options: {
          port: 8080,
          base: 'www-built'
        }
      }
    },

    autoprefixer: {
      cube: {
        expand: true,
        flatten: true,
        src: 'www/css/*.css',
        dest: 'www/css/'
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'www/',
            src: [
              'bower_components/jquery/jquery.js',
              'bower_components/lodash/dist/lodash.js',
              'index.html',
              'css/main.css',
              'js/main.js'
            ],
            dest: 'www-built/'
          }
        ]
      }
    }

  })

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask('default', ['jshint', 'less', 'autoprefixer'])
  grunt.registerTask('serve', ['default', 'connect:dev', 'watch'])

  grunt.registerTask('build', ['default', 'copy'])
  grunt.registerTask('build:serve', ['build', 'connect:build:keepalive'])


};
