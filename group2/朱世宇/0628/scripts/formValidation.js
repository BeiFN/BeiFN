;+function(window){
/**
 * @param {元素节点}   email
 * @param {元素节点}   username
 * @param {元素节点}   password
 */
var email = $("#email");
var username = $("#username");
var password = $("#password");
var btn = $(".btn")
var i = null;

/**
 * @function 选择器 
 */
function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res; 
}

/**
 * @function 检验邮箱
 */
function validateEmail(){
    var inputValue = this.value;
    var email = $(".email")
    validate(email,inputValue,this)
}

/**
 * @function 验证用户名
 */
function validateUsername(){
    var inputValue = this.value;
    var username = $(".username")
    validate(username,inputValue,this)
}

/**
 * @function 检验密码
 */
function validatePassword(){
    var inputValue = this.value;
    var password = $(".password")
    validate(password,inputValue,this)
    passwordStrength(inputValue);
}

/**
 * @function 检验
 */
function validate(selector,inputValue,ele){
    var name = ele.getAttribute("id");
    if(stratefyList[name].test(inputValue)){
        selector.style.display = "block";
        ele.style.borderColor = "#ccc";
    }else{
        selector.style.display = "none";
        ele.style.borderColor = "red";
    }
}

/**
 * @function 检验密码强度
 */
function passwordStrength(str){
    var list = $(".progress-bar");
        if(/\d/.test(str)){
             list[0].style.display = "block";
        }
        if(/[a-z]/i.test(str)){
            list[1].style.display = "block";
        }
        if(/[\-\_]/.test(str)){
            list[2].style.display = "block";
        }
}

/**
 * @param {策略列表} 
 */
var stratefyList = {
    "email" :  /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    "username" : /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/i,
    "password" : /^[\w_-]{6,16}$/,
}

/**
 *  
 */
    email.addEventListener("blur",validateEmail);
    username.addEventListener("blur",validateUsername);
    password.addEventListener("blur",validatePassword);
}(window)
