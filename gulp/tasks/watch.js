module.exports = function () {
  $.gulp.task(`watch`, function () {
    $.gulp.watch(`./assets/html/**/*.html`, $.gulp.series(`html`));
    $.gulp.watch(`./assets/static/fonts/**/*`, $.gulp.series(`fonts`));
    $.gulp.watch(`./assets/static/styles/**/*.scss`, $.gulp.series(`styles`));
    $.gulp.watch(`./assets/static/js/**/*.js`, $.gulp.series(`js`));
    $.gulp.watch(`./assets/static/images/**/*`, $.gulp.series(`img`));
  });
};
