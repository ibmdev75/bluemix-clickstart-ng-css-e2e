'use strict';
module.exports = function(grunt) {
	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

	    dirs:{
			src:  'src/main/webapp/src/',
			test: 'src/test/js',
			build: 'src/main/webapp/build',
			bower_components: 'src/main/webapp/components/'
		},

		src: {
			js: ['src/webapp/src/**/*.js'],
			css: ['src/webapp/src/**/*.css'],
			templates: ['src/webapp/views/*.html']
		},
	    
	    
	    /** Nettoyage du répertoire build et des composants bower **/
	 	clean: {
			
			build: {
				src: [ '<%=dirs.build%>']
			},
			
			bower: { 
				src: [ '<%=dirs.bower_components%>/*','!<%=dirs.bower_components%>/readme.txt']
			}
		},
		
		/** Installation Bower **/
		
		"bower-install-simple": {
			options: {
				color:       true,
				production:  false,
				directory:   "<%=dirs.bower_components%>"
			}
		 },
	    
		/** Concaténation des modules et controllers AngularJS en un unique fichier app.js **/
		 
		 concat: {
				js: {
					src: [
					      '<%= dirs.src %>/app.js',
					      '<%= dirs.src %>/controllers/*.js',
					      '<%= dirs.src %>/services/*.js'
					],
					dest: '<%= dirs.build %>/app.js'
				},
               css: {

                   src: [
                    '<%= dirs.src %>/css/*.css'
                ],
                dest: '<%= dirs.build %>/app.css'
            }
			}, 
			
		ngAnnotate: {
				dist: {
					files: [{
						expand: true,
						cwd: '<%=dirs.build%>',
						src: 'app.js',
						dest: '<%=dirs.build%>'
					}]
				}
			},
		
		uglify: {
	    
	    	
	    /** Minification des sources JS et CSS**/	
	    
	    minify: {
	        files: [ 
	                {
	                	expand: true,
	                	cwd: '<%= dirs.build %>',
	                	src: ['app.js'],
	                	dest: '<%= dirs.build %>',
	                	ext: '.min.js'
	                }]
	     }
		},

        /** Minification des sources CSS **/
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= dirs.build %>',
                src: ['app.css'],
                dest: '<%= dirs.build %>',
                ext: '.min.css'
            }
        }

	  });
	  
	  grunt.loadNpmTasks('grunt-contrib-clean');
	  grunt.loadNpmTasks('grunt-contrib-uglify');
	  grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
	  grunt.loadNpmTasks("grunt-ng-annotate");
	  grunt.loadNpmTasks("grunt-bower-install-simple");
	  grunt.registerTask('default', ['clean:build','clean:bower','bower-install-simple','concat:js','concat:css','ngAnnotate','uglify:minify','cssmin:minify']);
	};
