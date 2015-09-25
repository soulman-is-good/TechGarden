"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  gulpif = require('gulp-if'),
  livereload = require('gulp-livereload'),
  config = require('../config');


gulp.task('vendors', function() {
  return gulp.src(config.paths.vendors)
    .pipe(concat('vendors.js'))
    .pipe(gulpif(process.env.NODE_ENV==='production',uglify()))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});
