class Utils{
      static ajax(url, data, type){
            return new Promise( function(resolve , reject){
                  var xhr = null;
                  if(XMLHttpRequest){
                        xhr = new XMLHttpRequest();
                  }else{
                        xhr = new ActiveXObject("Mricosoft.XMLHTTP");
                  }
                  if(xhr === null) throw "浏览器不支持ajax";

                  var dataStr = "";
                  for(var attr in data){
                        dataStr += (dataStr.length > 0 ? "&" : "") + attr + "=" + data[attr];
                  }

                  type === "GET" ? url += (/\?/.test(url) ? "&" : "?") + dataStr : "";

                  xhr.open( type ? type : "GET" , url );
                  type === "POST" ? xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"): "";
                  xhr.send( type === "POST" ? dataStr : null );
                  xhr.onreadystatechange = function(){
                        if(xhr.readyState === 4 && xhr.status === 200){
                              resolve(xhr.responseText);
                        }
                  }
                  // 设置超时;
                  setTimeout(function(){
                        reject(xhr,"timeout");
                  },100000)
            })
      }
}