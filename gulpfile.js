
// Required plugins
var gulp = require('gulp')
  , clean = require('gulp-clean')
  , notify = require('gulp-notify')
  , scss = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , imagemin = require('gulp-imagemin')
  , cache = require('gulp-cache');

// Config
var paths = {
		scss:   'src/scss/app.scss',
		js:     'src/js/app.js',
		images: 'src/images/**/*',
		libs:   'src/libs/**/*'
	}
  , dests = {
		css:    'public/css',
		js:     'public/js',
		images: 'public/images'
	}
  , options = {
		autoprefixer: 'last 10 version',
		imagemin: {
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		},
		scss: {
			outputStyle: 'compressed'
		},
		uglify: {
			mangle: false
		},
		clean: {
			read: false
		}
	};

// Clean
gulp.task('clean', function () {
	return gulp.src([
			dests.css,
			dests.js,
			dests.images
		], options.clean)
		.pipe( clean() )
		.pipe( notify({ message: 'Clean task complete.' }) );
})

// CSS
gulp.task('css', function () {
	return gulp.src([ paths.libs + '.css', paths.scss ])
		.pipe( concat('app.css') )
		.pipe( scss(options.scss).on('error', scss.logError ) )
		.pipe( autoprefixer(options.autoprefixer) )
		.pipe( gulp.dest(dests.css) )
		.pipe( notify({ message: 'CSS task complete.' }));
});

// JS
gulp.task('js', function () {
	return gulp.src([ paths.libs + '.js', paths.js ])
		.pipe( concat('app.js') )
		.pipe( uglify(options.uglify) )
		.pipe( gulp.dest(dests.js) )
		.pipe( notify({ message: 'JavaScript task complete.' }));
});

// Images
gulp.task('images', function () {
	return gulp.src(paths.images)
		.pipe( cache( imagemin(options.imagemin) ) )
		.pipe( gulp.dest(dests.images) )
		.pipe( notify({ message: 'Images task complete.' }));
});

// Watch
gulp.task('watch', function () {
	gulp.watch(paths.scss, ['css']);
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.images, ['images']);
});

// Global
gulp.task('default', ['clean'], function () {
	gulp.start('css', 'js', 'images', 'watch');
});