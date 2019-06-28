// 需求 : 用户名 =>  中文，英文 ， 数字，- , _ 组成的4~20位字符; 
//        tip : 不能是纯数字;
//        邮箱  =>   正常邮箱;
//        密码  =>  允许  !@#$%^&*() + 数字 + 字母  密码的长度应该在6位之上 ,密码强度;

/**
 * 变量
 */
var email = $("#email");
var username = $("#username");
var password = $("#password");

/**
 * 选择器
 */
function  $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

/**
 * 验证邮箱
 */
function validateEmail(){
    // 1. 取值 => 你得有字符串;
    var value = this.value;
    // 2. 规则 => 正则 ;
    var reg = /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i;
    // 3. 反馈 => 正确还是错误;
    if(reg.test(value)){
        this.style.borderColor = "green";
    }else{
        this.style.borderColor = "red";
    }
}
/**
 * 验证密码
 */
function validatePassword(){
    var value = this.value;
    var reg = /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i;
    if(reg.test(value)){
        this.style.borderColor = "green";
        //验证密码强度
        var score = 0;
        if(/\d/.test(value)){
            score ++;
        }
        if(/[a-z]/i.test(value)){
            score ++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)]/.test(value)){
            score ++;
        }
        switch(score){
            case 0 : case 1 :
                this.style.borderColor = "red";
                break;
            case 2 :
                this.style.borderColor = "orange";
                break;
            case 3 :
                this.style.borderColor = "green";
                break;
            default :
                this.style.borderColor = "red";
        }
    }else{
        this.style.borderColor = "red";
    }
}
/**
 * 验证用户名
 */
function validateUsername(){
    var value = this.value;
    var reg = /^[\u4e00-\u9fa5aa-z0-9_\-]{4,20}$/;
    if(reg.test(value)){
        if(/^\d+$/.test(value) || /\-$/.test(value)){
            this.style.borderColor = "red";
        }else{
            this.style.borderColor = "green";
        }
    }else{
        this.style.borderColor = "red";
    }
}
/**
 * 业务
 */
email.addEventListener("blur",validateEmail);
password.addEventListener("blur",validatePassword);
username.addEventListener("blur",validateUsername);