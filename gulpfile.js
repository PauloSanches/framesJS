'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  path = require('path'),
  runSequence = require('run-sequence'),
  config = require(path.resolve(process.cwd(), 'config.js')),
  pkg = require(path.resolve(process.cwd(), 'package.json'));

gulp.task('init',['clean']);
gulp.task('travis', ['build']);

gulp.task('default', function(){
  gulp.watch(config.scripts, function(){
    runSequence('lint','concat');
  });
});

gulp.task('build', function() {
  runSequence('lint','concat','rename','minify');
});

gulp.task('lint', function() {
  return gulp.src(config.dist + config.output)
    .pipe(plugins.plumber())
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('concat', function() {
  return gulp.src(config.scripts)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(config.output))
    .pipe(gulp.dest(config.dist));
});

gulp.task('minify', function() {
  return gulp.src(config.dist + config.outputMin)
    .pipe(plugins.plumber())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(config.dist));
});

gulp.task('rename', function() {
  return gulp.src(config.dist + config.output)
    .pipe(plugins.plumber())
    .pipe(plugins.rename(config.dist + config.outputMin))
    .pipe(gulp.dest(''));
});

gulp.task('clean', function() {
  gulp.src(['.git','LICENSE', 'README.md'])
    .pipe(plugins.plumber())
    .pipe(plugins.clean());
});
