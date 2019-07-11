class  Utils{
    static ajax (url  ,data  ,type){
        //promise版ajxa封装    
        return new Promise(function (resolve ,reject){
            //判断浏览器兼容性问题
            var xhr = null;
            if(XMLHttpRequest){
                xhr = new  XMLHttpRequest;
            }else{
                xhr = new ActiveXObject("Mricosoft.XMLHTTP");
            }
            if(xhr === null)  throw "浏览器不支持ajax";


            //数据的拼接
            var dataStr = "";
            for(var attr in data ){
                //判断字符串数据长度，只要不是第一个，之后的都要拼接&
                dataStr += (dataStr.length > 0 ? "&" : "")+attr + "=" +data[attr];

            }
            //判断方式，拼接时判断url中有无问号，有就用&拼接，没有用问好拼接
            type ==="GET" ? url += (/\?/.test(url) ? "&" : "?")+dataStr :"";
            //open中传两个参数，方式和url
            xhr.open(type ? type :"GET" ,url);
            xhr.open( type ? type : "GET" , url );
           
            //判断是否是post，是的话要添加setResquestHeader(两个参数如下)
            type === "POST" ? xhr.setRequestHeader("Content-type","application/x-www-urlencoded"):"";
            xhr.send(type === "POST" ? dataStr : null);
            //监听 (存有 XMLHttpRequest 的0-4的状态 )浏览器状态为4（加载完成状态）并且  提交成功 status ===200
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    resolve(xhr.responseText);
                }
            }
            //如果为成功延时爆出timeout
            setTimeout(function(){
                reject(xhr,"timeout");
            },8000)
        })
    }
}
// class Utils{
//     static ajax(url  , data, type){
//           return new Promise( function(resolve , reject){
//                 var xhr = null;
//                 if(XMLHttpRequest){
//                       xhr = new XMLHttpRequest();
//                 }else{
//                       xhr = new ActiveXObject("Mricosoft.XMLHTTP");
//                 }
//                 if(xhr === null) throw "浏览器不支持ajax";

//                 var dataStr = "";
//                 for(var attr in data){
//                       dataStr += (dataStr.length > 0 ? "&" : "") + attr + "=" + data[attr];
//                 }

//                 type === "GET" ? url += (/\?/.test(url) ? "&" : "?") + dataStr : "";

//                 xhr.open( type ? type : "GET" , url );
//                 type === "POST" ? xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"): "";
//                 xhr.send( type === "POST" ? dataStr : null );
//                 xhr.onreadystatechange = function(){
//                       if(xhr.readyState === 4 && xhr.status === 200){
//                             resolve(xhr.responseText);
//                       }
//                 }

//                 // 设置超时;
//                 setTimeout(function(){
//                       reject(xhr,"timeout");
//                 },8000)
//           })
//     }
// }