+function () {
    
    var name = document.getElementById('name'),
        pwd = document.getElementById('pwd'),
        again = document.getElementById('again'),
        email = document.getElementById('email'),
        // nameTip = document.getElementById('nameTip'),
        // pwdTip = document.getElementById('pwdTip'),
        // emailTip = document.getElementById('emailTip'),
        againTip = document.getElementById('againTip');

    // 绑定事件
    name.addEventListener('blur', verification.bind(name,usernameRule));
    pwd.addEventListener('blur', verification.bind(pwd,passwordRule));
    pwd.addEventListener('blur', pwdAgain);
    again.addEventListener('blur', pwdAgain);
    email.addEventListener('blur', verification.bind(email,emailRule));
    // 正则验证
    function verification(rule) {
        var item=this.parentElement;
        var tip=item.nextElementSibling.children[0];
        tip.style.display = 'block';
        tip.style.color = '#cc5';
        if (rule(this, (text,num)=>{tip.innerHTML=text;})) {
            var index = item.className.indexOf('success');
            index === -1 ? item.className += ' success' : '';
        } else {
            var arr = item.className.split(' '),
                index = arr.indexOf('success');
            index === -1 ? '' : arr.splice(index, 1);
            item.className = arr.join(' ');
        }
    }
    // 密码二次验证
    function pwdAgain() {
        if (again.value === '') {
            againTip.innerHTML = '请再次输入密码';
            againTip.style.display = 'block';
        } else {
            if (again.value === pwd.value) {
                var index = again.parentElement.className.indexOf('success');
                index === -1 ? again.parentElement.className += ' success' : '';
                againTip.innerHTML = '';
            } else {
                var arr = again.parentElement.className.split(' '),
                    index = arr.indexOf('success');
                index === -1 ? '' : arr.splice(index, 1);
                again.parentElement.className = arr.join(' ');
                againTip.style.display = 'block';
                againTip.style.color = '#cc5';
                againTip.innerHTML = '两次密码输入不一致';
            }
        }
    }
}();