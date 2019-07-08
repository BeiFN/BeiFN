;+function(){
    function myTemplate(str, data){
        var regJs = /<%([^=].*?)%>/g;
        var regVar = /<%=(.*?)%>/g;
        var html = "";
        var res = str.replace(regJs, `\`);$1print(\``);
        res = res.replace(regVar,`\`);print($1);print(\``);
        res = `print(\`${res}\`)`;
        function print(str){
            html += str;
        }
        eval(res)
        return html;
    }
    window.myTemplate = myTemplate;
}()