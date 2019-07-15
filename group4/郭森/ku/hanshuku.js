/**
 * @$$                   jQuery选择器           元素名 
 * 
 * @on                   事件绑定               dom,evt,fn,selector(事件委托)
 * 
 * @off                  移除事件绑定           dom,evt,fn
 * 
 * @getAbsOffset         获取元素页面定位        dom
 * 
 * @move                 缓冲运动框架            运动元素，属性对象 {属性：终点值}，*回调函数   *可选：属性对象 {属性：[终点值，速度 =6(倒数)]}                          
 * 
 * @delegate             事件委托               回调函数，事件元素名
 * 
 * @usernameRule         账号验证               输入框，回调函数(bool，tip), *验证规则[{reg,bool,tip}] 京东
 * @passwordRule         密码验证               输入框，回调函数(bool，tip，密码强度1-3), *验证规则[{reg,bool,tip}]，*密码强度{streng:[],tip:[]}}
 * @emailRule            邮箱验证               输入框，回调函数(bool，tip), *验证规则[{reg,bool,tip}]         
 *  
 * @MsTime               倒计时                 显示的元素：时，分，秒，终止时间：年，月，日，时，分
 * 
 * @randomColor          随机颜色               无    *可选：透明度 =随机数（.5~1）
 * 
 * @xhrGet               xhr发送GET请求         xhrGet(url[,data],callback)，路径，对象，回调函数
 * 
 * @xhrPost              xhr发送Post请求 
 * 
 * @lazyload             懒加载                 图片元素名
 * 
 * @cookie               设置cookie             cookie(key,value,options)
 * 
 * @removeCookie         删除cookie             removeCookie(key,options)
 * 
 * @getCookie            获取cookie             getCookie(key)
 * 
 * @jsonp                jsonp跨域              路径，回调函数，data数据
 * 
 * @getSearchValue       百度搜索提示词          搜索框，提示框
*/

var gs = getComputedStyle;

