var gulp = require("gulp"),
    jade = require('gulp-jade-php'),
    sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload');
    var default_path = {
      src: './',
      dst: '../1c-lp/',
    }
    var path = {
      src : {
        scss: default_path.src+'scss/**/*',
        js: default_path.src+'js/**/*',
		img: default_path.src+'img/**/*',
		fonts:default_path.src+'fonts/**/*',
        components: default_path.src+'components/**/*',
        template: default_path.src+'components/**/template.jade'
      },
      dst : {
        scss: default_path.dst+'css/',
        js: default_path.dst+'js/',
		img:default_path.dst+'img/',
		fonts: default_path.dst+'fonts/',
        components: default_path.dst+'components/',
        template: default_path.src+'components/'
      }
    }
gulp.task('default',['index-php', 'scss', 'js','img','fonts', 'components', 'template', 'watch']);

gulp.task('index-php', function() {
  gulp.src('./jade/*.jade')
    .pipe(jade({ pretty: true } ).on('error', console.log))
    .pipe(gulp.dest(default_path.dst))
    .pipe(livereload())
});
gulp.task('scss',function() {
	gulp.src(path.src.scss)
		// .pipe(sass({
		// 	//	style: 'compressed',
		// 		errLogToConsole: false,
		// 		onError: function(err) {
		// 			return notify().write(err);
		// 		}
		// 	}))
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({errLogToConsole: true}))
		.pipe(gulp.dest(path.dst.scss))
		.pipe(livereload())
});
gulp.task('img',function() {
	gulp.src(path.src.img)
		.pipe(imagemin())
		.pipe(gulp.dest(path.dst.img))
		.pipe(livereload())
});
gulp.task('fonts',function(){
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.dst.fonts))
		.pipe(livereload())
});
gulp.task('js', function () {
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.dst.js))
    .pipe(livereload())
});

gulp.task('components', function () {
  return gulp.src(path.src.components)
    .pipe(gulp.dest(path.dst.components))
    .pipe(livereload())
});

gulp.task('template', function () {
  return gulp.src(path.src.template)
    .pipe(jade({ pretty: true } ))
    .pipe(gulp.dest(path.dst.template))
    .pipe(livereload())
});

gulp.task('watch', function() {
	livereload.listen()
	gulp.watch(path.src.scss, ['scss']);
	gulp.watch(path.src.js, ['js']);
	gulp.watch(path.src.components, ['components']);
	gulp.watch(path.src.template, ['template']);
	gulp.watch(path.src.img,['img']);
	gulp.watch(path.src.fonts,['fonts']);
	gulp.watch('./jade/*.jade', ['index-php']);
});
