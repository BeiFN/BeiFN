var username = document.getElementById("username");
var passwordF = document.getElementById("passwordF");
var passwordS = document.getElementById("passwordS");
var emailBox = document.getElementById("email_box");
var trueName = document.getElementById("true_name");
var phoneNumber = document.getElementById("phone_number");
var hiddenBox = document.getElementById("hidden_box");
var verifyCode = document.getElementById("verify_code");
var randomVerifyCode = document.getElementById("random_verify_code");


username.addEventListener("blur", nameCheck);
passwordF.addEventListener("blur", passwordCheck);
passwordF.addEventListener("keydown", pwdLevel);
passwordS.addEventListener("blur", repeatPassword);
emailBox.addEventListener("blur", mailboxCheck);
trueName.addEventListener("blur", trueNameCheck);
phoneNumber.addEventListener("blur", phoneCheck);
randomVerifyCode.addEventListener("click", randomVerifyNumber);


function nameCheck() {
    regularJudege(this, "\\w");
}

function passwordCheck() {
    regularJudege(this, "^(\\w){6,20}$");
}

function repeatPassword() {
    if (passwordF.value === passwordS.value) this.style.borderColor = "green";
    else this.style.borderColor = "red";
}

function trueNameCheck() {
    regularJudege(this, "^[\\u4E00-\\u9FA5]{2,4}$");
}

function mailboxCheck() {
    regularJudege(this, "^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\\.[a-zA-Z0-9_-])+");
}

function phoneCheck() {
    regularJudege(this, "^[1][3,4,5,7,8][0-9]{9}$");
}

function regularJudege(e, rString) {
    var sign = rString;
    var reg = new RegExp(sign, "ig");
    if (reg.test(e.value)) {
        e.style.borderColor = "green";
        hiddenBox.style.display = "none";
    } else {
        e.style.borderColor = "red";
        hiddenBox.style.display = "block";
        hiddenBox.innerHTML = "输入不合法，请重新输入";
    }
}

function pwdLevel() {
    if (/^\d+$/.test(this.value) || /^[a-zA-Z]+$/.test(this.value)) {
        pwd_level.children[0].style.background = "red";
        pwd_level.children[1].style.background = "white";
        pwd_level.children[2].style.background = "white";
    } else if (/[^0-9a-zA-Z]+/.test(this.value)) {
        pwd_level.children[0].style.background = "red";
        pwd_level.children[1].style.background = "orange";
        pwd_level.children[2].style.background = "green";
    } else if (this.value != "") {
        pwd_level.children[0].style.background = "red";
        pwd_level.children[1].style.background = "orange";
        pwd_level.children[2].style.background = "white";
    } else {
        pwd_level.children[0].style.background = "white";
        pwd_level.children[1].style.background = "white";
        pwd_level.children[2].style.background = "white";
    }
}

function randomVerifyNumber() {
    randomVerifyCode.value = parseInt(Math.random() * 9000 + 1000);
}