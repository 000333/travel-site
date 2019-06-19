// NEED TO MAKE THESE CONSTANTS IN ORDER TO USE THESE GULP METHODS!!!
const { watch, src, dest, pipe, series, parallel } = require('gulp');
var browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import')
    mixins = require('postcss-mixins'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename');
    /*del = require('del');*/

/* sprite code */
var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: true
      }
    }
  }
};

/*  There are apparently some permissions issues with using del, so don't use it in this environment
function cleanSVG(cb) {
  return del('./app/temp/sprite', './app/assets/images/sprites');
  console.log("It's done!");
  cb();
}*/

function createSprite() {
  return src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('./app/temp/sprite/'));
}

function copySpriteSVG() {
  return src('./app/temp/sprite/css/**/*.svg')
    .pipe(dest('./app/assets/images/sprites/'));
}

function copySpriteCSS() {
  return src ('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(dest('./app/assets/styles/modules'));
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

/* public tasks for exporting */
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

function test(cb) {
  console.log("Gulp is working!");
  cb();
}

exports.test = test;

exports.default = defaultTask;
exports.icons = series(createSprite, copySpriteSVG, copySpriteCSS);
