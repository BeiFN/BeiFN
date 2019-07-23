let gulp = require("gulp")
let {
    paths
} = require("./gulp.config")
let connect = require("gulp-connect")

function devConfig() {
    function devStyle() {
        return gulp.src(paths.styles.src)
            .pipe(gulp.dest(paths.styles.dist))
            .pipr(connect.reload())
    }

    function devScript() {
        return gulp.src(paths.scripts.src)
            .pipe(gulp.dest(paths.scripts.dist))
            .pipr(connect.reload())
    }

    function devHtml() {
        return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dist))
            .pipr(connect.reload())
    }

    function useconnect() {
        return connect.server({
            root: "./src",
            port: 8888,
            livereload: true
        });
    }

    function watch() {
        gulp.watch(paths.styles.src, devStyle)
        gulp.watch(paths.scripts.src, devScript)
        gulp.watch(paths.html.src, devHtml)
    }

    let dev = gulp.series(gulp.parallel(useconnect, watch));
    return dev
}
module.exports = dev;