class CK{
    static cookie(name , value,
    { 
        expires,
        path   ,
        scure  ,
        domain ,
    } = { }){
        if(arguments === 1){
            let [a , res] = [document.cookie.split("; ") , ""];
            res = a.filter(item => item.split("=")[0] === name);
            return res.length === 0 ? "" : res[0].split("=")[1];
        }
        return (document.cookie = [
            name + "=" + value ,
            options.expires ? ";expires=" + ((d = new Date()).setDate(d.getDate() + options.expires) && d ) : "",
            options.path ? ";path=" + options.path : "" ,
            options.domain ? ";domain=" + options.domain : "",
            options.scure ? ";scure=" + options.scure : ""
        ].join(""));
    }
    static removeCookie(name,path){
        CK.cookie(name,"",{
            expires : -1 ,
            path    : path ? path : ""

        })
    }
}