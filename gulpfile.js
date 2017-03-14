// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var $ = require('gulp-load-plugins')();

var pluginName = 'datetime-moment';

var names = {
  normal: pluginName + '.js',
  minified: pluginName + '.min.js'
}

var paths = {
  'script': 'src/',
  'dest': 'dest/'
}

// Lint Task
gulp.task('lint', function() {
  log("Jshint script files...");
  return gulp.src(paths.script + '*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  log("Building script files...");
  return gulp.src(paths.script + '*.js')
    .pipe($.concat(names.normal))
    .pipe(gulp.dest(paths.dest))
    .pipe($.rename(names.minified))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dest));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.script + '*.js', ['lint', 'scripts']);
  log("Watching files...");
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);

gulp.task('build', ['lint', 'scripts']);

// Error handler
function handleError(err) {
  log(err.toString());
  this.emit('end');
}

function log(msg) {
  $.util.log($.util.colors.blue(msg));
}