;+function(){
      function myTemplate( str){
            var regJS = /<%[^=](.*?)%>/g;
            var regVar = /<%=(.*?)%>/g;
            str = str.replace(/\//g,"\/");
            var res = str.replace( regJS , `\`); $1 print(\``)
                res = res.replace(regVar,`\`);  print($1); \n print(\``);
                console.log(res);
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

// ;+function(){
//       function myTemplate( str ){
//             var regJS = /<%[^=](.*?)%>/g;
//             var regVar = /<%=(.*?)%>/g;
//             str = str.replace(/\//g,"\/");
//             var res = str.replace( regJS, `\`); $1 print(\``);
//                 res = res.replace( regVar, `\`); print($1); \n print(\``);
//                 res = `print(\`${res}\`)`;
//             var html = "";
//             function print(str){
//                   html += str ;
//             }
//             eval(res);
//             return html;
//       }
//       window.myTemplate = myTemplate;
// }()

// ;+function(){
//       function myTemplate( str ){
//             var regJS = /<%[^=](.*?)%>/g;
//             var regVar = /<%=(.*?)%>/g;
//             str = str.replace(/\//g,"\/");
//             var res = str.replace(regJS,`\`); $1 print(\``);
//                 res = res.replace(regVar,`\`); $1 print(\``);
//                 res = `print(\`${res}\`)`;
//             var html = "";
//             function print(str){
//                   html += str;
//             }
//             eval(res);
//             return html;
//       }
//       window.myTemplate = myTemplate;
// }()

// ;+function(){
//       function myTemplate(str){
//             var regJS = /<%[^=](.*?)%>/g;
//             var regVar = /<%=(.*?)%>/g;
//             str = str.replace(/\//g,"\/");
//             var res = str.replace(regJS , `\`); $1 print(\``);
//                 res = res.replace(regVar , `\`); $1 print(\``);
//                 res = `print(\`${res}\`)`;
//             var html = "";
//             function print(str){
//                   html += str ;
//             }
//             eval(res);
//             return html;
//       }
//       window.myTemplate = myTemplate;
// }()