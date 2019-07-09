/**
 * 一些基本方法的js
 * author:emb
 * date:2019.6.12
 * v 0.0.1
 */
console.log("base-js File loaded!");

/**
 *
 *
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
    return min + Math.round(Math.random() * (max - min));
}





// 格式化生成验证码  A 代表大写字母 随机生成数字，并转化层所对应Ascll 码对应的随机字母，根据字母和数字的范围来生成
// 合并了randomNumber 方法
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
 * @param {*执行次数} count
 * @param [可选 执行间隔 (毫秒)] Interval
 * @returns 返回当前的计时器对象
 */
function Timer(handler, count) {
    var time_count = count;
    var time_Interval = 1000;
    arguments.length > 2 && arguments[2] > 0 && arguments[2] > 0 ? time_Interval = arguments[2] : time_Interval = 1000;
    var timer_id = setInterval(function () {
        if (time_count === 0) {
            clearInterval(timer_id);
        } else {
            handler(time_count, time_Interval);
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
 * 扩展的选择器方法 |仿 JQ
 * @param {选择符*String} selecter
 * @returns 返回选中的元素对象或者元素的集合
 */
function $(selecter) {
    var ele = null; //待返回的对象
    return (ele = document.querySelectorAll(selecter)).length === 1 ? ele[0] : ele;
    //如果查找出元素的个数是1个那么，就返回匹配的选择符的伪数组的第一个，否则就返回全部
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
var p = createElement({
    tagName: "p"
});

// p.attr("id", "d2");
// console.dir(p.attr("id"));



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