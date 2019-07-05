// ;+function(){
//     function myTemplate( str ,data ){
//         var regJS = /<%[^=](.*?) %>/g;
//         var regVar = /<%= (.*?) %>/g;
//         str = str.replace(/\//g,"\/");
//         var res = str.replace(regJS,`\`);$1 print(\``);
//             res = res.replace(regVar,`\`); print($1); \n print(\``);
//             res = `print(\`${res}\`)`; 
//         var html = "";
//         function print (str){
//             html += str ;
//         }
//         eval(res);
//         return html;
//     }
//     window.myTemplate = myTemplate;
// }();

// ;+function(){
//     function myTemplate (str , data){
//         var regJS = /<%[^=](.*?)%>/g;
//         var regVar = /<%=(.*?)%>/g;
//         str = str.replace(/\//g,"\/");
        
//         var res = str.replace(regJS,`\`);$1 print(\``);
            
//             res = res.replace(regVar,`\`); print($1); \n  print(\``);
//             console.log(res)
//             res = `print(\`${res}\`)`;
//         var html = "";
//         function print (str){
//             html += str ;
//         }
//         eval(res);
//         return html ;
//     }
//     window.myTemplate = myTemplate ;
// }();
// <% for(var attr in data){ %>
//     <h2>向世界问好 <%= data[attr].a %></h2>
// <% } %>



;+function(){
    function myTemplate (str ,data){
        var regJS = /<%[^=](.*?) %>/g;
        var regVar = /<%=(.*?)%>/g;
        var res = str.replace(regJS,`\`); $1 print(\``);
        //console.log(res)
            res = res.replace(regVar,`\`);  print($1)  \n print(\``);
            
            res = `print(\` ${res} \`)`;
        var html = "";
        function print (str){
            html += str;
        }
        //console.log(res)
        eval(res);
        return html;
    }
    window.myTemplate = myTemplate;
}()