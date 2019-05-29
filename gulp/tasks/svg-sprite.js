const cheerio = require(`gulp-cheerio`);
const svgSprite = require(`gulp-svg-sprite`);
const svgmin = require(`gulp-svgmin`);
const replace = require(`gulp-replace`);
const gulpif = require(`gulp-if`);

const svgPath = {
  input: `./assets/static/images/icons/*.svg`,
  output: `./build/images/sprite`
};

module.exports = function () {
  $.gulp.task(`svg-sprite`, function () {
    return $.gulp
      .src(svgPath.input)
      .pipe(
          gulpif(
              $.production,
              svgmin({
                js2svg: {
                  pretty: true
                }
              })
          )
      )
      .pipe(
          cheerio({
            run($) {
              $(`[fill]`).removeAttr(`fill`);
              $(`[stroke]`).removeAttr(`stroke`);
              $(`[style]`).removeAttr(`style`);
            },
            parserOptions: {
              xmlMode: true
            }
          })
      )
      .pipe(replace(`&gt;`, `>`))
      .pipe(
          svgSprite({
            mode: {
              symbol: {
                sprite: `sprite.svg`
              }
            }
          })
      )
      .pipe($.gulp.dest(svgPath.output));
  });
};
