var email = $("#email");
var username = $("#username");
var password = $("password")

function $(selector)
{
    var res = null;
    return  (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}
function validateEmail(){
      // 1. 取值 => 你得有字符串;
      var value = this.value;
      // 2. 规则 => 正则 ;
      var reg = /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i;
      // 3. 反馈 => 正确还是错误;

      if(reg.test(value)){
            this.style.borderColor = "yellowgreen";
      }else{
            this.style.borderColor = "red";
      }
 }
 function validatePassword(){
      var value = this.value;
      var reg = /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i;
      if(reg.test(value)){
            this.style.borderColor = "yellowgreen";
            //验证密码强度;
            var score = 0;
            if(/\d/.test(value)){
                  score ++ ;
            }
            if(/[a-z]/i.test(value)){
                  score ++;
            }
            if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
                  score ++;
            }
            console.log(score);
            switch(score){
                  case 1 : 
                        this.style.borderColor = "red";
                        break;
                  case 2 : 
                        this.style.borderColor = "orange";
                        break;
                  case 3 : 
                        this.style.borderColor = "yellowgreen";
                        break;
                  default :
                        this.style.borderColor = "red";
            }

      }else{
            this.style.borderColor = "red";
      }
 }
 function validateUsername(){
      var value = this.value;
      var reg = /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/;
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

 email.addEventListener("blur" , validateEmail );
 username.addEventListener("blur" , validateUsername );
 password.addEventListener("blur" , validatePassword );

