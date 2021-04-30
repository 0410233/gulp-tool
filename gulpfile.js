const { src, dest } = require('gulp');
const autoprefix = require('autoprefixer');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function css() {
  return src('src/css/*.css')
    // The gulp-uglify plugin won't update the filename
    .pipe(postcss([ autoprefix({cascade: false}) ]))
    .pipe(clean({
      format: 'keep-breaks'
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(dest('dist/css/'));
}

function js() {
  // return src("src/js/*.js")
  return src(['src/js/*.js', '!src/js/_*.js'])
  // .pipe(babel())
  .pipe(dest('dist/js/'))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js'}))
  .pipe(dest('dist/js/'));
}

exports.css = css;
exports.js = js;