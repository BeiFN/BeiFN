(function(window){
    var strategyList={
        "username" : {
            reg : /^[a-z0-9\u4e00-\u9fa5\_\-]{4,20}$/i,
            value:"只能支持中文,英文,数字，- , _ 组成的4~20位字符"
        },
        "email":{
            reg:/^[0-9a-z]{4,15}@[0-9a-z]{4,15}\.(163.com|162.com|yeah.net)$/i,
            value:"只支持163，162，yeah邮箱"
        },
        "password":{
            reg:/^[\!\#\$\%\^\&\*\(\)0-9a-z]{6,20}$/i,
            value:"只允许!@#$%^&*() + 数字 + 字母  密码的长度应该在6到20位"
        }
    }
    function $$(selector){
        var ele=null;
        return (ele=document.querySelectorAll(selector)).length==1?ele[0]:ele;
    }
    function validate(selector,option){
        option?Object.assign( strategyList , option):"";
        var parent=$$(selector);
        var iptList=parent.querySelectorAll("input[v-type]");
        for(var i=0,ele;ele=iptList[i++];){
            ele.addEventListener("blur",handelBlur);
        }
    }
    function handelBlur(){
        if(!strategyList[this.getAttribute("v-type")]){
            return false;
        }
        var value=this.value;
        checkItme(value,this);
    }
    function checkItme(value,_this){
        if(strategyList[_this.getAttribute("v-type")].reg.test(value)){
            _this.style.borderColor="green";
            _this.nextElementSibling.innerHTML="验证通过";
            _this.getAttribute("v-type")=="password" && _this.getAttribute("v-strength")=="true"?passwordStrength(_this):"";
        }else{
            _this.style.borderColor="red";
            _this.nextElementSibling.innerHTML=strategyList[_this.getAttribute("v-type")].value;
           
        }
    }
    function passwordStrength(_this){
        var value=_this.value;
        var count=0;
        if(/\d+/.test(value)){
            count++;
        }
        if(/[a-z]/i.test(value)){
            count++;
        }
        if(/[\!\#\$\%\^\&\*\(\)]/.test(value)){
            count++;
        }
        var ele=_this.parentNode.children[_this.parentNode.children.length-1];
        ele.nodeName=="P"?ele.remove():"";
        var p=document.createElement("p");
        p.innerHTML="密码强度为:"+count;
        _this.parentNode.appendChild(p);
    }
    window.validate = validate;
})(window)
