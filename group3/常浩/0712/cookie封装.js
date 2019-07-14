class Utils{
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
  static $(selector){
      let res ;
      return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
  }
}