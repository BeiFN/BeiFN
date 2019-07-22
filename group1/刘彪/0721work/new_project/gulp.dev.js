//开发环境的搭建
let gulp = require("gulp");
let {paths, proxyList} = require("./gulp.config");
let connect = require("gulp-connect");
let Proxy = require("http-proxy-middleware");

// function devConfig(){
    function devStyles(){
        return gulp.src(paths.styles.src)
                .pipe(gulp.dest(paths.styles.dist))
                .pipe(connect.reload());
    }
    
    function devScripts(){
        return gulp.src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(connect.reload());
    }
    
    
    function devHtml(){
        return gulp.src(paths.html.src)
                .pipe(gulp.dest(paths.html.dist))
                .pipe(connect.reload());
    }
    
    
    
    
    //开启服务器;和配置服务器;
    function myConnect() {
        return connect.server({
            root: "./src",
            port: 8888,
            livereload: true,
            middleware : function (connect , opt) {
             let arr = [];
             for(let attr in proxyList){
                 arr.push(Proxy(attr,proxyList[attr]))
             }
                return arr;
            }
        });
    }
    
    
    //监听
    function watch() {
        gulp.watch(paths.styles.src, devStyles);
        gulp.watch(paths.scripts.src,devScripts);
        gulp.watch(paths.html.src,devHtml);
    }
    
    let dev = gulp.series(gulp.parallel(myConnect,watch));

    // return dev;
// }

// module.exports = devConfig;

module.exports = dev;