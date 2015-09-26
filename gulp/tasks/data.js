"use strict";

var gulp = require('gulp'),
  notify = require('gulp-notify'),
  config = require('../config');

gulp.task('data', function() {
  return gulp.src(config.paths.data)
    .pipe(gulp.dest('dist/data'));
});
