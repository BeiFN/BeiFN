class Utils{
      static $(selector){
            let ele=null;
            return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
      }
      static ajax(url ,
            { 
                  data, 
                  type , 
                  dataType,
                  callback
            } 
            =
            { 
                  type : "GET" ,
                  data : {} ,
                  dataType : "text",
                  callback : "callback"
             })
            {

            if(dataType === "jsonp"){
                  return Utils.jsonp( url , data , callback)
            }
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
                              let res = xhr.responseText;
                              switch(dataType){
                                    case "text" :res =  typeof res === "string" ? res : JSON.stringify(res);
                                          break;
                                    case "json" :res =  typeof res === "string" ? JSON.parse(res) : "";
                                          break;
                              }
                              resolve(res);
                        }
                  }

                  // 设置超时;
                  setTimeout(function(){
                        reject(xhr,"timeout");
                  },8000)
            })
      }
      static jsonp(url , data , cb_fild = "callback" ){

            return new Promise( ( resolve , reject) => {
                  let GLOBAL_CB = "_" + Date.now();
                  window[GLOBAL_CB] = function(res){
                        resolve(res);
                        delete window[GLOBAL_CB];
                        GLOBAL_CB = false;
                  }
                  url += (/\?/.test(url) ? "&" : "?") + cb_fild + "=" + GLOBAL_CB

                  let dataStr = "";
                  for(let attr in data){
                        dataStr += "&" + attr + "=" + data[attr];
                  }

                  let script = document.createElement("script");
                  script.src = url + dataStr;
                  script.onload = function(){
                        this.remove();
                  }
                  document.body.appendChild(script);
            })
      }
      
      static cookie( 
            name , value ,
            { 
                  expires,
                  path ,
                  domain,
                  secure
            } = { }
      ){    
            // 获取cookie;
            if( arguments.length === 1){
                  let [a,res] = [document.cookie.split("; "),""];
                  res = a.filter( item => item.split("=")[0] === name);
                  return res.length === 0 ? "" : res[0].split("=")[1];
            }
            // 设置cookie;
            return (document.cookie = [
                  name + "=" + value,
                  expires ? ";expires=" + ((d = new Date()).setDate(d.getDate() + expires) && d ): "",
                  path    ? ";path="    +  path   : "",
                  domain  ? ";domain="  +  domain : "",
                  secure  ? ";secure="  +  secure : ""
            ].join(""))
      }
      // 删除cookie;
      static removeCookie(name , path = ""){
            Utils.cookie( name , "" , {
                  path,
                  expires : -1
            })
      }
}