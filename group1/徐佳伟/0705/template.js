
//哦也 一次性成功!!
+(function(window){
    function Template(str){
        var reg  = /<%[^=](.*?)%>/g;
        var reg2 = /<%=(.*?)%>/g;
        var res = str.replace(reg,`\`);$1print(\``);
            res = `print(\`${res}\`)`;
            res = res.replace(reg2, `\`);print($1);print(\`)`);
        var html = "";
        function print(str){
            html += str;
        }
            eval(res);
            return html;
    }

    window.Template = Template;
}(window))