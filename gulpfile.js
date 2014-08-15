var gulp = require('gulp'),
  fs = require('fs'),
  jshint = require("gulp-jshint"),
  uglify = require("gulp-uglify"),
  watch = require("gulp-watch"),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')),
  src = [
    'src/preloader.js',
    'src/mainLoop.js',
    'src/prefix.js',
    'src/frames.js',
    'src/engine.js',
    'src/sprite.js',
    'src/utils.js',
    'src/suffix.js'
  ];

// Default task
gulp.task('default', function() {
  gulp.watch(src, ['build']);
});

// Concat task
gulp.task('concat', function() {
  gulp.src(src)
    .pipe(concat('./frames.js'))
    .pipe(gulp.dest('./'));
});


// Lint JavaScript
gulp.task('lint', function() {
  gulp.src('./frames.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Build script
gulp.task('build', ['clean','concat','lint'], function() {
  gulp.start('minify');
});

// Minify JavaScript
gulp.task('minify', ['rename'], function() {
  gulp.src('frames.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

// Rename minify file
gulp.task('rename', function() {
  return gulp.src('frames.js')
    .pipe(rename('frames.min.js'))
    .pipe(gulp.dest('./'));
});

// Clean files
gulp.task('clean', function() {
  return gulp.src('frames.min.js', {
      read: false
    })
    .pipe(clean());
});

// Travis CI
gulp.task('test-travis', ['build']);
