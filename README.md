# Grunt and Karma Brown Bag Session

## Grunt Presentation
__Step 1__. Install Grunt locally

```
npm install grunt --save-dev
```

Show that grunt gets added to _package.json_.

__Step 2__. Install the following plugins: 

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
                beautify: false,
                preserveComments: true
            },
            files: {
                '<%= app.dist %>/<%= pkg.name %>.min.js': ['<%= app.main %>/js/*.js']
            }
        }
      }
   	...
   	grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task (includes format checking)
    grunt.registerTask('default', ['uglify']);
```

__Step 3__. Configure other plugins:

1. grunt-contrib-jshint
2. grunt-contrib-clean
3. grunt-contrib-copy
4. grunt-contrib-cssmin
5. grunt-contrib-watch

```
npm install grunt-contrib-cssmin grunt-contrib-jshint grunt-contrib-watch grunt-contrib-clean grunt-contrib-copy --save-dev
```

Then add the code below to Grunt:

```

  ...
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');  
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['clean', 'uglify:demo', 'cssmin', 'copy:main']);
```

Show the grunt plugins on _package.json_ as well. Also show the ``node_modules`` directory content. Mention that you should *not* add node_modules to git, since it will be recreated as soon as someone runs ``npm install`` on the current directory.