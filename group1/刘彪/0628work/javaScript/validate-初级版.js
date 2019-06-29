
// 需求 : 用户名 =>  中文，英文 ， 数字，- , _ 组成的4~20位字符; 
//        tip : 不能是纯数字;
//        邮箱  =>   正常邮箱;
//        密码  =>  允许  !@#$%^&*() + 数字 + 字母  密码的长度应该在6位之上 ,密码强度;
/**
 * 变量
 * 
 *  */

 var email = $("#email");
 var username = $("#username");
 var password = $("#password");


 function $(selector){
     var res = null;
     return (res = document.querySelectorAll(selector)).length ===1 ? res[0] : res ;
 }

 email.addEventListener("blur",validateEmail);
 username.addEventListener("blur",validateUsername);
 password.addEventListener("blur",validatePassword);


 function validateEmail(){
    // 1.取值
    var value = this.value;
    // 2.规则
    //开头为数字或字母,总长度6-20;@后2-10位的数字或字母.
    var reg = /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i;
    //3.反馈
    //输入的邮箱字符串含有reg
    if(reg.test(value)){
        this.style.border = "3px solid yellow"
       
       
    }else{
        this.style.border = "3px solid red"
       
    }
 }
 function validateUsername(){

    var value  = this.value;
   
    var reg = /^[\u4e00-\u9fa5a-z0-9_\-]{2,20}$/;
    if(reg.test(value)){
         //不能全为数字,结尾不能为-
        if(/^\d+$/.test(value) || /\-$/.test(value)){
            this.style.border = "3px solid red";
        }else{
            
            this.style.border = "3px solid yellow";
        }
    }else{
        
        this.style.border ="3px solid red";
    }
 }

function validatePassword(){
    var value = this.value;
    var reg = /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i;
    if(reg.test(value)){
        this.style.border = "3px solid yellow";
        var score = 0;
        if(/\d/.test(value)){
            score ++;
        }
        if(/[a-zA-Z]/.test(value)){
            score ++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
            score ++;
        }
        console.log(score);
        switch(score){
            case 1:this.style.border = "3px solid red";
                    break;
            case 2:this.style.border = "3px solid yellow";
                    break;
            case 3:this.style.border = "3px solid yellowgreen";
                    break;
           default:this.style.border = "3px solid red";
                    
        }
    }else{
        this.style.border = "3px solid red"
    }
}
