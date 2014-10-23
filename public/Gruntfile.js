module.exports = function(grunt) {

  grunt.initConfig({

    less: {
      development: {
        options: {
          paths: ["public/styles"]
        },
        files: {
          "public/styles/styles.css": "public/less/styles.less"
        }
      },
      production: {
        options: {
          paths: ["public/styles"],
          cleancss: true
        },
        files: {
          "public/styles/styles.css": "public/less/styles.less"
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: [
        'bower_components/jquery-ui/ui/widget.js',
        'bower_components/jquery-ui/ui/mouse.js',
        'public/js/lib/jquery.ui.touch-punch.min.js',
        'public/js/lib/jquery.mobile.custom.min.js',
        'public/js/app.js',
        'public/js/directives.js'
        ],
        dest: 'public/js/main.js',
      }
    },

    uglify: {
      js: {
        files: {
          'public/js/main.js': 'public/js/main.js'
        }
      }
    },

    watch: {
      js: {
        files: [
        'public/js/app.js',
        'public/js/directives.js'
        ],
        tasks: ['concat:js', 'uglify:js']
      },
      styles: {
        files: ['public/less/*.less'],
        tasks: ['less']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};