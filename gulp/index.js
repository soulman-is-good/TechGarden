"use strict";

var gulp = require('gulp');
var config = require('./config');
var fs = require('fs');
var tasks = fs.readdirSync(__dirname + '/tasks');
var livereload = require('gulp-livereload');
var serve = require('gulp-serve');

function prepareTasks() {
  var tasknames = [];
  for(var i = 0, l = tasks.length; i < l; i++) {
    require('./tasks/' + tasks[i]);
    tasknames.push(tasks[i].split('.').slice(0, -1).join('.'));
  }
  return tasknames;
}

gulp.task('default', function(){
  var tasknames = prepareTasks();
	gulp.start.apply(gulp, tasknames);
});

gulp.task('watch', function(){
  var tasknames = prepareTasks();
  gulp.watch(config.paths.scripts.general, ['scripts']);
  gulp.watch(config.paths.styles, ['styles']);
  gulp.watch(config.paths.views, ['views']);
	gulp.start.apply(gulp, tasknames);
});

gulp.task('serve', function(){
  var tasknames = prepareTasks();
  livereload.listen();
  tasknames.push(serve('dist'));
  gulp.watch(config.paths.scripts.general, ['scripts']);
  gulp.watch(config.paths.styles, ['styles']);
  gulp.watch(config.paths.views, ['views']);
	gulp.start.apply(gulp, tasknames);
});