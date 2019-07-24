module.exports = {
    paths:
    {
        styles: {
            src: "./src/styles/*.scss",
            dist: "./dist/styles"
        },
        scripts: {
            src: "./src/javascript/*.js",
            dist: "./dist/javascript"
        },
        html: {
            src: "./src/*.html",
            dist: "./dist/"
        }
    },
    proxyList: {

        "/baidu": {

            target: 'https://www.baidu.com',
            changeOrigin: true,
            pathRewrite: {
                "^/baidu": "",
            }


        }
    }
}