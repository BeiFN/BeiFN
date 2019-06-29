//插件的基本结构
//1.把插件放在匿名函数之中,确保插件的各个变量不受其他插件的影响
!function(){

function $(selector){
    var res= null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}
  
    //策略列表
var strategyList = {
    "email" : {
        // 字母或数字开头,可含有字母数字下划线,@后2到10位的字母或数字,之后是点,之后是com,cn,net
        reg:/^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i,
    },
    "password":{
        //至少6位,可含有符号数字字母
        reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
    }, 
    "username" : { 
        //含有汉字数字字母下划线和减号
        reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
  }
}
// 2.局部变量validate赋值给window,让validate变量全局可访问;
    window.validate = validate;

    //给用户一个高级选项,可以扩展策略列表
    function validate (selector,options){
        //如果存在用户自定义列表,就将默认列表与之合并
        options ? Object.assign(strategyList,options) : "";
        var parent = $(selector);
        //获取带有此属性的input节点集合
        var inputList = parent.querySelectorAll("input[v-type]");
        //给每个input节点绑定事件
        for(var i = 0,input; input = inputList[i++];){
                                                        //固定this指向,固定参数
            input.addEventListener("blur",handlerBlur.bind(input,input.getAttribute("v-type")));
        }
    }   

    var state;
    //处理失焦
    function handlerBlur(type){
        // 如果策略列表里不存在type,返回false;
        if(!strategyList[type]){
            return false;
        }
        var value = this.value;

        //判断文本内容
        state = validateText(type,value,this);    
        //判断密码强度
        type==="password" && this.getAttribute("v-strength") ? validateStrength(value,this) : "";
        //判断用户名是否为纯数字
        validatePurenumbers( value , this , this.getAttribute("v-purenumbers")=== "true" ? true : false);
    }

//验证字符串是否符合规则 valideText------------start-----
    function validateText(type,value ,ele){
        if(strategyList[type].reg.test(value)){
            addValidateState("success",ele);
            addSpan("success",ele);

            return true;
        }else{
            addValidateState("error",ele);
            addSpan("error",ele);

            return false;
        }
    }
    //验证状态的添加;
    function addValidateState(type,ele){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type)
        }else{
            ele.className +=" "+type;
        }

    }
    //验证状态提示框的添加;
    function addSpan(type,ele){
        var span = document.createElement("span");
        var eleName = document.getElementById 
        if(ele.parentNode.children.length >=3){
            ele.parentNode.children[2].remove();
        }  
        if(type=="success"){
            span.innerHTML = "输入正确"
            ele.parentNode.appendChild(span,ele);
        }else{
            span.innerHTML = "输入错误"
            ele.parentNode.appendChild(span,ele);
        }

    }
//验证字符串是否符合规则  valideText--------end

 //验证密码强度 validetpassword-------------start

function  validateStrength(value ,ele){
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

function addStrengthState(level,ele){
    if(/v-strength-(low|middle|high)/.test(ele.className)){
        ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
  }else{
        ele.className += " v-strength-"+level;
  }
}
// ------验证密码强度 validetpassword -------------end----

//验证用户名是否为纯数字
    function validatePurenumbers(value,ele,bool){
        
        console.log(state);
        //允许全为数字
        if(bool){
            //且符合用户名普通规则
            if(state){ 
                addValidateState("success",ele);
                 addSpan("success",ele);
                }
                //纯数字且不符合普遍规则
                else{
                  addValidateState("error",ele);
                  addSpan("error",ele);
                }
        }//不允许纯数字
        else{
            //全为数字
            if(/^\d+$/.test(value))
            {
                addValidateState("error",ele);
                addSpan("error",ele);
            }else{
                //不为纯数字且符合普遍规则
                if(state){ 
                    addValidateState("success",ele);
                     addSpan("success",ele);
                    }//不为纯数字且不符合普遍规则
                    else{
                        addValidateState("error",ele);
                      addSpan("error",ele);
                    }
               
            }
        }
    }






}();