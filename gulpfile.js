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
    rename = require('gulp-rename'),
    hexrgba = require('postcss-hexrgba'),
    webpack = require('webpack');

/* sprite code */
var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      sprite: 'sprite.svg',
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

function copySpriteSVG() {
  return src('./app/temp/sprite/css/**/*.{svg,png}')
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
    .pipe(postcss([ cssImport(), mixins(), cssvars(), nested(), hexrgba(), autoprefixer() ]))
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

function scripts(cb) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
  });
  cb();
}
function scriptsRefresh(cb) {
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
  watch('./app/assets/scripts/**/*.js', series(scripts, scriptsRefresh))
}

exports.default = defaultTask;
exports.icons = series(createSprite, copySpriteSVG, copySpriteCSS);
