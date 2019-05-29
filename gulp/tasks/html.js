const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');

module.exports = function () {
  $.gulp.task("html", function () {
    return $.gulp.src("./assets/html/*.html")
      .pipe(plumber())
      .pipe(rigger())
      .pipe(gulpif($.production, htmlmin({
        collapseWhitespace: true
      })))
      .pipe($.gulp.dest("./build/"))
      .on('end', $.browserSync.reload);
  });
};