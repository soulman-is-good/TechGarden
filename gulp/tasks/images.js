"use strict";

var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  gulpif = require('gulp-if'),
  config = require('../config');

gulp.task('images', function() {
  gulp.src(config.paths.images)
    // .pipe(gulpif(process.env.NODE_ENV==='production', imagemin()))
    .pipe(gulp.dest('dist/img/'));
});
