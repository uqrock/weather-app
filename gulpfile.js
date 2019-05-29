const yargs = require(`yargs`);
const argv = yargs.argv;

global.$ = {
  gulp: require(`gulp`),
  browserSync: require(`browser-sync`).create(),
  path: {
    tasks: require(`./gulp/path/path.js`)
  },
  production: argv.production
};

$.path.tasks.forEach((taskPath) => {
  require(taskPath)();
});

$.gulp.task(
    `default`,
    $.gulp.series(
        `del`,
        $.gulp.parallel(
            `fonts`,
            `html`,
            `img`,
            `svg-sprite`,
            `styles`,
            `js`
        ),
        $.gulp.parallel(`watch`, `serve`)
    )
);
