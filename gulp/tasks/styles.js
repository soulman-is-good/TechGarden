"use strict";

var gulp = require('gulp'),
  less = require('gulp-less'),
  notify = require('gulp-notify'),
  gulpif = require('gulp-if'),
  minifycss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  prefixer = require('gulp-autoprefixer'),
  config = require('../config');

gulp.task('styles', function() {
  return gulp.src(config.paths.styles)
    .pipe(gulpif(function(file) {
      return /\.less$/.test(file.path);
    }, less({
      paths: config.paths.less,
      syncImport: false
    })))
    .pipe(concat('bundle.css'))
    .pipe(gulpif(process.env.NODE_ENV==='production', minifycss({processImport: false})))
    // .pipe(prefixer('last 2 versions', 'ie 9'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
});
