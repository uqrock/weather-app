const del = require(`del`);

module.exports = function () {
  $.gulp.task(`del`, function () {
    return del(`./build`);
  });
};
