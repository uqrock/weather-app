module.exports = function () {
  $.gulp.task(`fonts`, () => {
    return $.gulp
      .src(`./assets/static/fonts/**/*.*`)
      .pipe($.gulp.dest(`./build/fonts/`));
  });
};
