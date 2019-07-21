

let gulp = require("gulp");
let cleanCSS = require("gulp-clean-css");
let {paths,proxys} = require("./paths");

let babel = require("gulp-babel");
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");

let connect = require("gulp-connect");
let dev = require("./gulpdev");



function styles(){
    return gulp.src(paths.styles.src)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.daweige))

}

function scripts(){
    return gulp.src(paths.scripts.src)
    .pipe(concat(".min.js"))
    .pipe(babel({
        presets : ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.daweige))
}

function html(){
    return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.daweige))
    .pipe(connect.reload())
}

let build = gulp.series(html,styles,scripts);

exports.default = build;
exports.dev = dev;