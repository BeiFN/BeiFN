let gulp = require("gulp");
let {
    paths
} = require("./gulp.config");
let connect = require("gulp-connect");

function devConfig() {
    function devStyles() {
        return gulp.src(paths.styles.src)
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(connect.reload());
    }

    function devScripts() {
        return gulp.src(paths.scripts.src)
            .pipe(gulp.dest(paths.scripts.dest))
            .pipe(connect.reload());
    }

    function devHtml() {
        return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dest))
            .pipe(connect.reload());
    }

    function myConnect() {
        return connect.server({
            root: "./src",
            port: 8888,
            livereload: true
        });
    }

    function watch() {
        gulp.watch(paths.styles.src, devStyles); // 问题：如果想同时监听两个呢？？？答案：如下加多个就行啦。
        gulp.watch(paths.scripts.src, devScripts);
        gulp.watch(paths.html.src, devHtml);
    }

    let dev = gulp.series(gulp.parallel(myConnect, watch));
    return dev;
}

module.exports = devConfig();