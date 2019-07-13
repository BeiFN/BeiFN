class Utils{
    //cookie
    static cookie(name,value,{
        expires, //生命周期
        path ,   //路径
        domain,  //跨域 domain 同域
        secure  
    } = {}){
        //获取cookie
        if(arguments.length==1){
            //获取数组
            let arr = document.cookie.split(", ")
            let res = arr.filter(item=>{
                item.split("=")[0]==name
            })
            //如果有多个我们只获取第一个
            return res.length==0?"":res[0].split("0")[1]
        }

        //设置cookie
        // document.cookie = 
        return (document.cookie = [
            name = value,
            //生命周期
            expires?";expires"+expires:"",
            path?";path"+path:"",
            domain?";domain"+domain:"",
            secure?";secure"+secure:"",
        ].join(""))
    }

    static removeCookie(name,path){
        Utils.cookie(name,"",{
            path,
            expires:-1
        })      
    }
}