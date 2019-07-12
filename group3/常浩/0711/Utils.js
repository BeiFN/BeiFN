class Utils{
    static AJAX(url,data,type){
            return new Promise(function(resolve,reject){
            let xhr = new XMLHttpRequest();
            let dataStr = "";
            data ? data : {};
            for(let attr in data){
                dataStr += (dataStr.length > 0 ? "&" : "") + attr + "=" +data[attr];
            }
            type === "GET" ? url += (/\?/.test(url)? "&" : "?")+ dataStr : "";
            xhr.open(type ? type : "GET",url)
            type === "POST" ? xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"):"";
            xhr.send(type==="POST" ? dataStr :null);
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