// NEED TO MAKE THESE CONSTANTS IN ORDER TO USE THESE GULP METHODS!!!
const { watch, src, dest, pipe, series, parallel } = require('gulp');
var browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import')
    mixins = require('postcss-mixins'),
    svgSprite = require('gulp-svg-sprite');

/* sprite code */
var config = {
  mode: {
    css: {
      render: {
        css: true
      }
    }
  }
};

function createSprite() {
  return src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('./app/temp/sprite/'));
}

/* private tasks for file watching */
// see /gulp/tasks/ for notes
function css() {
  /* basic syntax:  return src(glob).pipe(dest(glob));*/
  return src('./app/assets/styles/styles.css')
    .pipe(postcss([ cssImport(), mixins(), cssvars(), nested(), autoprefixer() ]))
    .pipe(dest('./app/temp/styles'));
}
function cssInject() {
  return src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}
function html(cb) {
  browserSync.reload();
  cb();
}

/* public tasks */
function defaultTask() {
  //watch my files plz
  browserSync.init({
    server: {
      baseDir: "app"
    }
  })
  watch('./app/index.html', html)
  watch('./app/assets/styles/**/*.css', series(css, cssInject))
}

exports.default = defaultTask;
exports.createSprite = createSprite;
