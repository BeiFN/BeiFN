/****EMB 原生JS优化与基本工具方法
 *  Author:EMB
 *  Date:2019.6.12       
 *  Now Version:V:D-0.0.4
 * 
 *  Description:
 * ----------------------------↓
 *      Function:
 *      -------------------↓
 *  
 *      -------------------↑
 * 
 *      Update Description:
 *      ------------------↓
 *      v 0.0.1 基础 对象类库 随机颜色，随机字符，Timer 倒数计时器 ，及（本人认为的）万能的时间处理方法 getTime ，padInt补全
 *      v 0.0.2 加入 Dom 操作  .html() .text() creatElement(), attr() , 根据元素Key ：val 删除数组中对象的 delEleArray，.show, .hide()
 *      v 0.0.3 加入 Event Delegation  事件监听 并实现方法On 加入原生的 apply 实现的ibind 方法 实 现定参数 柯里化
 *      v 0.0.4 加入appendTo方法，简化DOM 插入操作，修改classRemove 的移除代码，更加简化。
 * 
 *      -------------------↑
 * 
 *      Version Initials:
 *      ------------------↓
 *      V:D->Developer
 *      V:B->Bate   
 *      V:R->Release   
 *      ------------------↑
 * ---------------------------↑
 */




/**
 * @returns rgba string
 */
function randomRgb() {
    return "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
}

/**
 *
 *
 * @returns rgb string
 */
function randomRgba() {
    return "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.random().toFixed(2) + ")";
}

/**
 *随机数的生成
 *
 * @param {最小范围*} min
 * @param {*最大范围} max
 * @returns
 */
function randomNumber(min, max) {
    if (arguments.length === 1) {
        max = min;
        min = 0;
    }
    return min + Math.round(Math.random() * (max - min));
}





// 格式化生成验证码  A 代表大写字母 随机生成数字，并转化层所对应Ascll 码对应的随机字母，根据字母和数字的范围来生成
// 合并了randomNumber 方法
/**
 *随机字符生成器
 * @param {表达式* A 大写字母 a 小写字母 0 数字}  express:"A-A"= return "Q-F"
 * @param {max 最大值 ，此参数填写时 此函数变成随机数字生成器 第一个参数为最小值* Number} max
 * @returns 随机生成格式化的字符串
 */
function randomChars(express, max) {
    var str = "";
    if (arguments.length > 1) {
        return randomNumber(express, max);
    }

    function randomNumber(min, max) {
        return min + Math.round(Math.random() * (max - min));
    }

    function randomChar(o) {
        // 单字符生成
        switch (o) {
            case "a":
                return String.fromCharCode(randomNumber(97, 122));
                break;
            case "A":
                return String.fromCharCode(randomNumber(65, 90));
                break;
                break;
            case "0":
                return String.fromCharCode(randomNumber(48, 57));
                break;

            default:
                return o;
                break;
        }
    }

    for (const key in express) {
        if (express[key - 1] === "\\") {
            str += express[key];
        } else if (express[key] !== "\\") {
            str += randomChar(express[key]);
        }
    }
    return str;
}


// console.log(randomChars("\A-aa-0000"));

/**
 *计时器 EMB|吃火星的宝宝|朱盟
 *
 * @param {*执行函数} handler(count（当前句柄的执行次数）,Interval（当前句柄的执行间隔）) 
 * @param {*执行次数} count  空值默认执行1次
 * @param [可选 执行间隔 (毫秒)] Interval
 * @param [可选] function 计时结束执行器 ,暂未实现
 * @param [可选] o 计时执行对象 ,暂未实现
 * @returns 返回当前的计时器对象 
 */
function Timer(handler, count, o) {
    var time_count = count;
    var time_Interval = 1000;
    // console.log(count);
    count ? "" : time_count = 1;
    arguments.length > 2 && arguments[2] > 0 ? time_Interval = arguments[2] : time_Interval = 1000;
    // console.log(arguments);
    var timer_id = setInterval(function () {
        if (time_count === 0) {
            clearInterval(timer_id);
            // arguments[3]();
            timer_id = null;
        } else {
            handler(time_count, time_Interval, o);
            time_count--;
        }

    }, time_Interval);
    return timer_id;
}
/**
 * 
 * Test Demo 
 * function handler(count) {
 * console.log(count);
 * }
 * Timer(handler,1); //执行一次
 * Timer(handler,1,100); //执行一次 间隔100
 * Timer(handler,-1,100); //无限次执行
 */


