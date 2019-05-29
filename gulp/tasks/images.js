const imagemin = require(`gulp-imagemin`);
const imageminJpegRecompress = require(`imagemin-jpeg-recompress`);
const gulpif = require(`gulp-if`);

let imgPath = {
  input: `./assets/static/images/**/*.{png,jpg,gif}`,
  ouput: `./build/images`
};

module.exports = function () {
  $.gulp.task(`img`, () => {
    return $.gulp
      .src(imgPath.input)
      .pipe(
          gulpif(
              $.production,
              imagemin(
                  [
                    imagemin.gifsicle({
                      interlaced: true
                    }),
                    imagemin.jpegtran({
                      progressive: true
                    }),
                    imageminJpegRecompress({
                      loops: 5,
                      min: 65,
                      max: 70,
                      quality: `medium`
                    }),
                    imagemin.optipng({
                      optimizationLevel: 5
                    })
                  ],
                  {
                    verbose: true
                  }
              )
          )
      )
      .pipe($.gulp.dest(imgPath.ouput));
  });
};
