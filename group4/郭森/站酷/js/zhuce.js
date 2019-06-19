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
    name.addEventListener('blur', verification.bind(name, usernameRule));
    pwd.addEventListener('blur', verification.bind(pwd, passwordRule));
    email.addEventListener('blur', verification.bind(email, emailRule));
    pwd.addEventListener('blur', verification.bind(again, againRule));
    again.addEventListener('blur', verification.bind(again, againRule));
    // 正则验证
    function verification(rule) {
        var iptBox = this.parentElement;
        var tipEle = iptBox.nextElementSibling.children[0];
        tipEle.style.display = 'block';
        if (rule(this, (text, num) => { tipEle.innerHTML = text; })) {
            var index = iptBox.className.indexOf('success');
            index === -1 ? iptBox.className += ' success' : '';
            tipEle.style.color = '#ccc';
        } else {
            var classNameArr = iptBox.className.split(' '),
                index = classNameArr.indexOf('success');
            index === -1 ? '' : classNameArr.splice(index, 1);
            iptBox.className = classNameArr.join(' ');
            tipEle.style.color = '#cc5';
        }
    }
    // 密码二次验证规则
    function againRule(input, callback) {
        if (!pwd.value) {
            return false;
        }
        if (input.value === pwd.value) {
            return true;
        } else {
            callback('两次密码输入不一致');
            return false;
        }
    }
}();