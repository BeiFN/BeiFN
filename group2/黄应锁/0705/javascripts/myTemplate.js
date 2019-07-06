;+function(){
    function myTemplate(str){
        let reg1 = /<%[^=](.*?)%>/g;
        let reg2 = /<%=(.*?)%>/g;
        var res = str.replace(reg1,`\`);$1 print(\``);
            res = res.replace(reg2,`\`);print($1); print(\``);
            res = `print(\`${res}\`)`;
        var html = "";
        function print(str){
            html += str;
        }
        eval(res);
        return html;
    }
    window.myTemplate = myTemplate;
}();
// ;+function(){
//     function myTemplate(str){
//         let reg1 = /<%[^=](.*?)%>/g;
//         let reg2 = /<%=(.*?)%>/g;
//         var res = str.replace(reg1,`\`);$1 print(\``);
//             res = res.replace(reg2,`\`);print($1); print(\``);
//             res = `print(\`${res}\`)`;
//         var html = "";
//         function print(str){
//             html += str;
//         }
//         eval(res);
//         return html;
//     }
//     window.myTemplate = myTemplate;
// }();
// ;+function(){
//     function myTemplate( str , data){
//           var regJS = /<%[^=](.*?)%>/g;
//           var regVar = /<%=(.*?)%>/g;
//           var res = str.replace( regJS , `\`); $1 print(\``)
//               res = res.replace(regVar,`\`);  print($1); \n print(\``);
//               res = `print(\`${res}\`)`;
//           var html = "";
//           function print(str){
//                 html += str;
//           }
//           eval(res);
//           return html;
//     }
//     window.myTemplate = myTemplate;
// }()