let gulp   = require("gulp");
let {paths , proxyList} = require("./gulp.config");
let connect = require("gulp-connect");
let proxy   = require("http-proxy-middleware");
let sass    = require("gulp-sass");
sass.compiler = require("node-sass");

function devStyles(){
    return gulp.src(psths.styles.src)
    .pipe(sass().on('errro',sass.logError))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(connect.reload());
}
function devScripts(){
    return gulp.src(psths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(connect.reload());
}
function devHtml(){
    return gulp.src(psths.html.src)
    .pipe(gulp.dest(paths.html.dist))
    .pipe(connect.reload());
}


function useconnect(){
    connect.server({
      root : "./dist",
      port : 8888,
      livereload : true,
      middleware : function(connect,opt){
          let arr = [];
          for(let attr in proxyList){
              arr.push(proxy(attr ,proxyList[attr]))
          }
          return arr;
      }
    });
}
function watch(){
  gulp.watch(paths.styles.src,devStyles)
  gulp.watch(paths.scripts.src,devScripts)
  gulp.watch(paths.html.src,devHtml)
}

let dev = gulp.series(gulp.parallel(useconnect , watch));

module.exports = dev;