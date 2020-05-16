const gulp = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// configure the paths
const watch_dir = './scss/**/*.scss';
const src_dir = './scss/*.scss';
const dest_dir = './css';

const paths = {
    source: src_dir
};

function watch() {
  return gulp.watch(watch_dir, build);
}

function build() {
  return gulp.src(paths.source)
      .pipe(sourcemaps.init())
      .pipe(sass({
            outputStyle: 'compact',
            precision: 10
          }).on('error', sass.logError)
      )
      .pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest(dest_dir))
      .pipe(csscomb())
      .pipe(cleancss())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(dest_dir));
}

exports.watch = watch;
exports.build = build;
exports.default = build;
