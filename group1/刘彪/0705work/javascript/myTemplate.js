;!function(){
    function myTemplate(str,data){
        var reg1 = /<%[^=](.*?)%>/g;
        var reg2 = /<%=(.*?)%>/g;
        var res = str.replace(reg1,`\`);$1 print(\``);
            res = res.replace(reg2,`\`);print($1);print(\``);
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