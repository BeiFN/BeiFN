;+function(window){
    function $(selector){
        var ele=null;
        return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
    }

    //策略列表
    var strategyList={
        "username":{
            reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/,
            tip:"请输入合法的用户名"
        },
        "password":{
            reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i,
            tip:"请输入合法的密码"
        },
        "email":{
            reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i,
            tip:"请输入合法的邮箱"
        }
    }

    function validate(selector,options){
        options ? Object.assign( strategyList,options):"";
        var father=$(selector);
        var iptArr=father.querySelectorAll("input[v-type]");
        console.log(iptArr);
        for(var i = 0;i<iptArr.length;i++){
            iptArr[i].addEventListener("blur",handleBlur.bind(iptArr[i],iptArr[i].getAttribute("v-type")))
        }
    }

    function handleBlur(type){
        if(!strategyList[type]){ return false; }
        var value = this.value;
        validateContent(type ,value,this);
        if(strategyList[type].reg.test(value)){
            addCss("success",this);
            removeElement(this);
        }else{
            addCss("error",this);
            addElement(type,this);
        }
        //密码强度验证
        type==="password"&&this.getAttribute("v-strength")?validateStrength(value,this):"";
        validatePureNum(value,this,this.getAttribute("v-purenumbers")==="true"?true:false);
    }

    function addElement(type,ele){
        var father=ele.parentNode;
        var lastchild=father.lastChild;
        console.log(lastchild.nodeName);
        var tipSpan=document.createElement("span");
        tipSpan.innerHTML=strategyList[type].tip;
        lastchild.nodeName==="#text"?father.appendChild(tipSpan):"";
        //father.appendChild(tipSpan);
        //arr.length===1?father.appendChild(tipSpan):"";   
    }


    function removeElement(ele){
        var father=ele.parentNode;
        var lastchild=father.lastChild;
        console.log(lastchild.nodeName);
        lastchild.nodeName==="SPAN"?father.removeChild(lastchild):""; 
    }


    function validateContent(type,value,ele){
        if(strategyList[type].reg.test(value)){
            addCss("success",ele);
        }else{
            addCss("error",ele);
        }
    }

    function validateStrength(value,ele){
        var score=0;
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

    function addCss(type,ele){
        if(/success|error/.test(ele.className)){
            ele.className=ele.className.replace(/success|error/g,type);
        }else{
            ele.className+= " " + type;
        }
    }

    //去重
    function addStrengthState(level,ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
        }else{
            ele.className += " v-strength-"+level
        }
    }

    function validatePureNum(value,bool){
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




    
    window.validate=validate;
}(window)