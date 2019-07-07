//插件 
;+function(){
    
    function myYinqing(str,data){
        var reg = /<%[^=](.*?)%>/g
        var bianReg = /<%=(.*?)%>/g
        str = str.replace(reg,"\`);$1;print(\`")
        str = str.replace(bianReg,"\$\{$1\}")
        var res = `print(\`${str}\`)`
        var html = ""
        function print(str){
            // str = str.trim();
            //因为res中有多个print 循环将print中的值进行拼接
            html+=str
        }
        eval(res)
        // console.log(html)
        return html
    }
    window.myYinqing = myYinqing
}()
