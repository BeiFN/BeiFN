// 容易变动的数据,这里的dist是转存的路径;
module.exports = {
    paths : {
            styles : {
                  src  : "./src/styles/index/*.css",
                  dist : "./dist/styles/index/"
            },
            scripts : {
                  src  : "./src/scripts/index/*.js",
                  dist : "./dist/scripts/index/"
            },
            html    : {
                src : "./src/*.html",
                dist: "./dist/"
          }
    },
    proxyList : {
          "/baidu" : {
                target : "https://www.baidu.com",
                changeOrigin : true ,
                pathRewrite : {
                      "^/baidu" : ""
                }
          }
    }
}