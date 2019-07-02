// 需求 : 用户名 =>  中文，英文 ， 数字，- , _ 组成的4~20位字符; 
//        tip : 不能是纯数字;
//        邮箱  =>   正常邮箱;
//        密码  =>  允许  !@#$%^&*() + 数字 + 字母  密码的长度应该在6位之上 ,密码强度;

function $(seletor){
  var res = null
  return (res = document.querySelectorAll(seletor)).length === 1 ? res[0] : res
}

var email = $("#email")
var username  = $("#username")
var password = $("#password")
// console.log(email,username,password)

email.addEventListener("blur",validateEmail)
username.addEventListener("blur",validateUsername)
password.addEventListener("blur",validatePassword)

function validateEmail(){
  var value = email.value
  var reg = /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
  if(reg.test(value)){
    this.style.borderColor = "green"
  }else{
    this.style.borderColor = "red"
  }
}

function validateUsername(){
  var value = username.value
  var reg = /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
  if(reg.test(value)){
    // 全是数组或者以-结尾
    if(/^\d+$/.test(value) || /\-$/.test(value)){
      this.style.borderColor = "red"
    }else{
      this.style.borderColor = "green"
    }
  }else{
    this.style.borderColor = "red"
  }
}

function validatePassword(){
  var value = password.value
  var reg = /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
  if(reg.test(value)){
    this.style.borderColor = "green"
    var score = 0 
    // 强度1:全是数字
    if(/\d/.test(value)){
      score++
    }
    // 强度2：全是字母
    if(/[a-z]/i.test(value)){
      score++
    }
    // 强度3：包括!@#$%^&*()
    if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
      score++
    }
    switch(score){
      case 0:
          this.style.borderColor = "red"
          break
      case 1:
          this.style.borderColor = "orange"
          break
      case 2:
          this.style.borderColor = "yellowgreen"
          break
      case 3:
          this.style.borderColor = "green"
          break
      default:
          this.style.borderColor = "red"
    }
  }
}
