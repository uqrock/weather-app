const plumber = require(`gulp-plumber`);
const sass = require(`gulp-sass`);
const sourcemaps = require(`gulp-sourcemaps`);
const autoprefixer = require(`gulp-autoprefixer`);
const mincss = require(`gulp-clean-css`);
const rename = require(`gulp-rename`);
const gulpif = require(`gulp-if`);

module.exports = function () {
  $.gulp.task(`styles`, function () {
    return $.gulp
      .src(`./assets/static/styles/style.scss`)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(
          gulpif(
              $.production,
              autoprefixer({
                browsers: [`last 3 versions`],
                cascade: false
              })
          )
      )
      .pipe(sourcemaps.write())
      .pipe(
          gulpif(
              $.production,
              mincss({
                compatibility: `ie8`,
                level: {
                  1: {
                    specialComments: 0,
                    removeEmpty: true,
                    removeWhitespace: true
                  },
                  2: {
                    mergeMedia: true,
                    removeEmpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: false
                  }
                }
              })
          )
      )
      .pipe(rename(`style.min.css`))
      .pipe($.gulp.dest(`build/css/`))
      .pipe($.browserSync.reload({stream: true}));
  });
};
