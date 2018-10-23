# Grunt and Karma Presentation Notes

##Grunt

__WHAT IS GRUNT?__

"Built on top of Node.js, Grunt is a task-based command-line tool that speeds up workflows by reducing the effort required to prepare assets for production. It does this by wrapping up jobs into tasks that are compiled automatically as you go along. Basically, you can use Grunt on most tasks that you consider to be grunt work and would normally have to manually configure and run yourself.
While earlier versions came bundled with plugins like JSHint and Uglyify, the most recent release (version 0.4) relies on plugins for everything.
What kind of tasks? Well, the list is exhaustive. Suffice it to say, Grunt can handle most things you throw at it, from minifying to concatenating JavaScript. It can also be used for a range of tasks unrelated to JavaScript, such as compiling CSS from LESS and Sass. We’ve even used it with blink(1) to notify us when a build fails." (_Source: Smashing Magazine_)

__WHY USE GRUNT?__

"One of the best things about Grunt is the consistency it brings to teams. If you work collaboratively, you’ll know how frustrating inconsistency in the code can be. Grunt enables teams to work with a unified set of commands, thus ensuring that everyone on the team is writing code to the same standard. After all, nothing is more frustrating than a build that fails because of little inconsistencies in how a team of developers writes code.
Grunt also has an incredibly active community of developers, with new plugins being released regularly. The barrier to entry is relatively low because a vast range of tools and automated tasks are already available to use." (_Source: Smashing Magazine_)

###Step 1. Install Grunt locally

```
npm install grunt --save-dev
```

Show that grunt gets added to _package.json_.

###Step 2. Basic Concepts 

Open the browser and show where you can look for plugins: http://gruntjs.com/plugins. Show the plugin details such as install command and down the page how to use it.

```
npm install grunt-contrib-uglify --save-dev
```

Before configuring uglify, add some basic config:

```javascript
	var appConfig = {
		main: 'src/main',
		test: 'src/test',
		dist: 'dist',
		comp: 'bower_components',
	};
	...
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
   	...
   	grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task (includes format checking)
    grunt.registerTask('default', ['uglify']);
```

###Step 3. Configure other plugins

1. grunt-contrib-jshint - Code Quality Tool.
2. grunt-contrib-clean - Deletes files / directories.
3. grunt-contrib-copy - Copy files.
4. grunt-contrib-cssmin - Minifies css.
5. grunt-contrib-watch - Run predefined tasks whenever watched file patterns are added, changed or deleted.
6. grunt-contrib-livereload - Does the same thing as watch, but in this case help us do the livereload with the browser.
7. grunt-contrib-connect - Start a static web server.
8. grunt-open - Open urls and files from a grunt task.

```
npm install grunt-contrib-jshint grunt-contrib-clean grunt-contrib-copy grunt-contrib-cssmin grunt-contrib-watch grunt-contrib-livereload grunt-contrib-connect grunt-open --save-dev
```

Then add the code below to Grunt:

```javascript
      ...    
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

  ...
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['uglify', 'jshint']);
  grunt.registerTask('build', ['clean', 'uglify:demo', 'cssmin', 'copy:main']);
  grunt.registerTask('server', ['build', 'connect', 'open', 'watch']);
  ...
```

Show the grunt plugins on _package.json_ as well. Also show the ``node_modules`` directory content. Mention that you should *not* add node_modules to git, since it will be recreated as soon as someone runs ``npm install`` on the current directory.

###Step 4. Development with Productivity

Run the ``grunt server`` and change the `index.html` file to show the autorefresh feature in the browser.

###Step 5. Q & A

_Does Grunt work on Windows?_

Grunt works fine on Windows, because Node.js and npm both work fine on Windows. Usually the problematic part is Cygwin, because it bundles an outdated version of Node.js.

_How do I enable shell tab auto-completion?_

To enable bash tab auto-completion for grunt, add the following line to your ~/.bashrc file:

```
eval "$(grunt --completion=bash)"
```
This assumes that Grunt has been installed globally with npm install -g grunt. Currently, the only supported shell is bash.

##Karma

###Step 1. Install Karma

```
sudo npm install -g karma
```

###Step 2. Create simple tests
For this demo we'll use [Jasmine](https://jasmine.github.io/) as our testing framework, but you could use QUnit or any other framework as long as there's an adapter for Karma. 

Let's quickly build a Jasmine test. Let's suppose we'll write a new Model function:

```javascript
function todo() {
    return "Hello world!";
}
``` 

And for that function, we'll write a test. Forgive me for the simple examples, but the idea is to demo Karma and not Jasmine. :)

```javascript
describe("Todo Model", function() {
    it("says hello", function() {
        expect(helloWorld()).toEqual("Hello world!");
    });
});
```

###Step 3. Create Karma Configuration File

```
karma init
```

Explore configuration file and show that more browsers can be added.

###Step 4. Run Karma

```
karma start
```

###Step 5. Add the Karma configuration to Grunt

Now we'll add the Karma plugin to Grunt.

```
npm install grunt-karma --save-dev
```

```
...
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
        tasks: ['uglify:demo', 'jshint', 'karma:unit']
    },
    css: {
        files: '<%= app.dist %>/resources/css/*.css',
        tasks: ['cssmin']
    }
},
...
karma: {
  auto: {
    configFile: 'karma.conf.js',
    singleRun: false
  }
}
...
grunt.loadNpmTasks("grunt-karma");
...
```

###Step 6. Run Karma from Grunt

```
    grunt.registerTask('default', ['uglify', 'jshint']);
    grunt.registerTask('test', ['karma:auto']);
    grunt.registerTask('build', ['clean', 'uglify:demo', 'cssmin', 'copy:main']);
    grunt.registerTask('server', ['build', 'connect', 'open', 'watch']);
```
###Step 7. Q & A