/**
 *数字字符串补齐函数
 *
 * @param {* 数字字符串} number
 * @param {* 补齐的位数} o
 * @returns 返回补齐结果 
 */
function padInt(number, o) {
    o = o > 0 ? o : 1;
    var z = "0";
    number = parseInt(number).toString(10);
    z = arguments.length > 2 ? arguments[2] : "0";
    for (var i = 1; i <= o; i++) {
        if (number < Math.pow(10, i - 1)) { //如果
            number = z + "" + number;
        }
    }
    console.log(number);
    return number;
}

// padInt(232, 6);



/**
 *万能时间格式化函数 |emb|朱盟
 *
 *toString() 表达式解析 “ Y-M-D”="2019-6-8" "h-m-s"="小时 分钟 秒 " 
 * GetTime() 设置时间 传入对象 {y:2019,...}
 * @returns 返回对象，包括时间各个形式，及toString 表达式格式化！
 */
function GetTime(dateObj) {
    var time = new Date();
    var time_Symbol = 0;
    if (dateObj) {
        "y" in dateObj ? time.setFullYear(dateObj.y) : "";
        "m" in dateObj ? time.setMonth(dateObj.m - 1) : "";
        "d" in dateObj ? time.setDate(dateObj.d) : "";
        "w" in dateObj ? time.setDay(dateObj.w) : "";
        "h" in dateObj ? time.setHours(dateObj.h) : "";
        "mm" in dateObj ? time.setMinutes(dateObj.mm) : "";
        "s" in dateObj ? time.setSeconds(dateObj.s) : "";
        "i" in dateObj ? time.setMilliseconds(dateObj.i) : "";
    }

    var
        year = time.getFullYear(),
        month = time.getMonth() + 1,
        day = time.getDate(),
        week = time.getDay(),
        hour = time.getHours(),
        minutes = time.getMinutes(),
        seconds = time.getSeconds(),
        msecond = time.getMilliseconds();
    time_Symbol = time.getTime();

    function expressParse(express, isPad) {
        switch (express) {
            case "Y":
                return year
            case "y":
                return year
            case "M":
                return isPad ? (month < 10 ? "0" + month : month) : month
            case "D":
                return isPad ? (day < 10 ? "0" + day : day) : day
            case "d":
                return isPad ? (day < 10 ? "0" + day : day) : day
            case "h":
                return isPad ? (hour < 10 ? "0" + hour : hour) : hour
            case "H":
                return isPad ? (hour < 10 ? "0" + hour : hour) : hour
            case "m":
                return isPad ? (minutes < 10 ? "0" + minutes : minutes) : minutes
            case "s":
                return isPad ? (seconds < 10 ? "0" + seconds : seconds) : seconds
            case "S":
                return isPad ? (seconds < 10 ? "0" + seconds : seconds) : seconds
            case "i":
                var i = msecond;
                if (i < 10) {
                    i = "00" + i;
                } else if (i < 99 && i >= 10) {
                    i = "0" + i;
                }
                return isPad ? i : msecond
            case "w":
                return isPad ? (week < 10 ? "0" + week : week) : week
            case "W":
                return isPad ? (week < 10 ? "0" + week : week) : week
            default:
                return express;
        }
    }
    return {
        y: year,
        m: month,
        d: day,
        h: hour,
        mm: minutes,
        s: seconds,
        ms: msecond,
        w: week,
        timeSymbol: time_Symbol,
        timeArrayYMD: [year, month, day],
        timeArrayHMS: [hour, minutes, seconds],
        timeExpressParse: expressParse,
        /**
         * emb|目的，希望能格式化字符串
         *时间字符串格式化
         *
         * @param {*} express
         */
        toString: function (express, isPad) {
            var expressArrays = express.split("");
            var strFormat = "";
            for (const i in expressArrays) {
                strFormat += expressParse(expressArrays[i], isPad);
            }
            return strFormat;
        }
    }
}


// console.log(GetTime());
// console.log(GetTime().toString("y-M-d h:m:s:i", true)); //现在时间
// console.log(GetTime({y:2017,m:3}).toString("y-M-d h:m:s:i", true));//设置的时间



/**
 * 
 * @param {遍历*Array} arry 
 * @param {对象属性*string} key 
 * @param {属性值*} val 
 */
function delEleArray(arry, key, val) {
    for (var i = 0, item; item = arry[i++];) {
        if (item[key] === val) {
            return arry.splice(i - 1, 1);
        }
    }
}




/**
 *
 * 扩展的选择器方法 |仿 JQ
 * @param {选择符*String} selecter
 * @returns 返回选中的元素对象或者元素的集合
 */
