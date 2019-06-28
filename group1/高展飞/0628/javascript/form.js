// ----------------插件基本结构; --------------------
// 1. 把插件放在匿名函数之中,确保插件的各个变量不受其他插件影响;

 // 策略列表;


  


;!function (window){
    var strategyList ={
        "email" :{
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password" : {
            reg : /^[\!\@\#\$\%\^\&\*\(\)_\-0-9a-z]{6,}$/i
        },
        "username" :{
            reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
        }
    }


    function validate(selector, options){
        options ? Object.assign(strategyList,options) : "";
        var parent = $(selector);
        var inputList = parent.querySelectorAll("input[v-type]");
        for(var i =0 ,input;input =inputList[i++];){
            input.addEventListener("blur",handlerBlur.bind(input,input.getAttribute("v-type")));
           
        }
    }
    function handlerBlur(type){
        //console.log(strategyList[type])
        if(!strategyList[type]){
            return false;
        }
        var value = this.value;
        //验证
       // validateText(value,this);
       validateText(type,value,this);
       type === "password" && this.getAttribute("v-strength") ? validateStrength(value ,this) : "";
       type === "username" && validatePurenumbers(value , this , this.getAttribute("v-purenumbers") === "true" ? true : false);
    }
    //验证字符串是否符合规则
    function validateText(type,value ,ele){
        
       // console.log(strategyList[type])
        if(strategyList[type].reg.test(value)){
            addValidateState("success",ele);
        }else{
            addValidateState("error",ele);
        }
    }
    //验证状态的添加；
    function addValidateState(type ,ele){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type);
        }else{
            ele.className += " "+type;
        }
    }
    //---------------------密码强度------------------------
    function validateStrength( value , ele ){
        var score = 0;
        if (/\d/.test(value)){
            score ++ ;
        }
        if(/[a-z]/i.test(value)){
            score ++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
            score ++;
        }
        switch(score){
            case 0 :
                addStrengthState("low" , ele);
                break;
            case 1 :
                addStrengthState("low" , ele);
                break;
            case 2 :
                addStrengthState("middle" , ele);
                break;
            case 3 :
                addStrengthState("high" , ele);
                break;
            default :
                addStrengthState("low" , ele);
        }
        
    }
    function addStrengthState (level , ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level)
        }else{
            ele.className += " v-strength-"+level;
        }
        console.log(ele.className)
    }
    function validatePurenumbers(value , ele , bool){
            
        if(bool){
              if(/^\d+$/.test(value)){
                   var dd = "成功";
                   tan(ele ,dd);
                   
              }else{
                    //console.log("失败")
                    var cc = "失败";
                    tan(ele ,dd);
              }
        }else{
              if(/^\d+$/.test(value)){
                    //console.log("失败")
                    cc = "失败";
                    tan(ele ,dd);
              }else{
                    //console.log("成功")
                    dd = "成功";
                    tan(ele ,dd);
              }
        }
  }
  var tanSpan = document.createElement("span");
  function tan (ele,dd){
        if(ele.parentNode.length >=  3){
              ele.parentNode[0].remove();
        }

        if(dd == "成功"){
              tanSpan.innerHTML = "成功";

        }else{
              tanSpan.innerHTML = "失败";
        }
        
        ele.parentNode.style.position= "relative";
        tanSpan.style.position= "absolute";
        //tanSpan.style.top = -18  +"px";
        tanSpan.style.left =250+ "px";
        console.log(tanSpan)
         ele.parentNode.insertBefore(tanSpan,ele.parentNode.children[0]);
  }
    function $(selector){
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] :ele;
    }
   
// 2. 局部变量validate 赋值给window，让validate变量全局可访问;
    window.validate = validate;
}(window)

