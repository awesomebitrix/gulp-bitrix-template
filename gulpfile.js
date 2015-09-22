var gulp = require("gulp"),
    jade = require('gulp-jade-php'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload');

    var default_path = {
      src: './',
      dst: '../1c-lp/',
    }

    var path = {
      src : {
        scss: default_path.src+'scss/**/*',
        js: default_path.src+'js/**/*',
        components: default_path.src+'components/**/*',
        template: default_path.src+'components/**/template.jade'
      },

      dst : {
        scss: default_path.dst+'css/',
        js: default_path.dst+'js/',
        components: default_path.dst+'components/',
        template: default_path.src+'components/'
      }


    }

gulp.task('default',['index-php', 'scss', 'js', 'components', 'template', 'watch']);

gulp.task('index-php', function() {
  gulp.src('./jade/*.jade')
    .pipe(jade({ pretty: true } ))
    .pipe(gulp.dest(default_path.dst))
    .pipe(livereload())
});

gulp.task('scss', function () {
  return gulp.src(path.src.scss)
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest(path.dst.scss))
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
  livereload.listen();
  gulp.watch(path.src.scss, ['scss']);
  gulp.watch(path.src.js, ['js']);
  gulp.watch(path.src.components, ['components']);
  gulp.watch(path.src.template, ['template']);
  gulp.watch('./jade/*.jade', ['index-php']);
});
