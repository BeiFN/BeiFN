/**
 * @move            运动函数        元素eleNode，终点值，'属性值'
 * @delegate        事件委托        功能函数，事件对象，父节点
 * @validata        正则注册验证    数据对象（输入框input，提示框tipEle，验证规则regList，密码强度strength，密码提示remind）
 * @MsTime          倒计时          显示元素：时分秒   终止时间：年月日时分
 *  
*/

//运动函数          元素，终点值，'属性值' 速度取值
function move(eleNode, endPoint, attr, spd) {
    var g = getComputedStyle;//获取元素css样式
    clearInterval(eleNode.timer);//格式化
    eleNode.timer = setInterval(function () {//运动函数    下：不同属性的当前位置数据处理
        var iNow = attr === 'opacity' ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
        var speed = (endPoint - iNow) / spd;//速度取值     
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        iNow += speed;//上：速度 + 和 - 情况下的取整处理  下：不同属性的赋值处理
        eleNode.style[attr] = attr === 'opacity' ? iNow / 100 : iNow + 'px';
        iNow === parseInt(endPoint) ? clearInterval(eleNode.timer) : '';
    }, 50)
}//判断终止

//事件委托          功能函数，事件对象，父节点
function delegate(callback, selector, parentNode) {
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

// 正则注册验证    数据对象（输入框input，提示框tipEle，验证规则regList，密码强度strength，密码提示remind）
+function () {
    //验证函数
    function valiData(data) {
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
    //成功函数
    function success(show, tipEle) {
        var index = show.className.indexOf('success');
        index === -1 ? show.className += ' success' : '';
    }
    //失败函数
    function error(show, tipEle, tip) {
        var arr = show.className.split(' '),
            index = arr.indexOf('success');
        index === -1 ? '' : arr.splice(index, 1);
        show.className = arr.join(' ');
        tipEle.style.display = 'block';
        tipEle.style.color = '#cc5';
        tipEle.innerHTML = tip;
    }
    //提示函数
    function remind(tipEle, tip) {
        tipEle.style.display = 'block';
        tipEle.style.color = '#ccc';
        tipEle.innerHTML = tip;
    }
}();

// 倒计时          年月日时分
function MsTime(hr, mt, sd, edyr, edmth, eddt, edhr, edmt) {
    this.end = new Date(edyr, edmth - 1, eddt, edhr, edmt, 0).getTime();
    this.show(hr, mt, sd)();
    this.continue(hr, mt, sd);
}
MsTime.prototype.show = function (hr, mt, sd) {
    return () => {
        this.now = Date.now();
        this.reduce = this.end - this.now;
        this.hr = parseInt(this.reduce / 1000 / 3600);
        this.mt = parseInt(this.reduce / 1000 / 60 % 60);
        this.sd = parseInt(this.reduce / 1000 % 60);
        hr.innerHTML = this.hr < 10 ? '0' + this.hr : this.hr;
        mt.innerHTML = this.mt < 10 ? '0' + this.mt : this.mt;
        sd.innerHTML = this.sd < 10 ? '0' + this.sd : this.sd;
    }
}
MsTime.prototype.continue = function (hr, mt, sd) {
    this.timer = setInterval(this.show(hr, mt, sd), 1000);
}



