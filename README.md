# Grunt and Karma Brown Bag Session

##Grunt

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

```
  ...
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

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
