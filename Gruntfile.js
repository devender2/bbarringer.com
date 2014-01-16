module.exports = function(grunt) {
	var production = false; // Set to true in production

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		compass: {
			dist: {
				options: {
					basePath: 'assets',
					sassDir: 'sass',
					cssDir: 'css',
					javascriptsDir: 'js',
					imagesDir: 'img',
					relativeAssets: true,
					outputStyle: production ? 'compressed' : 'nested',
					// SPECIAL NOTE ON SOURCE MAPS:
					// This package currently has a bug with timestamps.  To use sourcemaps, edit node_modules/grunt-contrib-compass/tasks/compass.js
					// --> line 45 (display compilation time) and comment out the next 3 lines
					raw: 'preferred_syntax = :sass\n' + ( production ? '' : 'sass_options = {:sourcemap => true}' ),
					watch: true
				}
			}
		},

		concat: {
			plugins: {
				src: 'assets/js/plugins/**/*.js',
				dest: 'assets/js/build/plugins.js'
			},
			custom: {
				options: {
					banner: ';(function( $ ) { \n\t\'use strict\';\n\n',
					footer: '\n\n}(jQuery));'
				},
				src: 'assets/js/src/**/*.js',
				dest: 'assets/js/build/custom.js'
			},
			app: {
				src: [
					'assets/js/app/templates.js', 
					'assets/js/app/config.js', 
					'assets/js/app/__.js', 
					'assets/js/app/components.js', 
					'assets/js/app/events.js', 
					'assets/js/app/init.js',
					'assets/js/app/app.js'
				],
				dest: 'assets/js/build/app.js'
			},
			dist: {
				src: [
					'<%= concat.plugins.dest %>',
					'<%= concat.custom.dest %>',
					'<%= concat.app.dest %>'
				],
				dest: 'assets/js/<%= pkg.name %>.js'
			}
		},

		uglify: {
  			options: {
    			// the banner is inserted at the top of the output
    			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  			},
  			dist: {
   				files: {
      				'assets/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    			}
  			}
		},

		clean: ['assets/js/build'],

		watch: {
			js: {
				files: [
					'<%= concat.plugins.src %>',
					'<%= concat.custom.src %>',
					'<%= concat.app.src %>'
				],
				tasks: ['clean', 'concat', 'uglify']
			}
		},

		concurrent: {
			target: {
				tasks: [ 'compass', 'watch' ],
				options: {
					logConcurrentOutput: true
				}
			}
		},

	}); //grunt.initConfig

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['concurrent:target' ]);

}; // module.exports