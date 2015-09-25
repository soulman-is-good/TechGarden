"use strict";

var gulp = require('gulp'),
  notify = require('gulp-notify'),
  livereload = require('gulp-livereload'),
  config = require('../config');

gulp.task('views', function() {
  gulp.src(config.paths.indexFile).pipe(gulp.dest('dist/'));
  gulp.src(config.paths.views)
    .pipe(gulp.dest('dist/templates/'))
    .pipe(livereload())
});