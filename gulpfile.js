'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var minify = require('gulp-csso');
var server = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');

var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');

var imagemin = require('gulp-imagemin');
 
gulp.task('style', function () {
	return gulp.src('source/sass/main.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(postcss([
		autoprefixer()
		]))

	.pipe(gulp.dest('source/css'))
	.pipe(minify())
	.pipe(rename('main.min.css'))
	.pipe(gulp.dest('source/css'))
	.pipe(server.stream());
});

gulp.task('copy', function() {
	return gulp.src([
		"source/fonts/**/*.{woff,woff2}",
		"source/img/**",
		"source/js/**",
		"source/css/**/*.css",
		"source/*.html"
		], {
			base: "source"
		})
	.pipe(gulp.dest("build/"));
})



gulp.task('serve', gulp.series('style', function() {
	server.init({
		server: 'source/'
	});

	gulp.watch('source/sass/**/*.{scss, sass}', gulp.series('style'))
	gulp.watch('source/*.html')
		.on('change', server.reload);
}));

gulp.task('sass', function () {
  return gulp.src('./source/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./source/css'))
    .pipe(server.stream());
});

gulp.task('watch', function () {
  gulp.watch('source/sass/**/*.{scss, sass}', gulp.series(['sass', 'autopre']));
});


gulp.task('sprite', function () { 
	return gulp.src('source/img/**/*.svg')
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest('source/img'))
});

gulp.task('html', function () { 
	return gulp.src('source/*.html')
		.pipe(posthtml([
			include()
		]))
		.pipe(gulp.dest('source'))
});

gulp.task('images', function() {
	return gulp.src('source/img/**/*.{png,jpg,svg}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.mozjpeg({progressive: true}),
			imagemin.svgo()
			]))
		.pipe(gulp.dest('build/img'))

});

