//点击输入框时改变输入框背景颜色功能实现代码;
var userName=document.getElementById("username");
var passWord=document.getElementById("password");
var rePassword=document.getElementById("repassword");
var eMail=document.getElementById("e-mail");
var realName=document.getElementById("name");
var phone=document.getElementById("phone");
var yanZheng=document.getElementById("yanZheng");
var pwdPower=document.getElementById("passwordpower");
var yanZhengMaBox=document.getElementById("yanZhengMa");
var list=[userName,passWord,rePassword,eMail,realName,phone,yanZheng];
for(var i=0,li;li=list[i++];){
    li.onfocus=function(){
        this.className="active";
        // li.changeBackgroundColor();
    }
    li.onblur=function(){
        this.className=" ";
    }
}
//调用用户名验证函数
userName.onblur=usernameVerification;

//调用密码即密码强度验证函数
passWord.onblur=passwordVerification;

//调用重复密码检验函数
rePassword.onblur=repasswordVerification;

//电子邮箱验证函数调用;
eMail.onblur=eMailVerification;

//电话号码验证函数调用;
phone.onblur=phoneVerification;

//验证码
yanZheng.onfocus=function(){
    yanZhengMaBox.style.display="block";
    yanZhengMaBox.innerHTML=yanZhengMa();
}
// function changeBackgroundColor(){
//     this.className="active";
// }
//用户名验证
function usernameVerification(){
    var userNameContent=userName.value;
    var race={
        vtfNum : false,
        vtfWord : false
    }
    //用户名长度
    if(userNameContent.length<6||userNameContent.length>16){
        alert("用户名长度不正确");
        userName.style.borderColor="red";
        return false;
    }
    //用户名内容格式
    for(var i=0,letter;letter = userNameContent[i++];){
        var asc=letter.charCodeAt(0);
        if(asc >= 48 && asc <= 57 ||  asc>=65 && 
            asc<=90 || asc >=97 && asc <= 122 || asc === 95){
                userName.style.borderColor="green";
        }else{
            userName.style.borderColor="red";
            alert("用户名只能以数字、字母以及下划线命名");
            return false;
        }
        //用户名内容单一
        if(asc >=48 && asc<=57 && !race["vtfNum"])
            race["vtfNum"]=true;
        if(asc >=65 && asc<=90 || asc >=97 && asc <= 122 && !race["vtfWord"])
            race["vtfWord"]=true;
    }
    if(race["vtfNum"]===true && race["vtfWord"]===true)
            userName.style.borderColor="green";
    else{
        userName.style.borderColor="red";
        alert("用户名不能为单一的字母或数字");
        // console.log(race["vtfNum"]);
        // console.log(race["vtfWord"]);
        return false;
    }
}
//密码格式验证、密码强度验证
function passwordVerification(){
    pwd=passWord.value;
    var race={
        vtfNum      :   false,
        vtfWord     :   false,
        vtfSignal   :   false
    }
    //密码长度
    if(pwd.length<6||pwd.length>16){
        alert("密码长度不正确");
        passWord.style.borderColor="red";
        return false;
    }
    if(!isNaN(pwd[0])){
        alert("密码格式不能以数字开头");
        passWord.style.borderColor="red";
        return false;
    }
    for(var i=0,letter;letter=pwd[i++];){
        var asc=letter.charCodeAt(0);
        if(asc >= 48 && asc <= 57 ||  asc>=65 && 
            asc<=90 || asc >=97 && asc <= 122 || asc === 95){
                passWord.style.borderColor="green";
        }else{
            passWord.style.borderColor="red";
            alert("密码只能以数字、字母以及下划线规定");
            return false;
        }
        if(asc >=48 && asc<=57 && !race["vtfNum"])
            race["vtfNum"]=true;
        if(asc >=65 && asc<=90 || asc >=97 && asc <= 122 && !race["vtfWord"])
            race["vtfWord"]=true;
        if(asc===95 && !race["vtfSignal"])
            race["vtfSignal"]=true;
    }
    if(race["vtfWord"]&& !race["vtfNum"] && !race["vtfSignal"]){
        pwdPower.children[0].style.backgroundColor="red";
        pwdPower.children[0].children[0].style.display="block";
        pwdPower.children[1].style.backgroundColor="#ddd";
        pwdPower.children[1].children[0].style.display="none";
        pwdPower.children[2].style.backgroundColor="#ddd";
        pwdPower.children[2].children[0].style.display="none";
    }else if(race["vtfWord"] && race["vtfNum"]&& !race["vtfSignal"]||
    race["vtfWord"] && !race["vtfNum"] && race["vtfSignal"]){
        pwdPower.children[0].style.backgroundColor="#ddd";
        pwdPower.children[0].children[0].style.display="none";
        pwdPower.children[1].style.backgroundColor="blue";
        pwdPower.children[1].children[0].style.display="block";
        pwdPower.children[2].style.backgroundColor="#ddd";
        pwdPower.children[2].children[0].style.display="none";
    }else if(race["vtfNum"] && race["vtfSignal"] && race["vtfWord"]){
        pwdPower.children[0].style.backgroundColor="#ddd";
        pwdPower.children[0].children[0].style.display="none";
        pwdPower.children[1].style.backgroundColor="#ddd";
        pwdPower.children[1].children[0].style.display="none";
        pwdPower.children[2].style.backgroundColor="green";
        pwdPower.children[2].children[0].style.display="block";
    }
}
//重复输入密码检验
function repasswordVerification(){
    var repwd=rePassword.value;
    var pwd=passWord.value;
    var str="";
    for(var key in pwd){
        str+=pwd[key];
    }
    for (var i=0,letter;letter=repwd[i++];){
        if(letter===str[i-1]){
            repassword.style.borderColor="green";
        }else{
            repassword.style.borderColor="red";
            alert("输入与密码不同");
            return false;
        }
    }
}

//电子邮箱验证函数
function eMailVerification(){
    var eMailContent=eMail.value;
    var race={
        vtf64 : false,
    }
    for(var i=0,letter;letter=eMailContent[i++];){
        var asc=letter.charCodeAt(0);
        if(asc===64 && !race["vtf64"])
            race["vtf64"]=true;
    }
    if(!race["vtf64"]){
        alert("邮箱格式不正确");
        return false;
    }
}

//手机号码验证
function phoneVerification(){
    var vftPhone=phone.value;
    if(vftPhone.length!==11)
        alert("电话号码长度有误");
}

//验证码
function yanZhengMa(){
    var arr=[];
    for(var i=0;i<=9;i++)
        arr.push(i);
    for(var j=65;j<=90;j++)
        arr.push(String.fromCharCode(j));
    for(var k=97;k<=122;k++)
        arr.push(String.fromCharCode(k));
    var str="";
    for(var m=0;m++<4;){
        str+=arr[Math.round(Math.random()*arr.length)-1];
    }
    // console.log(str);
    return str;
}
yanZhengMa();