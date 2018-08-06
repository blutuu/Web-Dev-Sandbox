var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	jshint = require('gulp-jshint'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	sourcemaps = require('gulp-sourcemaps'),
	webserver = require('gulp-webserver');

// Compiling JS
gulp.task('js', function() {
	return gulp.src('builds/js/**/*.js')

		.pipe(plumber({ errorHandler: function(err) {

            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);

        }}))

		.pipe(jshint('./.jshintrc'))
	    .pipe(jshint.reporter('jshint-stylish'));
});

// Compiling Sass
gulp.task('sass', function() {
	return gulp.src('process/sass/style.scss')

		.pipe(plumber({ errorHandler: function(err) {

            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);

        }}))

		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'Expanded'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('builds/css'));
});

// Compiling Jade
gulp.task('jade', function(){
	return gulp.src('process/jade/**/*.jade')

		.pipe(plumber({ errorHandler: function(err) {

            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);

        }}))

		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest('builds/'));
});

// Watching files for changes
gulp.task('watch', function() {
	gulp.watch('builds/js/**/*', ['js']);
	gulp.watch(['process/sass/**/*.scss'], ['sass']);
	gulp.watch(['process/jade/**/*.jade'], ['jade']);
});

// Starting the live server
gulp.task('webserver', function() {
    gulp.src('builds/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['sass', 'jade', 'watch', 'webserver']);