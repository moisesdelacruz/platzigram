const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const rename = require('gulp-rename');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');

gulp.task('styl', () => styl());
gulp.task('styl:live', () => styl().pipe(livereload({ start: true })))
gulp.task('styl:watch', ['styl'], () => {
  return gulp.watch(['./index.scss'], ['styl:live'])
})

gulp.task('assets', () => {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public'));
});

function compile(watch) {
  var bundle = watchify(browserify('./src/index.js'))

  function rebundle() {
    bundle
      .transform(babelify)
      .bundle()
      .on('error', (err) => { console.log(err); this.emit('end'); })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'));
  }

  if (watch) {
    bundle.on('update', () => {
      console.log('--> Bundling...');
      rebundle();
    })
  }

  rebundle()
}

function styl () {
  return gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'));
}

gulp.task('build', () => { return compile() });
gulp.task('watch', () => { return compile(true) });

gulp.task('default', ['styles', 'assets', 'build']);
