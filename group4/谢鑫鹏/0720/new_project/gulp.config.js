// 配置文件
module.exports = {
  paths : {
    styles : {
      src  : "./src/styles/**/*.scss",
      dist : "./dist/styles/"
    },
    scripts : {
      src  : "./src/scripts/*.js",
      dist : "./dist/scripts/"
    },
    html : {
      src : "./src/*.html",
      dist : "./dist/"
    }
  },
  // proxyList : {
  //   "/baidu" : {
  //     target : 'http://www.baidu.com',
  //     changeOrigin : true,
  //     pathRewrite : {
  //       "^/baidu" : ""
  //     }
  //   },
  //   "/zc" : {
  //     target : 'https://www.zcool.com.cn/recommend/contentRecommend?pageSize=5&contentId=9375153_3&day=2019-07-20',
  //     changeOrigin : true,
  //     pathRewrite : {
  //       "^/zc" : ""
  //     }
  //   }
  // }
}