var usr=document.getElementById("usr");
var password=document.getElementById("password");
var usr_tip=usr.nextElementSibling;
var password_tip=password.nextElementSibling;
var repassword=document.getElementById("repassword");
var repassword_tip=repassword.nextElementSibling;
usr.addEventListener("blur",validateUserName);
password.addEventListener("blur",validateUserPassword);
repassword.addEventListener("blur",revalidateUserPassword);
function validateUserName(){
    var value=usr.value;
    var reg=/[a-z\0-9\u2E80-\u9FFF\-_]/;
    usr.className="";
    usr_tip.style.display="block";
    if(value.length<4){
        usr_tip.className="warn";
        usr_tip.innerHTML="请输入4~20位的用户名";
        return false;
    }
    if(/^\d+$/.test(value)){
       usr_tip.className="warn";
        usr_tip.innerHTML="不得为纯数字";
        return false;
    }
    if(!reg.test(value)){
       usr_tip.className="error";
        usr_tip.innerHTML="支持中文，英文，数字，字母，-，_ 的4~20位字符";
        return false;
    }else{
        usr.className="success";
        usr_tip.style.display="none";
    }
}
function validateUserPassword(){
    var value=password.value;
    var strength=0;
    password.className="";
       password_tip.style.display="block";
    if(/[^\d$]/.test(value)){
        strength++;
    }
    if(/[^a-z$]/i){
        strength++;
    }
    if(/[\!\@\#\$\%\^]/.test(value)){
        strength++;
    }
    if(strength===3){
       password.className="success";
       password_tip.style.display="none";
       return 0;
    }
    if(strength===2){
        password_tip.innerHTML="密码强度不足，建议加强密码";
        password_tip.className="warn";
        return false;
    }
    if(strength===1){
       password_tip.innerHTML="密码强度严重不足，建议加强密码";
        password_tip.className="warn";
        return false;
    }

}
function revalidateUserPassword(){
    if(repassword.value!=password.value){
        repassword_tip.className="warn";
     repassword_tip.innerHTML="你输入的密码不正确，请你再次输入"
    }else{
        repassword.className="success";
        repassword_tip.style.display="none";
    }
}