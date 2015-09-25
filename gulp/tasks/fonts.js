"use strict";

var gulp = require('gulp'),
  notify = require('gulp-notify'),
  config = require('../config');

gulp.task('fonts', function() {
  return gulp.src(config.paths.fonts)
    .pipe(gulp.dest('dist/fonts'));
});