/**
 * @move        运动函数        元素，终点值，'属性值'
 * @delegate    事件委托        功能函数，事件对象，父节点
 * @validata    正则注册验证    数据
*/
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
        remind: [
            '有被盗风险,建议使用字母、数字和符号两种及以上组合',
            '安全强度适中，可以使用三种以上的组合来提高安全强度',
            '你的密码很安全',
        ],
    },
    'email': {
        input: email,
        tipEle: emailTip,
        regList: [
            {
                reg: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9a-z]{2,9}\.[a-z]{2,6}(\.[a-z]{2,3})?$/i,
                bool: true,
                tip: '邮箱格式错误',
            },
        ],
    },

};
function move(eleNode, endPoint, attr) {//运动函数  元素，终点值，'属性值'
    var g = getComputedStyle;//获取元素css样式
    clearInterval(eleNode.timer);//格式化
    eleNode.timer = setInterval(function () {//运动函数    下：不同属性的当前位置数据处理
        var iNow = attr === 'opacity' ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
        var speed = (endPoint - iNow) / 5;//速度取值     
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        iNow += speed;//上：速度 + 和 - 情况下的取整处理  下：不同属性的赋值处理
        eleNode.style[attr] = attr === 'opacity' ? iNow / 100 : iNow + 'px';
        iNow === endPoint ? clearInterval(eleNode.timer) : '';
    }, 50)
}//判断终止

function delegate(callback, selector, parentNode) {//事件委托   功能函数，事件对象，父节点
    return function (evt) {
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() === selector) {
            callback();
        }//toLowerCase()小写
        else {
            for (var i = 0; i < e.path.length; i++) {
                if (e.path[i].nodeName.toLowerCase() === selector) {
                    callback(); break;
                }
                if (target === (parentNode ? parentNode : document.body)) {
                    break;
                }
            }
        }
    }
}

function valiData(data) {//验证函数
    var input = data.input;//验证内容
    var tipEle = data.tipEle;//返回结果
    var regList = data.regList;//验证规则对象
    return function () {
        var show = input.parentNode;
        for (var i = 0; i < regList.length; i++) {
            var boolean = regList[i].reg.test(input.value)//正则判断
            if (regList[i].bool ? !boolean : boolean) {//boll值判断
                error(show, tipEle, regList[i].tip);//输出失败函数
                return 0;//终止
            }
        }
        if (input.type === 'password') {//密码强度提示判定
            var strength = data.strength;//正则数组
            var num = 0;
            for (var i = 0; i < strength.length; i++) {
                if (strength[i].test(input.value)) {
                    num++;
                }//符合条件num++
            };
            remind(tipEle, data.remind[num - 1]);//输出提示函数
        } else {
            remind(tipEle, '');//输出空字符的提示函数
        }
        success(show, tipEle);//全部成功则输出成功函数
    }
}
function success(show, tipEle) {//成功函数
    var index = show.className.indexOf('success');
    index === -1 ? show.className += ' success' : '';
}
function error(show, tipEle, tip) {//失败函数
    var arr = show.className.split(' '),
        index = arr.indexOf('success');
    index === -1 ? '' : arr.splice(index, 1);
    show.className = arr.join(' ');
    tipEle.style.display = 'block';
    tipEle.style.color = '#cc5';
    tipEle.innerHTML = tip;
}
function remind(tipEle, tip) {//提示函数
    tipEle.style.display = 'block';
    tipEle.style.color = '#ccc';
    tipEle.innerHTML = tip;
}
