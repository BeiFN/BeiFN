;+function(){
    //传入两个参数分别为：带有<%%>和<%=%>的字符串  和   数据
    function myTemplate( str , data){
          // 非贪婪匹配 除了等号之外的 <%  %>中的字符串
          var regJS = /<%[^=](.*?)%>/g;
          // 非贪婪匹配 <%= %>中的字符串
          var regVar = /<%=(.*?)%>/g;
          str = str.replace(/\//g,"\/");
          var res = str.replace( regJS , `\`); $1 print(\``)
              res = res.replace(regVar,`\`);  print($1); \n print(\``);
              res = `print(\`${res}\`)`;
          var html = "";
          function print(str){
                html += str;
          }
          eval(res);
          return html;
    }
    window.myTemplate = myTemplate;
}()