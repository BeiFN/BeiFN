;+function(){
      function MyTemplate(str){
            var regJS = /<%[^=](.*?)%>/g;
            var regVar = /<%=(.*?)%>/g
            var res = str.replace(regJS, `\`); $1 print(\``);
                res = res.replace(regVar, `\`); print($1);\n print(\``);
                res = `print(\` ${res}\`)`;
            var html = "";
            function print(str){
                  html += str;
            }
            // eval(res);
            return html;
      }
      window.MyTemplate = MyTemplate;
}()