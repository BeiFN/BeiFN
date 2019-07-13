class Utils{
    static ajax(url,data,type){
        return new Promise(function(resolve,reject){
            let xhr = null;
            if(XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject("Mricosoft.XMLHTTP");
            }

            if(xhr === null) throw "浏览器不支持ajax";

            let data_str = "";
            for(var attr in data){
                data_str += `${data_str.length > 0 ? "&" : ""}${attr}=${data[attr]}`;
            }
            type === "GET" ? url +=  (/\?/.test(url) ? "&" : "?") + data_str : "" ;
            
            xhr.open(type ? type : "GET",url);

            type === "POST" ? xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded") : "";

            xhr.send(type === "POST" ? data_str : null);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    resolve(xhr.responseText);
                }
            }

            setTimeout(function(){
                reject(xhr,"timeout");
            },8000)
        })
    }
}