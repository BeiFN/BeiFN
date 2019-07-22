let gulp = require("gulp");
let connect = require("gulp-connect");
let proxy = require('http-proxy-middleware');
let {paths, proxyList} = require("./gulp.config");
// console.log(proxyList);

// 开发环境之中只需要将文件转存即可，不需要压缩等操作
function devStyles(){
  return gulp.src(paths.styles.src)
          .pipe(gulp.dest(paths.styles.dist))
          .pipe(connect.reload()); // 实时更新（刷新页面）
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
function useConnect(){
  connect.server({
    root : "./dist",
    port : 8888,
    livereload : true,
    middleware : function(connect, opt){
      // return[ 
      //   proxy("/baidu",{
      //     target: "https://www.baidu.com",
      //     changeOrigin: true,
      //     pathRewrite: {
      //       "^/baidu" : ""
      //     }
      //   }),
      //   proxy("/zc",
      //   {
      //     target : 'https://www.zcool.com.cn/recommend/contentRecommend?pageSize=5&contentId=9375153_3&day=2019-07-20',
      //     changeOrigin : true,
      //     pathRewrite : {
      //       "^/zc" : ""
      //     }
      //     // 防止请求参数中出现zc影响获取数据
      //   })
      // ]
      let arr = [];
      for(let attr in proxyList){
        arr.push(proxy(attr, proxyList[attr]))
      }
      return arr;
    }
  });
}
// 监听
function watch(){
  gulp.watch(paths.styles.src, devStyles);
  gulp.watch(paths.scripts.src, devScripts);
  gulp.watch(paths.html.src, devHtml);
}
let dev = gulp.series(gulp.parallel(useConnect,watch));

module.exports = dev;