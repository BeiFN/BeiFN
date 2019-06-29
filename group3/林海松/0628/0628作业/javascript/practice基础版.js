
var email = $("#email");
var username = $("#username");
var password = $("#password");
function $(selector){
    var select = null;
    return (select = document.querySelectorAll(selector)).length === 1 ? select[0] : select
}
email.addEventListener("blur" , validateEmail ); 
username.addEventListener("blur" , validateUsername );
password.addEventListener("blur" , validatePassword );
function validateEmail(){
    //取值
    //编写正则  (6-20位任意数字 字母 下划线,)
    //验证并给出结果
    var emailValue = email.value;
    var reg_email = /^[0-9a-z]\w{5,19}@[0-9a-z]{2,10}\.(com|cn|net)$/i;
    if(reg_email.test(emailValue)){
        this.style.borderColor = "green";
    }
    else{
        this.style.borderColor = "red";
    }
}
function validateUsername(){
    var usernameValue = username.value;
    var reg_username = /^[\u4e00-\u9fa50-9a-z_-]{4,20}$/i;
    if(reg_username.test(usernameValue)){//判断输入的密码在无误的情况下，是否已数字开头或-号结尾。
        if(/^\d/.test(usernameValue)){
            this.style.borderColor = "red";
        }
        else if(/-$/.test(usernameValue)){
            this.style.borderColor = "red";
        }
        else{
            this.style.borderColor = "green";
        }  
    }
    else{
        this.style.borderColor = "red";
    }
}
function validatePassword(){
    var passwordValue = password.value;
    var reg_password = /^[\!\@\#\$\%\^\&\*\(\)_0-9a-z]{6,}$/i;
    var count = 0;
    if(reg_password.test(passwordValue)){//在符合规则的前提下，判断密码强度
        if(/\d+/.test(passwordValue)){
            count++;
        }
        if(/[a-z]+/i.test(passwordValue)){
            count++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)\_\+]+/.test(passwordValue)){
            count++;
        }
        switch(count){
            case 0 :
                this.style.borderColor = "green";
                break;
            case 1 :
                this.style.borderColor = "green";
                break;
            case 2 :
                this.style.borderColor = "orange";
                break;
            case 3 :
                this.style.borderColor = "black";
                break;
            default:
                this.style.borderColor = "red";
        }
    }
    else{
        this.style.borderColor = "red";
    }

}