// query选择器
function $$(ele) {
    var res = document.querySelectorAll(ele);
    return res.length === 1 ? res[0] : res;
}
// 事件绑定
function on(dom,evetType,callback,selector){
    if(dom.addEventListener){
          if(arguments.length === 4 && typeof arguments[3] === "string" ){
                dom.addEventListener(evetType , delegate( callback , selector ));
          }else{
                dom.addEventListener(evetType , callback);
          }
    }else if(dom.attachEvent){
          dom.attachEvent("on" + eventType, callback);
    }else{
          dom["on" + eventType] = callback;
    }
}
// 移除事件绑定
function off(ele,event_type,event_callback){
    return ele.removeEventListener(event_type, event_callback);
}
// 获取元素页面定位
function getAbsOffset(dom) {
    var res = {
          "left":dom.offsetLeft,
          "top" :dom.offsetTop
    };
    for (; (dom = dom.parentNode) !== document.body;) {
          res.left += dom.offsetLeft;
          res.top += dom.offsetTop;
    }
    return res
}
// 运动函数框架     运动元素，属性对象{属性：终点值}，回调函数
function move(eleNode, data, callback = () => { }, ) {
    //运动函数数据初始化
    clearInterval(eleNode.timer);//格式化：关闭存在的定时器
    eleNode.timer = setInterval(function () {//运动函数数据整理    
        var num = 0;
        for (var attr in data) {// 遍历属性
            num++;// 计算执行的属性个数
            let endPoint = data[attr].length == 2 ? data[attr][0] : data[attr],
                spd = data[attr].length == 2 ? data[attr][1] : undefined,
                result = attrToendPoint(eleNode, attr, endPoint, spd);
            if (result) {           // 当前属性执行完成后（参见39行）
                delete data[attr];// 删除
            }
        }
        if (num === 0) {// 执行的属性个数为0时终止
            clearInterval(eleNode.timer);// 关闭定时器
            callback();// 回调函数 
            move.timerList.splice(move.timerList.indexOf(eleNode.timer), 1);
        }
    }, 50)
    move.timerList instanceof Array ? move.timerList.push(eleNode.timer) : move.timerList = [eleNode.timer];
}
//运动函数    运动元素，属性，终点值,?速度=6
function attrToendPoint(eleNode, attr, endPoint, spd = 6) {
    var g = getComputedStyle;//获取元素css属性样式  iNow：当前位置  speed：速度
    var iNow = attr === 'opacity' ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
    var speed = (endPoint - iNow) / spd;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    iNow += speed;//上：速度 + 和 - 情况下的取整处理  下：不同属性的赋值处理
    eleNode.style[attr] = attr === 'opacity' ? iNow / 100 : iNow + 'px';
    return iNow === endPoint;//到达终点返回true
}
//事件委托          功能函数，事件对象名
function delegate(callback, selector) {
    return function (evt) {
        var e = evt || window.event,
            target = e.target || e.srcElement,
            eleList = [].slice.call(document.querySelectorAll(selector)),
            ele = null;
        while (target !== this) {
            if (ele = eleList[eleList.indexOf(target)]) {
                callback.call(ele, e);
                break;
            }
            target = target.parentNode;
        }
    }
}
// 正则注册验证    （输入框input，回调函数callback，*验证规则regList，*密码强度规则strength）
// 账号验证函数
function usernameRule(input, callback, regList) {
    var res = null;
    if (!regList) {
        regList = [
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
        ]
    }
    res = valiData(input, callback, regList);
    res ? callback("") : "";
    return res;
}
// 密码验证函数
function passwordRule(input, callback, regList, strengthReg) {
    var res = null;
    if (!regList) {
        regList = [
            {
                reg: /^.{6,20}$/,
                bool: true,
                tip: '长度只能在6-20个字符之间',
            },
        ]
    }
    if (!strengthReg) {
        strengthReg = {
            strength: [
                /\d/,
                /[a-zA-Z]/,
                /[\!\@\#\$\%\^]/,
            ],
            remind: [
                '有被盗风险,建议使用字母、数字和符号两种及以上组合',
                '安全强度适中，可以使用三种以上的组合来提高安全强度',
                '您的密码很安全',
            ],
        }
    }
    res = valiData(input, callback, regList);
    res ? valiStrenth(input, callback, strengthReg) : "";//密码强度提示判定
    return res;
}
// 邮箱验证函数
function emailRule(input, callback, regList) {
    var res = null;
    if (!regList) {
        regList = [
            {
                reg: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9a-z]{2,9}\.[a-z]{2,6}(\.[a-z]{2,3})?$/i,
                bool: true,
                tip: '邮箱格式错误',
            },
        ]
    }
    res = valiData(input, callback, regList);
    res ? callback("") : "";
    return res;
}
// 验证函数
function valiData(input, callback, regList) {
    for (var i = 0; i < regList.length; i++) {
        var boolean = regList[i].reg.test(input.value)//正则判断
        if (regList[i].bool ? !boolean : boolean) {//boll值判断
            callback(regList[i].tip);//输出失败函数
            return false;//终止
        }
    }
    return true;
}
// 密码强度验证
function valiStrenth(input, callback, strengthReg) {
    var num = 0,
        str = strengthReg.strength,
        rmd = strengthReg.remind;
    for (var i = 0; i < str.length; i++) {
        if (str[i].test(input.value)) {
            num++;
        }//符合条件num++
    };
    callback(rmd[num - 1], num);//输出提示函数
}

