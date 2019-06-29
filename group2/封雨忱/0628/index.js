(function(window){
    //-------------------------------封装querySelectorAll-----------------------------------------------
    function $(selector){
        var res = null;
        return  (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
  }
  //---------------------------------要求------------------------------------------------------------------
    var strategyList = {
        "email" : {
              reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password" : {
              reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        }
  }
  //---------------------------------使插件可以在外部访问----------------------------------------------
  window.validate = validate;
  //---------------------------------validate(selector[form的ID] , options[添加的要求对象])---------------
  function validate(selector,options){
    options ? Object.assign(strategyList,options):'';
    var parent=$(selector);
    var inputList=parent.querySelectorAll('input[v-type]');
    for(var i=0 , input ; input=inputList[i++] ;){
        input.addEventListener('blur',handlerBlur.bind(input,input.getAttribute('v-type')))
    }
  }
  //--------------------------------耦合函数(判断是否符合要求||判断密码强度||判断是否全数字)------------------------
  function handlerBlur(type){  
  if(!strategyList[type]){
        return false;
    }
    var value=this.value;                     
    validateText(type,value,this); 
    // console.log(value)
    type==='password'&&this.getAttribute('v-strength')? validateStrength(value,this):'';
    validatePurenumbers( value , this , this.getAttribute("v-purenumbers")=== "true" ? true : false);
  }
 

  //------------------------------------判断是否符合要求------------------------------------------------
  function validateText(type,value,ele){
    if(strategyList[type].reg.test(value)){
        addValidateState('success',ele)
        var creEle=document.createElement('span');
        // // parent.insertBefore(ele,span);
        // console.log(ele.parentNode)
        // console.log(ele)
        creEle.innerHTML='成功';
        ele.parentNode.insertBefore(creEle,ele);

    }else{
        addValidateState('error',ele);
    }
  }

  //----------------------------------给符合或不符合的添加Class-----------------------------
  function addValidateState(type,ele){
      if(/success|error/.test(ele.className)){
        ele.className = ele.className.replace(/success|error/g,type)
      }else{
        ele.className += " "+type
      }

  }

  //---------------------------------validateStrength函数：判断密码强度--------------------------------
  function validateStrength(value,ele){           
    
    var count=0;
    if(/\d/.test(value)){
        count++;
    }
    if(/[a-z]/i.test(value)){
        count++;
    }
    if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
        count++;
    }
    switch(count){
        case 0:
                addStrengthState('low',ele);
                break;
        case 1:
                addStrengthState('low',ele);
                break;
        case 2:
                addStrengthState('middle',ele);
                break;
        case 3:
                addStrengthState('high',ele);
                break;
        default:
                addStrengthState('low',ele);
                break;
    }

  }
  
  //-------------------------------------------密码强度的设置-------------------
  function addStrengthState(level,ele){
      if(/v-strength-(low|middle|hight)/.test(ele.className)){
          ele.className=ele.className.replace(/v-strength-(low|middle|hight)/,'v-strength-'+level);
      }else{
          ele.className+=' '+'v-strength-'+level
      }
  }
  //----------------------------------------是否全是数字---------------------
  function validatePurenumbers(value,ele,bool){
      if(bool){
          if(/^\d+$/.test(value)){
              console.log('成功');
          }else{
              console.log('失败');
          }
      }else{
          if(/^\d+$/.test(value)){
              console.log('失败');
          }else{
              console.log('成功');
          }
      }

  }



})(window);