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

			vendor: {
				src: [
					'assets/js/components/underscore/underscore-min.js',
					'assets/js/components/backbone/backbone.js'
				],
				dest: 'assets/js/build/vendor.js',
			},
			app: {
				src: [
					'assets/js/app/templates.js', 
					'assets/js/app/config.js', 
					'assets/js/app/__.js', 
					'assets/js/app/component.js', 
					'assets/js/app/events.js', 
					'assets/js/app/init.js',
					'assets/js/app/app.js'
				],
				dest: 'assets/js/build/app.js'
			}
		},

		uglify: {
  			options: {
    			// the banner is inserted at the top of the output
    			banner: '/*! <%= pkg.name %> main - built with Backbone + Underscore - built <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  			},
			
			vendor: {
  				src: [ '<%=concat.vendor.dest%>' ],
  				dest: 'assets/js/release/vendor.min.js'
  			},
  			app: {
  				src: [ '<%=concat.app.dest%>' ],
  				dest: 'assets/js/release/app.min.js'
  			}
		},

		watch: {
			vendor: {
				files: [ 'assets/js/components/**/*.js' ],
				tasks: [ 'concat:vendor', 'uglify:vendor' ]
			},
			app: {
				files: [ 'assets/js/app/*.js' ],
				tasks: [ 'concat:app', 'uglify:app' ]
			},
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
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');

	//grunt.registerTask('default', ['concat', 'uglify', 'compass', 'clean']);
	grunt.registerTask('default', ['concurrent:target' ]);

}; // module.exports