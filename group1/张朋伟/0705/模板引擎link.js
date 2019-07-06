
    ; + function () {
        function my_template(cont, date) {
            //js匹配正则
            var regJS = /<%(.*?)%>/g;
            // html 匹配正则
            var regVal = /<%[^=](.*?)%>/g;
            //html匹配
            var res = cont.replace(regVal, `\`);$1print(\``);
            res = `print(\`${res}\`)`;
            //变量匹配
            res = res.replace(regJS, `  \`);print(data[attr].a);print(\` `)
            console.log(res);

            //拼接字符串
            var html = "";
            // print就是拼接字符串的方法;
            function print(str) {
                // str = str.trim();
                html += str;
            }
            console.log(html);
            console.log(eval(res))
            document.body.innerHTML = html;

            return html;
        }
        window.my_template = my_template;
    }()
    // data = [
    //     {a:5},
    //     {a:4},
    //     {a:3},
    //     {a:2},
    // ]
    // var html = my_template(document.getElementById("template").innerHTML,data);