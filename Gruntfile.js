module.exports = function(grunt) {
  var path = require('path');

  // Configurações do projeto
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Uglify (https://npmjs.org/package/grunt-contrib-uglify)
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: true,
        beautify: false
      },
      build: {
        src: 'public/javascripts/test.js',
        dest: 'public/javascripts/test.min.js'
      }
    },

    //Compass (https://npmjs.org/package/grunt-contrib-compass)
    compass: {
      options: {
        config: 'config.rb'
      },
      dist: {
        options: {
          environment: 'production'
        }
      },
      dev: {
        options: {
          environment: 'development'
        }
      }
    },

    //HTML Compressor (https://npmjs.org/package/grunt-htmlcompressor)
  });

  //Minifica o código JS
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Gera CSS (para desenvolvedores que não utilizam o CSS)
  grunt.loadNpmTasks('grunt-contrib-compass');

  //Minifica o HTML
  grunt.loadNpmTasks('grunt-htmlcompressor');

  //Registra as tarefas
  grunt.registerTask('default', ['uglify', 'compass', 'htmlcompressor'], function(){
    
  });
};