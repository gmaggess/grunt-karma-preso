'use strict';

module.exports = function(grunt) {
    var appConfig = {
        main: 'src/main',
        test: 'src/test',
        dist: 'dist',
        comp: 'bower_components',
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: appConfig,
        uglify: {
            demo: {
                options: {
                    mangle: false,
                    compress: true,
                    preserveComments: true
                },
                files: {
                    '<%= app.dist %>/scripts/<%= pkg.name %>.min.js': ['<%= app.comp %>/todomvc-common/base.js', '<%= app.comp %>/knockout.js/knockout.js', '<%= app.comp %>/director/build/director.js', '<%= app.main %>/scripts/*.js', ]
                }
            }
        },
        jshint: {
            all: ['<%= app.main %>/scripts/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            }
        },
        clean: {
            build: {
                src: ['<%= app.dist %>'],
                options: {
                    force: true
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= app.main %>',
                    src: [
                        '*.html'
                    ],
                    dest: '<%= app.dist %>'
                }]
            }
        },
        cssmin: {
            compress: {
                files: {
                    '<%= app.dist %>/resources/css/base.css': ['<%= app.comp %>/todomvc-common/base.css']
                }
            }
        },
        watch: {
            options: {
                livereload: 35729,
                nospawn: true
            },
            html: {
                files: '<%= app.main %>/*.html',
                tasks: ['copy:main']
            },
            scripts: {
                files: '<%= app.main %>/scripts/*.js',
                tasks: ['uglify:demo', 'jshint']
            },
            css: {
                files: '<%= app.dist %>/resources/css/*.css',
                tasks: ['cssmin']
            }
        },
        connect: {
          server: {
            options: {
              hostname: '*',
              port: 3001,
              base: '<%= app.dist %>',
              middleware: function(connect, options) {
                return [
                  require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
                  connect.static(options.base)
                ];
              }            
            }
          }
        },
        open: {
          server: {
            path: 'http://localhost:3001'
          }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
  
    // Default task (includes format checking)
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('build', ['clean', 'uglify:demo', 'cssmin', 'copy:main']);
    grunt.registerTask('server', ['build', 'connect', 'open', 'watch']);


};