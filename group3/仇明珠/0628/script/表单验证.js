//用户名 =>  中文，英文 ， 数字，- , _ 组成的4~20位字符; 
//        tip : 不能是纯数字;
//        邮箱  =>   正常邮箱;
//        密码  =>  允许  !@#$%^&*() + 数字 + 字母  密码的长度应该在6位之上 ,密码强度;
var userName=$$("#username");
var email=$$("#email");
var password=$$("#password");
var strength=$$("#strength");
function checkUserName(){
    var value=this.value;
    var reg=/^[a-z0-9\u4e00-\u9fa5\_\-]{4,20}$/i;
    if(reg.test(value)){
        this.style.border="1px solid green";
    }else{
        this.style.border="1px solid red";
    }

}
function checkEmail(){
    var value=this.value;
    var reg=/^[0-9a-z]{4,15}@[0-9a-z]{4,15}\.(163.com|162.com|yeah.net)$/i;
    if(reg.test(value)){
        this.style.border="1px solid green";
    }else{
        this.style.border="1px solid red";
    }
}
function checkPassword(){
    var value=this.value;
    var reg=/^[\!\#\$\%\^\&\*\(\)0-9a-z]{6,20}$/i;
    if(reg.test(value)){
        this.style.border="1px solid green";
    }else{
        this.style.border="1px solid red";
    }
    checkStrength(value);

}
function checkStrength(value){
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
    strength.innerHTML="密码强度为:"+count;
}
userName.addEventListener("blur",checkUserName);
email.addEventListener("blur",checkEmail);
password.addEventListener("blur",checkPassword);
password.addEventListener("focus",function(){
    strength.innerHTML="";
})
function $$(selector){
 
    return (document.querySelectorAll(selector).length)==1?document.querySelectorAll(selector)[0]:document.querySelectorAll(selector);
}