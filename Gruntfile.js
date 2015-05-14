module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['js/plugins.js', 'js/main.js'],
        dest: 'js/scripts.min.js'
      }
    }, 
    jshint: {
      files: ['Gruntfile.js', 'js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        }
      },
      files: {
        'css/main.css': 'sass/main.scss'
      }
    },
    watch: {
      css: {
        files: 'sass/*.scss',
        tasks: ['sass'],
        options: {
          livereload:true,
        }
      },
      html: {
        files: 'index.html',
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'watch']);

};