// ----------------插件基本结构; --------------------
// 1. 把插件放在匿名函数之中,确保插件的各个变量不受其他插件影响;
// var $ = 10;
;+function(window){
      var newNode = document.createElement("span");
      newNode.innerHTML = "输入错误！";
     
      // 策略列表;
      //email : 数字，字母，下划线{5,10}@数字|字母{2,5}.(com|cn|net);
      //password : 任意字符
      //username : 中文开头{6,}
      var eleList = {
            "email":{
                  reg:/[0-9a-z_]{5,10}@[0-9a-z]{2,5}\.(com|cn|net)/i
            },
            "password":{
                  reg:/[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}/i
            }
      }
      function validate(selector,options){
            options ? Object.assign(eleList,options) : "";
            var ele_parent = $(selector);
            var input_list = ele_parent.querySelectorAll("input[v-type]");
            for(var i = 0,ele;ele = input_list[i++];){
                  ele.addEventListener("blur",handlerBlur.bind(ele,ele.getAttribute("v-type")));
            }
      }
      function handlerBlur(_attribute){
            var _value = this.value;
            if(!eleList[_attribute]){
                  return false;
            }
            //判断各种输入框的内容是否合法
            validateText(_attribute,this,_value,newNode);
            //判断密码强度
            _attribute === "password" && this.getAttribute("v-strength") ? validateStrength(_value,this):"";
            //判断用户名能不能是纯数字
            if(this.getAttribute("v-purenumbers")){
                  validatePurenumbers(_value,this,this.getAttribute("v-purenumbers") === "true" ? true : false,newNode);
            }
      }

      //判断各种输入框的内容是否合法
      function validateText(_attribute,ele,value,newNode){
            if(eleList[_attribute].reg.test(value)){
                  addValidateClass("success",ele);
                 ele.parentNode.children[2] ?  ele.parentNode.children[2].remove():"";
            }else{
                  addValidateClass("error",ele);
                  ele.parentNode.appendChild(newNode,ele);
            }
      }
      //添加class属性
      function addValidateClass(_class,ele){
            if(/success|error|low|middle|high/.test(ele.className)){
                  ele.className = ele.className.replace(/success|error|low|middle|high/,_class);
            }else{
                  ele.className += " "+ _class;
            }
      }
      //判断密码强度
      function validateStrength(value,ele){
            var count = 0;
            if(/\d/.test(value)){
                  count ++;
            }
            if(/[a-z]/i.test(value)){
                  count ++;
            }
            if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
                  count ++;
            }
            switch(count){
                  case 0:
                        addValidateClass("low",ele);
                        break;
                  case 1:
                        addValidateClass("low",ele);
                        break;
                  case 2:
                        addValidateClass("middle",ele);
                        break;
                  case 3:
                        addValidateClass("high",ele);
                        break;
                  default:
                        addValidateClass("low",ele);      
            }
      }

      //判断用户名能不能是纯数字
      function validatePurenumbers(value,ele,bool,newNode){
            if(bool){
                  if(/^\d+$/.test(value)){
                        console.log("success");
                  }else{
                        ele.parentNode.appendChild(newNode,ele);
                  }
            }else{
                  if(/^\d+$/.test(value)){
                        ele.parentNode.appendChild(newNode,ele);
                  }
            }
      }

      function $(selector){
            var res = null;
            return (res = document.querySelectorAll(selector)).length === 1 ? res[0]:res;

      }

      window.validate = validate;
}(window)




