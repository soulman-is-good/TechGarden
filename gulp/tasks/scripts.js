"use strict";

var gulp = require('gulp'),
  util = require('util'),
  fs = require('fs'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  gulpif = require('gulp-if'),
  livereload = require('gulp-livereload'),
  insert = require('gulp-insert'),
  jshint = require('gulp-jshint'),
  config = require('../config');


gulp.task('scripts', function () {
  var app = config.scriptsConfig.APP_NAME;
  return gulp.src(config.paths.scripts.app)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(insert.transform(function (content) {
      var keys = Object.keys(config.scriptsConfig);
      var js = '(function(angular, ' + keys.join(',') + ') {' + content.replace(/;\s*$/, '') + ';';
      function readRecursive (path) {
        var files = fs.readdirSync(path);
        var result = [];
        for (var i in files) {
          if (files[i].indexOf('.') !== 0 && fs.statSync(path + "/" + files[i]).isDirectory()) {
            result = result.concat(readRecursive(path + "/" + files[i]));
          } else if (files[i].indexOf('.js') !== -1) {
            result.push(path + "/" + files[i]);
          }
        }
        return result;
      }
      function generateMod (type, name, fnc) {
        var adi = /function\s*?__ADI?\s*?\(([^)]+|)\)\s*?\{/g;
        var args;
        fnc = fnc.toString();
        while (!!(args = adi.exec(fnc))) {
          if (args[1]) {
            var params = args[1].split(/\s*,\s*/);
            var body = _getFunctionBody(fnc, args.index + args[0].length) + '}';
            var _fnc = "function (" + params.toString() + "){" + body;
            fnc = fnc.replace(args[0] + body, '["' + params.join('","') + '",' + _fnc + ']');
          }
        }
        fnc = fnc.toString();
        args = /function\s*?([a-zA-Z_\-$]*)?\s*?\(([^)]+|)\)/.exec(fnc);
        name = (args && args[1]) || name.replace(/.+\/|\.js$/g, '');
        if (args && args[2]) {
          args = args[2].split(/\s*,\s*/);
        } else {
          args = null;
        }
        if (args && args.length > 0) {
          fnc = '["' + args.join('","') + '", ' + fnc.replace(/^[\s;]+|[\s;]+$/g, '') + ']';
        }
        return '.' + type + '("' + name + '", ' + fnc + ')';
      }
      var controllers = readRecursive(config.paths.scripts.controllers);
      if (controllers.length > 0) {
        js += 'angular.module("app.controllers")';
        for (var i in controllers) {
          js += generateMod("controller", controllers[i], fs.readFileSync(controllers[i]));
        }
        js += ";";
      }
      var directives = readRecursive(config.paths.scripts.directives);
      if (directives.length > 0) {
        js += 'angular.module("app.directives")';
        for (var i in directives) {
          js += generateMod("directive", directives[i], fs.readFileSync(directives[i]));
        }
        js += ";";
      }
      var services = readRecursive(config.paths.scripts.services);
      if (services.length > 0) {
        js += 'angular.module("app.services")';
        for (var i in services) {
          js += generateMod("service", services[i], fs.readFileSync(services[i]));
        }
        js += ";";
      }
      var filters = readRecursive(config.paths.scripts.filters);
      if (filters.length > 0) {
        js += 'angular.module("app.filters")';
        for (var i in filters) {
          js += generateMod("filter", filters[i], fs.readFileSync(filters[i]));
        }
        js += ";";
      }
      var args = '';
      for (var i in config.scriptsConfig) {
        if ('string' === typeof config.scriptsConfig[i]) {
          args += '"' + config.scriptsConfig[i] + '",';
        } else {
          args += String(config.scriptsConfig[i]) + ',';
        }
      }
      return js + '}(angular, ' + args.replace(/,$/, '') + '))';
    }))
    .pipe(gulpif(process.env.NODE_ENV==='production',uglify()))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

function _getFunctionBody (fnc, index) {
  var counter = 0, i = index;
  var body = '';
  var enough = false;
  setTimeout(function () {
    enough = true;
  }, 1000);
  while (!enough && i < 100000) {
    if (fnc[i] === '{') {
      counter++;
    }
    if (fnc[i] === '}') {
      if (counter === 0) {
        break;
      } else {
        counter--;
      }
    }
    body += fnc[i];
    i++;
  }
  if (counter > 0) {
    console.error("You have unclosed brackets somewhere near " + fnc.substr(index, 10) + "...");
  }
  return body;
}
