;+function(){
    function myTemplate(str , data) {
        var regJS = /<%[^=](.*?)%>/g;
        var regVar = /<%=(.*?)%>/g;
        res = str.replace(regJS , `\`); $1 print(\``);
        res = res.replace(regVar , `\`); print($1); \n print(\``);
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