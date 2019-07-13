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
    webpack = require('webpack'),
    imagemin = require('gulp-imagemin'),
    fse = require('fs-extra'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify');

//===============================
/* build task!! */
function deleteDistFolder(cb) {
  fse.emptydir('./docs', err => {
    if (err) return console.error(err)
    console.log('success!')
  });
  cb();
}

function copyGeneralFiles() {
  var pathstoCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]
  return src(pathstoCopy)
  .pipe(dest('./docs'));
}

function optimizeImages() {
  return src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    multipass: true
  }))
  .pipe(dest('./docs/assets/images'));
}

function optimizeHTML() {
  return src('./app/index.html')
  .pipe(usemin({
    css: [function() {return rev()}, function() {return cleancss()}],
    js: [function() {return rev()}, function() {return uglify()}]
  }))
  .pipe(dest('./docs'));
}

//===============================
/* preview dist */
function previewDist() {
  browserSync.init({
    server: {
      baseDir: "docs"
    }
  });
}

//===============================
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

//===============================
/* file watching */
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

//===============================
/* default task */
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

//===============================
/* exported tasks*/
exports.default = defaultTask;
exports.icons = series(createSprite, copySpriteSVG, copySpriteCSS);
exports.build = series(deleteDistFolder, optimizeImages, css, scripts, optimizeHTML, copyGeneralFiles);
exports.predist = previewDist;
