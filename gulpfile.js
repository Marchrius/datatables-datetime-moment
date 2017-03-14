// Include gulp
var gulp = require('gulp');
var pkg = require('./package.json');

// Include Our Plugins
var $ = require('gulp-load-plugins')();

var fileName = 'datetime-moment';

var headerTemplate = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>> (<%= pkg.author.url %>)',
  ' * @link <%= pkg.author.url %>',
  ' * @maintainers',
  ' * <%for(var i in pkg.maintainers){%> <%=pkg.maintainers[i].name%> <<%-pkg.maintainers[i].email%>> (<%-pkg.maintainers[i].url%>)<%}%>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

var names = {
  normal: fileName + '.js',
  minified: fileName + '.min.js'
}

var paths = {
  'src': 'js/src',
  'dest': 'js/dist'
}

// Lint Task
gulp.task('lint', function() {
  log("Jshint script files...");
  return gulp.src(paths.src + '/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  log("Building script files...");
  return gulp.src(paths.src + '/*.js')
    .pipe($.concat(names.normal))
    .pipe(gulp.dest(paths.dest))
    .pipe($.rename(names.minified))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dest));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.src + '/*.js', ['lint', 'scripts']);
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