var usr = document.getElementById("usr");
var usr_tip = usr.nextElementSibling;
var pass = document.getElementById("password");
var pass_tip = pass.nextElementSibling;
var submit = document.getElementById("submit");
var passed = document.getElementById("passedword");
var youxiang = document.getElementById("youxiang");
var yanzhengma = document.getElementById("yanzhengma");
     function success(input,tip){
           tip.style.display = "none";
           input.className = "success";
     }
     function error(tip,input,tipEle){
           // 还原
           tipEle.style.display = "block";
           input.className = "";
           // 报错;
           tipEle.className = "warn";
           tipEle.innerHTML = tip
     }
     // 验证字符串是否符合 正则规则;
     // 这个列表之中专门负责正则的存储;
     var regList = {
           "usrReg" :  /^[a-z\u2E80-\u9FFF\-_0-9]{4,20}$/i,
           "pureNumber":/^\d+$/i,
           "maxlength4" : /^.{0,4}$/,
           "hasNumber" : /\d/,
           "hasLetter" : /[a-zA-Z]/,
           "hasSC" : /[\!\@\#\$\%\^]/,
           "minlength6" : /^.{0,6}$/
     }
     var mandatoryList = [usr,pass] 
     // 验证正则成功与否;
     function validate(str,reg){
           return reg.test(str);
     }
     function validateUsr(){
           var usrValue = usr.value;

           if(validate(usrValue,regList.maxlength4)){
                 return error("请输入5位以上的账号",usr,usr_tip);                
           }

           if(validate(usrValue,regList.pureNumber)){
                 return error("用户名不能为纯数字",usr,usr_tip);
           }

           if(validate(usrValue,regList.usrReg)){
                 return success(usr,usr_tip);
           }
           return error("支持中文，英文，数字，字母，-，_ 的4~20位字符",usr,usr_tip);
     }
     function validatePass(){
           var passValue = pass.value;

           var strength = 0;

           if(validate(passValue,regList.hasNumber)){
                 strength++;
           }
           if(validate(passValue,regList.hasLetter)){
                 strength++;
           }
           if(validate(passValue,regList.hasSC)){
                 strength++;
           }

           if(validate(passValue,regList.minlength6)){
                 return error("请输入六位以上的代码",pass,pass_tip)
           }
           if(strength === 3){
                 success(pass,pass_tip)
           }else if(strength === 2){
                 error("密码强度不足，建议升级密码",pass,pass_tip)
           }else if(strength === 1){
                 error("密码强度严重不足，强烈建议升级密码",pass,pass_tip)
           }
     }     
     function submitData(){
           for(var i = 0 , ele ; ele = mandatoryList[i++];  ){
                 if(ele.className.split(" ").indexOf("success") === -1){
                       ele.focus();
                       return ;
                 }
           }

           alert("提交!!");
     }
     usr.addEventListener("blur",validateUsr);
     pass.addEventListener("blur",validatePass);
     submit.addEventListener("click",submitData);
var inputArr = document.querySelectorAll('input');
var labelArr = document.querySelectorAll('label');
//确认密码

      var passed_tip = passed.nextElementSibling;
     passed.addEventListener('blur',queren);
     function queren(){
            var passedValue=passed.value;
           var passValue = pass.value;
           if(passValue==passedValue){
            success(passed,passed_tip);
           }
     }
//邮箱
var regYou = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9a-z]{2,9}\.[a-z]{2,6}(\.[a-z]{2,3})?$/i;
var youValue = youxiang.value;
var youxiang_tip = youxiangtip;
youxiang.addEventListener('blur',yanzhengyouxiang);
function yanzhengyouxiang(){
      youValue = youxiang.value;
      if(regYou.test(youValue)){
            success(youxiang,youxiang_tip);
      }
      else{
            error("邮箱格式不正确",youxiang,youxiang_tip)
      }

}