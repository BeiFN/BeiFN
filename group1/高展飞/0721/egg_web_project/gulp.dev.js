let   gulp   = require("gulp");
let {paths ,proxyList}  = require("./gulp.config");
let connect  = require("gulp-connect");
let proxy = require("http-proxy-middleware");

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
function useconnect(){
    return connect.server({
        root : "./src",
        port : 8888,
        livereload : true,
        middleware : function(connect,opt){
            // let arr = [];
            // for(var attr in proxyList){
            //     arr.push(proxy(attr ,proxyList[attr]));
            // }
            // return arr;
            return[
                proxy("/baidu" , {
                    target :   "https://www.baidu.com",
                    changeOrigin : true,
                    pathRewrite :{
                        "^/baidu" : ""
                    }
                }),
                proxy(
                    "/zc" , {
                        target :"https://www.zcool.com.cn/recommend/contentRecommend?pageSize=5&contentId=249761_8&day=2018-12-04",
                        changeOrigin : true,
                        pathRewrite :{
                            "^/zc" : ""
                        }
                    }
                ) 
            ]
        }
       
    });
}
function  watch (){
    gulp.watch(paths.styles.src,devStyles)
    gulp.watch(paths.scripts.src,devScripts)
    gulp.watch(paths.html.src,devHtml)
}
let dev = gulp.series(gulp.parallel(useconnect , watch));
module.exports= dev ;