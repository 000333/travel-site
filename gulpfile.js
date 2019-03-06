// NEED TO MAKE THESE CONSTANTS IN ORDER TO USE THESE GULP METHODS!!!
const { watch, src, dest, pipe, series, parallel } = require('gulp');
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested');

function defaultTask(cb) {
  console.log("Hooray - you created a gulp task!")
  cb();
}

function html(cb) {
  console.log("Imagine something useful being done to your HTML here");
  cb();
}

//src() method: gets a glob to read from the filesystem and PRODUCES A NODE STREAM, locates matching files and reads them into memory to pass through the STREAM
//use return src() to signal async completion (no longer need callback function)
// .pipe() method chains TRANSFORM and WRITABLE streams -> you can chain METHODS to transform/write files from src() -> you can chain more src() files with different globs:

/*             first glob       transform        second glob      transform          output loc
ex. return src('src/*.js').pipe(uglify()).pipe(src('a/*.js')).pipe(rename()).pipe(dest('output/'));
*/

//dest() method: specify output directory, ALSO PRODUCES A NODE STREAM which is generally used as a terminator stream. When dest() receives a file through .pipe(), it writes the contents of that file(s) and other details into a file at the given directory.
function css() {
  /* basic syntax:  return src(glob).pipe(dest(glob));*/
  return src('./app/assets/styles/styles.css')
    .pipe(postcss([ cssvars(), nested(), autoprefixer() ]))
    .pipe(dest('./app/temp/styles'));
}

//don't need the gulp-watch puglin, user built-in watch()
//end watching with ctrl-c in command line
//these watch methods start automatically when you call gulp in cmd
watch('./app/index.html', html)
watch('./app/assets/styles/**/*.css', css)

exports.default = defaultTask;
exports.html = html;
