module.exports = {
     paths : {
        styles : {
            src  : "./src/styles/*.css",
            dist : "./dist/styles/"
        },
        scripts : {
            src  : "./src/javascripts/*.js",
            dist : "./dist/javascripts/"
        },
        html    : {
            src  : "./src/*.html",
            dist : "./dist/"
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