// 倒计时          年月日时分
function MsTime(endtime) {
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
// 随机颜色 透明度=随机（.5~1）
function randomColor(opacity = 0) {
    let [r, g, b, a] = [
        100 + Math.round(Math.random() * 155),
        100 + Math.round(Math.random() * 155),
        100 + Math.round(Math.random() * 155),
        opacity === 0 ? .5 + Math.round(Math.random() * 5) / 10 : opacity
    ]
    return `rgba(${r},${g},${b},${a})`;
}
// xhr发送GET/POST请求  xhrGet/xhrPOST(url[,data],callback)，路径，对象，回调函数
function xhrGet(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        if (typeof data !== "function" && data instanceof Object) {
            let _arr = [];
            for (let key in data) {
                _arr.push(`${key}=${data[key]}`);
            }
            let _symbol = /\?/.test(url) ? "&" : "?";
            url += _symbol + _arr.join("&");
        }
        xhr.open("GET", url);
        xhr.send(null);
        xhr.onload = () => {
            xhr.status === 200 ? resolve(xhr.responseText) : '';
        }
    });
}
function xhrPost(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let _data = [];
        for (let key in data) {
            _data.push(`${key}=${data[key]}`);
        }
        xhr.send(_data.join("&"));
        xhr.onload = () => {
            xhr.status === 200 ? resolve(xhr.responseText) : reject(xhr.status);
        }
    })
}
// 懒加载   图片
let lzTimer = null;
let cHeight = document.documentElement.clientHeight;
function lazyload(selector) {
    let imgList = $$(selector, true);
    let itemArray = Array.from(imgList).map(item => {
        return {
            img: item,
            top: item.offsetTop,
            url: item.getAttribute('data-src')
        }
    })
    load(itemArray);
    document.addEventListener("scroll", load.bind(null, itemArray));
}
function load(itemArray) {
    if (lzTimer !== null) return;
    lzTimer = setTimeout(() => {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var min = scrollTop + cHeight;
        itemArray.forEach(item => {
            if (item.top < min) {
                item.img.src = item.src;
            }
        });
        lzTimer = null;
    }, 500);
}
// 设置一条cookie
function cookie(key, value, options) {
    typeof options === 'object' ? Object.assign({}, options) : options = {};
    var res = '';
    res += key + '=' + encodeURI(value);
    if (typeof options.expires === 'number') {
        var d = new Date();
        d.setDate(d.getDate() + options.expires);
        res += ';expires=' + d;
    }
    res += options.path ? ';path=' + options.path : '';
    res += options.domain ? ';domain=' + options.domain : '';
    document.cookie = res;
}
// 删除一条cookie
function removeCookie(key, options) {
    var default_options = {
        expires: -1
    }
    options = typeof options == "object" ? Object.assign(default_options, options) : default_options;
    cookie(key, null, options)
}
// 获取cookie
function getCookie(key) {
    let _cookie = document.cookie;
    let _cookie_item = _cookie.split('; ');
    let _key = [];
    let _value = _cookie_item.map(item => {
        var _temp = item.split("=");
        _key.push(_temp[0]);
        return _temp[1];
    })
    index = _key.indexOf(key);
    if (index === -1) {
        return '';
    };
    return _value[index];
}
// jsonp跨域
function jsonp(url, cb_key = "callback", data = {}) {
    return new Promise((resove, reject) => {
        let script = document.createElement("script"),
            cb_name = "gs" + Date.now();
        window[cb_name] = function (res) {
            resove(res);
        }
        url += /\?/.test(url) ? "&" : "?";
        url += cb_key + "=" + cb_name;
        for (let key in data) {
            url += `&${key}=${data[key]}`;
        }
        script.src = url;
        document.body.appendChild(script);
        script.onload = function () {
            this.remove();
        }
    })
}
// 百度搜索提示词
async function getSearchValue(input, tip) {
    let { value } = input;
    let url = "https://www.baidu.com/sugrec?prod=pc";//百度搜索接口
    let res = await jsonp(url, "cb", { wd: value });
    renderLi(res, tip);
}
function renderLi(res, tip) {
    let { g } = res;
    if (!g) return tip.innerHTML = "";
    let html = "";
    g.forEach(item => {
        html += `<li>${item.q}</li>`
    })
    tip.innerHTML = `<ul>${html}</ul>`;
}




