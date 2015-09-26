"use strict";

var path = require('path');
var APP_DIR = path.join(__dirname, '../.');
var SRC_DIR = path.join(APP_DIR, 'src');

module.exports = {
  SRC_DIR: SRC_DIR,
  scriptsConfig: {
    APP_NAME: 'techgarden',
    PROJECT_KEY: process.env.ROYAL_PROJECT_KEY,
    HOST_NAME: process.env.HOST_NAME || 'http://soul.techgarden.kz',
    FILE_SERVER: process.env.ROYAL_FILE_SERVER || 'http://fs.royal.com'
  },
  paths: {
    indexFile: [
      SRC_DIR + '/index.html'
    ],
    views: SRC_DIR + '/templates/**/*.html',
    images: [
      SRC_DIR + '/img/**/*',
      APP_DIR + '/assets/**/*'
    ],
    styles: [
      'bower_components/font-awesome/css/font-awesome.css',
      'bower_components/bootstrap/dist/css/bootstrap.css',
      'bower_components/animate.css/animate.css',
      'bower_components/bootstrap/dist/css/bootstrap-theme.css',
      'bower_components/angular-chart.js/dist/angular-chart.css',
      'bower_components/angular-notify/dist/angular-notify.css',
      SRC_DIR + '/css/styles.css'
      //      SRC_DIR + '/css/all.less'
    ],
    less: [
      'css',
      'css/base',
      'css/bootstrap',
      'css/bootstrap/mixins'
    ],
    fonts: [
      'src/fonts/**/*',
      'bower_components/bootstrap/dist/fonts/*',
      'bower_components/font-awesome/fonts/*'
    ],
    data: [
      'src/data/**/*'
    ],
    vendors: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/Chart.js/Chart.min.js',
      'bower_components/angular-chart.js/dist/angular-chart.js',
      //      'bower_components/angular-notify/dist/angular-notify.js',
      'bower_components/angular-animate/angular-animate.js'
      //      'bower_components/angular-bootstrap/ui-bootstrap.js',
      //      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      //      'bower_components/angular-resource/angular-resource.js'
    ],
    scripts: {
      general: [
        SRC_DIR + '/js/**/*.js'
      ],
      app: [
        SRC_DIR + '/js/app.js',
        SRC_DIR + '/js/router.js'
      ],
      controllers: SRC_DIR + '/js/controllers',
      directives: SRC_DIR + '/js/directives',
      services: SRC_DIR + '/js/services',
      filters: SRC_DIR + '/js/filters'
    }
  }
};