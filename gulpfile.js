var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

var gulp = require('gulp');
var gutil = require('gulp-util');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var source = require('vinyl-source-stream');
var notifier = require('node-notifier');

var onError = function(err) {
  var message = '';
  var title = 'Error: ';

  if (err.description) { title += err.description; }
  if (err.message) { title += err.message; }

  if (err.filename) {
    var fileArray = error.filename.split('/');
    message += 'File: ' + fileArray[file.length - 1] + '\n';
  }

  if (error.lineNumber) { message += 'Line: ' + error.lineNumber + '\n' };

  notifier.notify({ title: title, message: message });
};

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
  }));

function bundle() {
  return bundler
  .bundle()
  .on('error', onError)
  .pipe(source('application.js'))
  .pipe(gulp.dest('./'));
}

bundler.on('update', bundle);

gulp.task('build', function() {
  bundle();
  });

gulp.task('serve', function(done) {
  gulp
  .src('')
  .pipe(server({
    livereload: {
      enable: true,
      filter: function(filePath, cb) {
        if(/main.js/.test(filePath)) {
          cb(true);
        }
        if(/style.css/.test(filePath)){
          cb(true);
        }
      }
      },
      open: true
      }));
  });

gulp.task('sass', function () {
  gulp
  .src('./sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./'));
  });

gulp.task('default', ['build', 'serve', 'sass', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  });
