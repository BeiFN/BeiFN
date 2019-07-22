let gulp = require("gulp");
let cleanCSS = require("gulp-clean-css");
let rename = require("gulp-rename");
let concat = require("gulp-concat");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let {
    paths
} = require("./gulp.config");

function bulidConfig() {
    function styles() {
        return gulp.src(paths.styles.src)
            // .pipe(concat("zwy.css"))
            .pipe(cleanCSS())
            // .pipe(rename({
            //     basename: 'main',
            //     suffix: '.min'
            // }))
            .pipe(gulp.dest(paths.styles.dest));
    }

    function scripts() {
        return gulp.src(paths.scripts.src)
            .pipe(babel({
                "presets": ["@babel/env"]
            }))
            .pipe(uglify())
            .pipe(concat('main.js'))
            .pipe(gulp.dest(paths.scripts.dest));
    }

    function html() {
        return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dest));
    }

    let build = gulp.series(styles, scripts, html);
    return build;
}
exports.default = bulidConfig();