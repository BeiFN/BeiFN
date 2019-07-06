;+function(){
    function myTemplate(str,data){
        var regJS=/<%[^=](.*?)%>/g;
        var regVar=/<%=(.*?)%>/g;
        str=str.replace(/\//g,"\/");//显示全部
        // console.log(str);
        var res=str.replace(regJS,`\`); $1 print(\``);
        res=res.replace(regVar,`\`); print($1); \n print(\``);
        console.log(res);
        res=`print(\`${res}\`)`;
        // console.log(res);
        var html="";
        function print(str){
            html +=str;
        }
        eval(res);
        return html;

    }
    window.myTemplate=myTemplate;
}()