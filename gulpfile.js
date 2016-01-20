var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var server = require('gulp-server-livereload');
var jade = require('gulp-jade');

gulp.task('template', function() {
  // Add locals for jade
  var DATA = {};

  gulp.src('./lib/*.jade')
    .pipe(jade({
      locals: DATA
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('styles', function () {
	return gulp.src('lib/**/*.styl')
		.pipe(stylus({
			use: [autoprefixer('iOS >= 7', 'last 1 Chrome version')],
			url: {
				name: 'embedurl',
		 	 	paths: [__dirname + '/img'],
				limit: false
			}
		}))
		.pipe(gulp.dest('./build'))
});


gulp.task('server', function() {
  gulp.src('./build')
    .pipe(server({
      livereload: true
    }));
});

gulp.task('watch', function () {
    gulp.watch(['./lib/**/*.*'], ['default']);
});

gulp.task('dev', function() {
    gulp.start('styles', 'template', 'server', 'watch');
});

gulp.task('default', function() {
    gulp.start('styles', 'template');
});
