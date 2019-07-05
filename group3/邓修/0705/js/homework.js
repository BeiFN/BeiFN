//字符串模板引擎
// ; +function () {
//     function myTemplate(str, data) {
//         var reg1 = /<%[^=](.*?)%>/g;//第三个字符不能为" = "
//         var reg2 = /<%=(.*?)%>/g;
//         var res = str.replace(reg1, `\`); $1 print(\``);
//         res = res.replace(reg2, `\`); print($1); \n print(\``);
//         res = `print(\`${res}\`)`;
//         var html = "";
//         function print(str) {
//             html += str;
//         }
//         eval(res);
//         return html;
//     }
//     window.myTemplate = myTemplate;
// }();
// var data = [{ a: 1 }, { a: 2 }];
// var html = myTemplate(document.getElementById("template").innerHTML, data);
// console.log(html);
// document.body.innerHTML=html;