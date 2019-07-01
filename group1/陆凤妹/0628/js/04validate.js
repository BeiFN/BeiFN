// ----------------插件基本结构; --------------------
// 1. 把插件放在匿名函数之中,确保插件的各个变量不受其他插件影响;
// var $ = 10;
;+function(window){

      // 策略列表;
      var strategyList = {
            "email" : {
                  reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i,
                  tip :null,
                  msg:"dei佬,背一下你的邮箱@@"
        },
            "password" : {
                  reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i,
                  msg:"dei佬,请来个优雅的名密码"
            },
            // 可能是定制的;
            "username" : { 
                  reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/,
                  msg:"dei佬,记住，我们要起个优雅的名字"
            }
      }

      // 给用户一个高级选项;
      function validate(selector , options) {
            options ? Object.assign( strategyList , options) : "";
            var parent = $(selector);
		// console.log(selector , options);
            var inputList = parent.querySelectorAll("input[v-type]");
            console.log(inputList);
            for(var i = 0 , input ; input = inputList[i++] ; ){
                  input.addEventListener("blur",handlerBlur.bind(input,input.getAttribute("v-type")))
            }
      }

      // tip : 耦合关系一定有一个函数进行统一的处理;
      function handlerBlur(type){
            // type === url
		console.log(1)
            if(!strategyList[type]){
                  return false;
            }
            var value = this.value;
            validateText(type ,value,this);
            // 密码强度验证;
            // 1. 什么时候需要密码强度验证;
            // ① 在验证密码 
            // ② 用户需要验证密码 v-strength 属性必须为true; 
            type === "password" && this.getAttribute("v-strength") ? validateStrength( value , this) : "";

            validatePurenumbers( value , this , this.getAttribute("v-purenumbers")=== "true" ? true : false);
      }
      // ------验证字符串是否符合规则 validetText -------------start----
      function validateText(type, value , ele){
            if(strategyList[type].reg.test(value)){
                  addValidateState("success",ele);
                  hideErrorTip(type,value,ele);

            }else{
                  addValidateState("error",ele);

                  addErrorTip(type,value,ele);//调用
            }

      // 提示信息


      function addErrorTip(type,value,ele){
// 有没有存在过提示菜单
if(!strategyList[type].tip){
      var tip = document.createElement("span");
      tip.innerHTML = strategyList[type].msg?strategyList[type].msg:"请嘤嘤嘤，请输入正确的内容";
       // ele.parentNode.insertBefore(tip,ele);
       ele.parentNode.insertBefore(tip,ele.nextSibling);

//         // 已经插入提示元素，记录提示元素
     strategyList[type].tip = tip;  //需要判断是否存在
}
      }



}
function hideErrorTip(type, value , ele){
      if(strategyList[type].tip){
            strategyList[type].tip.style.display = "none";
      }else{
            strategyList[type].tip.style.display = "inline-block";
      }
}








      // 验证状态的添加;
      function addValidateState(type,ele){
            if(/success|error/.test(ele.className)){
                  ele.className = ele.className.replace(/success|error/g,type)
            }else{
                  ele.className += " "+type
            }
      }
      // ------验证字符串是否符合规则 validetText -------------end----

      // ------验证密码强度 validetpassword -------------start----
      function validateStrength( value , ele){
            var score = 0;
            if(/\d/.test(value)){
                  score ++;
            }            
            if(/[a-z]/i.test(value)){
                  score ++;
            }
            if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
                  score ++;
            }
            switch(score){
                  // v-strength-low
                  // v-strength-middle
                  // v-strength-high
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
      function addStrengthState(level , ele){
            if(/v-strength-(low|middle|high)/.test(ele.className)){
                  ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
            }else{
                  ele.className += " v-strength-"+level;
            }
      }
      // ------验证密码强度 validetpassword -------------start----

      function validatePurenumbers(value , ele , bool){
            if(bool){
                  if(/^\d+$/.test(value)){
                        console.log("成功")
                  }else{
                        console.log("失败")
                  }
            }else{
                  if(/^\d+$/.test(value)){
                        console.log("失败")
                  }else{
                        console.log("成功")
                  }
            }
      }
      function $(selector){
            var res = null;
            return  (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
      } 
      // 2. 局部变量validate 赋值给window，让validate变量全局可访问;
      window.validate = validate;
}(window)

// 在明确的 成功|失败 之后; 创建一个元素 span 并且放在当前元素上面;



// 必选项：周末作业

