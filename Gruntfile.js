module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      pkg: {
        src: ['js/vendor/jqueryy.debouncedresize.js', 'js/vendor/jquery.easing.js', 'js/vendor/waypoints.min.js', 'js/vendor/trianglify.min.js'],
        dest: 'js/plugins.js'
      },
      build: {
        src: ['js/plugins.js', 'js/main.js'],
        dest: 'js/scripts.min.js', 
        options: {
          beautify: true,
          compress: false
        }
      }
    }, 
    jshint: {
      files: ['Gruntfile.js', 'js/main.js'],
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
        },
        files: {
          'css/main.css': 'sass/main.scss'
        }
      }
    },
    autoprefixer: {
      dist: { 
        files: {
          'css/main.css': 'css/main.css'
        }
      }
    },
    watch: {
      options: {
        livereload: 1335
      },
      css: {
        files: 'sass/*.scss',
        tasks: ['sass', 'autoprefixer']
      },
      html: {
        files: 'index.html'
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'uglify']
      }
    }
    // grunticon: {
    //     myIcons: {
    //         files: [{
    //             expand: true,
    //             cwd: 'svg',
    //             src: ['*.svg', '*.png'],
    //             dest: "example/output"
    //         }],
    //         options: {
    //         }
    //     }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  // grunt.loadNpmTasks('grunt-grunticon');

  // Default task(s).
  grunt.registerTask('default', ['uglify:build','watch']);

};