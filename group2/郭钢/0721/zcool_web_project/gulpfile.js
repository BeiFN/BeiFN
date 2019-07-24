// function Foo(){
//   return  console.log("haha");
// }

// exports.foo = Foo;

let gulp = require("gulp");
let cleanCss = require("gulp-clean-css")
let rename = require("gulp-rename")
let concat = require("gulp-concat")
let babel = require("gulp-babel")
let uglify = require("gulp-uglify")
let devConfig = require("./gulp.dev")



let {
    paths
} = require("./gulp.config")

let type = process.argv[2] ? process.argv[2]:"dev";



// let paths = {
//     styles: {
//         src: "./src/styles/idnex/*.css",
//         dist: "./dist/styles/"
//     },
//     scripts: {
//         src: "./src/javascripts/index/*.js",
//         dist: "./dist/scripts/"
//     },
//     html: {
//         src: "./src/*.html",
//         dist: "./dist"
//     }
// }


function buildConfig() {
    function styles() {
        return gulp.src(paths.styles.src)
            // .pipe(concat("index.css")) 
            // .pipe(rename({
            //     suffix: ".min"
            // }))
            // .pipe(cleanCss())
            .pipe(gulp.dest(paths.styles.dist))
    }

    function scripts() {
        return gulp.src(paths.scripts.src)
            .pipe(concat("index.js"))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest(paths.scripts.dist))
    }

    function html() {
        return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dist))
    }



    let build = gulp.series(styles, scripts, html);
    return build
}
exports.default = buildConfig();