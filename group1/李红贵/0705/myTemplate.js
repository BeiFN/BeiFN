;+function(window){
    function myTemplate(str,data){
        var regJS =/<%[^=](.*?)%>/g;
        var regVar = /<%=(.*?)%>/g;

        // 正则匹配替换字符串，改成eval可识别字符串
        var res = str.replace(regJS,`\`); $1 print(\``);
            res = res.replace(regVar,`\`); print($1); \n print(\``);
            res = `print(\`${res}\`)`;
        var html = "";
        function print(str){
            html += str;
        }
        eval(res);
        return html;
    }
    window.myTemplate = myTemplate;
}(window);