function $(selecter) {
    var ele = null; //待返回的对象
    return (ele = document.querySelectorAll(selecter)).length === 1 ? ele[0] : ele;
    //如果查找出元素的个数是1个那么，就返回匹配的选择符的伪数组的第一个，否则就返回全部
}

Node.prototype.$ = function (selector) {
    var e = null;
    return (e = this.querySelectorAll(selector)).length === 1 ? e[0] : e;
}

//获取元素发宽高的原生封装
Node.prototype.getSize = function () {
    return {
        w: parseInt(getComputedStyle(this)["width"]),
        h: parseInt(getComputedStyle(this)["height"])
    }
}
//获取元素页面的绝对位置 的原生封装
Node.prototype.getAbsPosition = function () {
    var position = {
        left: this.offsetLeft,
        top: this.offsetTop
    }
    if (this.offsetParent === document.body) {
        return position;
    } else {
        var pos = this.offsetParent.getAbsPosition()
        return {
            left: this.offsetLeft + pos.left,
            top: this.offsetTop + pos.top
        }
    }
}


/**
 *元素创建
 *
 * @param {
 * {
 * tagName:""*string
 * attr:{}//*object
 * html:""// content* string
 * children:[] 子元素集合
 * } *object} object
 * @returns 创建的元素
 */
function createElement(object) {
    typeof object === "undefine" ? object = {} : ""; // 如果传进去的参数是undefine 那么赋值空对象
    object.tagName ? "" : object.tagName = "div";
    //如果对象tagName是空，那么给他默认值为div
    var ele = document.createElement(object.tagName);


    object.attr ? "" : object.attr = {};
    object.value ? (object.attr.value = object.value) : "";
    object.id ? (object.attr.id = object.id) : "";
    object.title ? (object.attr.title = object.title) : "";
    object.style ? (object.attr.style = object.style) : "";
    object.name ? (object.attr.name = object.name) : "";
    object.type ? (object.attr.type = object.type) : "";
    object.class ? (object.attr.class = object.class) : "";
    //创建对象
    for (const key in object.attr) {
        ele.setAttribute(key, object.attr[key]);
    }
    // 遍历DOM元素的属性和属性值并添加到元素
    ele.innerHTML = object.html ? object.html : "";
    //添加元素的内容 HTML
    for (var i = 0, item; object.children && (item = object.children[i++]);) {
        //在子元素列表拥有的情况才进行遍历
        item.nodeType === 1 ? ele.appendChild(item) : ele.appendChild(createElement(item));
        //如果元素的节点类型为 元素对象 那么就给他添加到 创建的元素中，否则就给他先创建后再添加到创建的元素中。
    }
    return ele;
}


// console.dir(); 原型方法的封装 
Element.prototype.attr = function attr(key, val) {
    if (arguments.length > 1) //如果值为2个 则为设置
    {
        return this.setAttribute(key, val);
    } else {
        return this.getAttribute(key); //如果值为1个 则为获取
    }
}
Node.prototype.attrs = function (key, val) {
    key ? (key = key) : (key = ".");
    var attrReg = new RegExp(key, "i");
    var attrs = [];
    var isSet = arguments.length <= 1 ? false : true;
    [].slice.call(this.attributes).forEach(element => {
        // console.log(element.name, element.value);
        if (attrReg.test(element.name)) {
            // console.log(1);
            attrs.push(element);
            isSet ? this.attr(element.name, val) : "";
        }
    });
    return attrs;
}

Element.prototype.html = function (html) {
    if (!arguments[0]) return this.innerHTML;
    this.innerHTML = html;
}
Element.prototype.text = function (txt) {
    if (!arguments[0]) return this.innerText;
    this.innerText = txt;
}
Element.prototype.val = function (val) {
    if (!arguments[0]) return this.value;
    this.value = val;
}
Element.prototype.hide = function () {
    this.style.display = "none";
}
Element.prototype.show = function () {
    this.style.display = "block";
}

// 
/**
 * 元素的 样式类添加  
 *
 * @param{className 类名}
 * @param{ notJudge 是否判断存在 可否进行重复添加 }
 * @returns undefine
 */
Node.prototype.classAdd = function (className, notJudge) {
    var hasClassReg = new RegExp(className, "g")
    var isNotJudge = false;
    notJudge ? isNotJudge = notJudge : "";
    if (isNotJudge) {
        this.className += (" " + className);
    } else {
        hasClassReg.test(this.className) ? this.className = this.className.replace(hasClassReg, className) : this.className += (" " + className);
    }
}

