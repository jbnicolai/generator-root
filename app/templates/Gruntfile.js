module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceComments: 'maps'
        },
        files: {
          'www/css/style.css': '_assets/sass/style.scss'
        }
      }
    },
    autoprefixer: {
      single_file: {
        options: {
          browsers: ['last 2 version', 'ie 8', 'ie 7']
        },
        src: 'www/css/style.css',
        dest: 'www/css/style.css'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'www/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'www/css/',
        ext: '.min.css'
      }
    },
    uglify: {
      options: {
        compress:true
      },
      my_target: {
        files: {
          'www/js/main.min.js': ['_assets/js/main.js']
        }
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: '_assets/images',
            src: ['**/*.png'],
            dest: 'www/images/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: '_assets/images',
            src: ['**/*.jpg'],
            dest: 'www/images/',
            ext: '.jpg'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload:true,
      },
      css: {
        files: ['_assets/sass/**/*'],
        tasks: ['sass', 'autoprefixer', 'cssmin']
      },
      scripts: {
        files: ['_assets/js/**/*'],
        tasks: ['uglify']
      },
      images: {
        files: ['_assets/images/**/*'],
        tasks: ['imagemin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['sass', 'uglify', 'autoprefixer', 'imagemin'])

};
