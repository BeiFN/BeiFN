// 1.吧插件放在匿名函数中，确保插件的各个变量不受其他插件影响

;+function(window){

  // 策略列表
  var strategyList = {
    "email" : {
        reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
    },
    "password" : {
        reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
    },
    // 可能是定制的
    "username" : {
      reg : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
    }
  }

// 给用户高级选项
  function validate(selector,options){
    // Object.assign是拷贝源对象自身的并且可枚举的属性到目标对象
    options ? Object.assign(strategyList, options) : ""
    var parent = $(selector)
    var inputList = parent.querySelectorAll("input[v-type]")

    for(var i = 0 ,input; input = inputList[i++];){
      input.addEventListener("blur",handleBlur.bind(input,input.getAttribute("v-type")))

    }
    console.log($)
  }

function handleBlur(type){
  // type === url; strategyList[type]与strategyList.type一样
  if(!strategyList[type]){
    return false
  }
  var value = this.value
  // this正在操作的input
  validateText(type,value,this)
  type === "password" && this.getAttribute("v-strength") ? validateStrength(value,this) : ""
}

function validateText(type,value,ele){
  // url验证正则
  if(strategyList[type].reg.test(value)){
    addValidateState("success",ele)
  }else{
    addValidateState("error",ele)
  }
}

function addValidateState(tyep,ele){
  if(/success|error/.test(ele.classname)){
    ele.classname = ele.classname.replace(/success|error/g,type)
  }else{
    ele.classname += " " + type
  }
}

  function $(seletor){
    var res = null
    return (res = document.querySelectorAll(seletor)).length === 1 ? res[0] : res
  }
  // 2.局部变量validate赋值给window，让validate变量全局都可以访问
  window.validate = validate
}(window)