/**
 * 元素的 样式类删除
 */
Node.prototype.classRemove = function (className) {
    return this.className = this.className.replace(new RegExp("\S?" + className), "");
}
Node.prototype.appendTo = function (selector) {
    var element = selector.nodeType === 1 ? selector : $(selector);
    element.appendChild(this);
    return this;
}


// 事件绑定的封装 可选冒泡
Node.prototype.onIscapture = function (eventType, handler, isCapture) {
    arguments.length > 2 && isCapture ? "" : isCapture = false;
    if (this.addEventListener) {
        this.addEventListener(eventType, handler, isCapture);
    } else if (this.attachEvent) {
        this.attachEvent(eventType, handler);
    } else {
        this["on" + eventType] = handler;
    }
}


// on 的更新 加入事件委托机制
/**
 * 事件的绑定与委托
 *
 * @param{ eventType 事件类型}
 * @param{ handler 执行句柄}
 * @param{ targetSelector 选择器->绑定的执行目标 }
 * @returns undefine
 */
Node.prototype.on = function (eventType, handler, targetSelector) {
    // console.log("on");
    if (this.addEventListener) {
        arguments.length > 2 && targetSelector ? this.addEventListener(eventType, delegation(handler, targetSelector)) :
            this.addEventListener(eventType, handler);
    } else if (this.attachEvent) {
        this.attachEvent(eventType, handler);
    } else {
        this["on" + eventType] = handler;
    }
}

// 事件移除的封装
Node.prototype.off = function (eventType, handler) {
    if (this.removeEventListener) {
        this.removeEventListener(eventType, handler);
    } else if (this.detachEvent) {
        this.detachEvent(eventType, handler);
    } else {
        this["on" + eventType] = null;
    }
}


// 事件的委托的实现
function delegation(executeHandler, targetSelector) {
    return function (ev) { // 我本人认为第一步应先给监听事件要的东西， 就是执行事件对吧？
        // 这个函数被作为传进去的执行者，那么他是不是接受了事件对象？嘿嘿
        var e = ev || window.event; // 获取到了事件对象
        // 获取当前捕获元素
        var captureElemet = e.target || e.srcElement;
        //获取要执行的目标元素
        var targetElemets = this.querySelectorAll(targetSelector);
        var targetFamilay = [] //抓住一家子
        var _targetemp = captureElemet;
        while (true) {
            if (_targetemp === this) break;
            //如果是找到的父元素 放弃寻找
            targetFamilay.push(_targetemp);
            _targetemp = _targetemp.parentNode
        }
        if (!targetFamilay.length) return false;
        // console.log(captureElemet, this);
        // 那是不是 执行目标和捕获目标相同 就执行就好了？
        // 但是我们的目标元素不是一堆啊? 那是不是得一一辨认？
        for (var i = 0, targetItem; targetItem = targetElemets[i++];) {
            if (targetFamilay.length === 1 ? captureElemet == targetItem : targetFamilay.indexOf(targetItem) !== -1) { // 如果是这个目标 那就杠
                executeHandler.call(targetItem, e);
                //执行事务 ,并把执行事务 的参数给人家句柄 
                //指向执行的人，事件对象给执行句柄
            }
        }

    }
}


// 删除对象中的某个值




// 复制对象中的属性和值及覆盖到目标类 覆盖
/***
 * 
 * @function extend
 * 
 */
function extend(o, object) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            o[key] = object[key];
        }
        return o;
    }
}

// 如果目标对象有相同名字的属性，不进行覆盖
function merge(o, p) {
    for (const key in p) {
        if (object.hasOwnProperty(key)) {
            if (o.hasOwnProperty[key]) continue;
            o[key] = object[key];
        }
    }
    return o;
}


//目标对象存在和选择对象不同的属性，删除之  像接口
function restrict(o, p) {
    for (const key in o) {
        if (key in p) {
            delete o[key];
        }
    }
    return o;
}

// 如果o中存在P的属性，删除之
function substract(o, p) {
    for (const key in p) {
        delete o[key];
    }
}

//返回新的对象 这个对象同时拥有参数对象中的属性 同名会覆盖 ；
function union() {
    var o = {};
    for (const key in arguments) {
        extend(o, arguments[key]);
    }
    return o;
}


// 对象属性 求交集
function intersection() {
    var o = arguments[0];
    for (const key in arguments) {
        if (key == arguments.length) continue;
        o = restrict(o, arguments[key + 1]);
    }
    return o;
}

console.log("base-js File loaded!");