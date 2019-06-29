var myemail = $("#iptEmail");
var username = $("#iptUsername");
var password = $("#iptPwd")
var btn = $("#iptSubmit")
var tipList = $(".tip")
// console.log(myemail)
myemail.addEventListener("blur",yanzhengEmail)
username.addEventListener("blur",yanzhengName)
password.addEventListener("blur",yanzhengPwd)
// email.addEventListener("blur",yanzhengEmail)
// for(var tip in tipList){

// }
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length===1?ele[0]:ele
}

function yanzhengEmail(){
    var email = this.value 
    // 字母数字
    var reg = /^[0-9a-z]\w{5,19}@[0-9a-z]{2,10}\.(com|cn|net)$/i;
    if(reg.test(email)){
        this.style.borderColor = "green"
    }else{
        this.style.borderColor = "red"
        tip.innerHTMl =""
    }

}
function yanzhengName(){
    var username = this.value;
    //[\u4e00-\u9fa5]
    var reg =  /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/;
    if(reg.test(username)){
        //判断为纯数字或者是以-结尾的都爆红
        if((/^\d+$/).test(username)||(/\-$/)){
            this.style.borderColor = "red"
        }else{
            this.style.borderColor = "green"
        }
    }else{
        this.style.borderColor = "red"
    }
}

function yanzhengPwd(){
    var pwd = this.value;
    var reg = /^[\~\!\@\#\$\%\^\&\*\(\)\-\_0-9a-z]{6,20}$/i
    if(reg.test(pwd)){
        this.style.borderColor="green"
    }else{
        this.style.borderColor="red"
    }
    var score = 0;
    if(/^\d+$/.test(pwd)){
        score++
    }
    if(/^\w$/.test(pwd)){
        score++
    }
    if(/^[\~\!\@\#\$\%\^\&\*\(\)\-\_]$/.test(pwd)){
        score++;
    }
    switch(score){
        case 0 : this.style.borderColor = "gray";break;
        case 1 : this.style.borderColor = "red";break;
        case 2 : this.style.borderColor = "orange";break;
        case 3 : this.style.borderColor = "green";break;
    }
}

