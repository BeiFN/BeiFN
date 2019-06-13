+function () {
    var name = document.getElementById('name'),
        pwd = document.getElementById('pwd'),
        again = document.getElementById('again'),
        email = document.getElementById('email'),
        nameTip = document.getElementById('nameTip'),
        pwdTip = document.getElementById('pwdTip'),
        againTip = document.getElementById('againTip'),
        emailTip = document.getElementById('emailTip');

    var data = {
        'name': {
            input: name,
            tipEle: nameTip,
            regList: [
                {
                    reg: /^.{4,}$/i,
                    bool: true,
                    tip: '请输入4位以上的字符',
                },
                {
                    reg: /^\d+$/i,
                    bool: false,
                    tip: '不能输入纯数字',
                },
                {
                    reg: /^[a-zA-Z\u2E80-\u9FFF\-_0-9]{4,20}$/i,
                    bool: true,
                    tip: '支持中文，英文，数字，字母，-，_的4~20位字符',
                },
            ],
        },
        'pwd': {
            input: pwd,
            tipEle: pwdTip,
            regList: [
                {
                    reg: /^.{6,20}$/,
                    bool: true,
                    tip: '长度只能在6-20个字符之间',
                },
            ],
            strength: [
                /\d/,
                /[a-zA-Z]/,
                /[\!\@\#\$\%\^]/,
            ],
            remind:[
                '有被盗风险,建议使用字母、数字和符号两种及以上组合',
                '安全强度适中，可以使用三种以上的组合来提高安全强度',
                '你的密码很安全',
            ],
        },
    };
    name.addEventListener('blur', valiData(data.name));
    pwd.addEventListener('blur', valiData(data.pwd));

}();