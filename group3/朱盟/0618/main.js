// 倒计时

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


// 根据封装的计时器 制作的倒计时程序

function handler(count) {
    console.log("还剩下:" + parseInt(count / 60) + "分" + count % 60 + "秒");
}
// Timer(handler, 100); //执行一次



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





// 答案var total = 3600;
// 答案var t = setInterval(function(){
// 答案    total--;
// 答案    if(total == 0){
// 答案        clearInterval(t);
// 答案        return;
// 答案    }
// 答案    console.log( formatNumber(parseInt(total/60)) , formatNumber(total%60) );
// 答案}, 100);


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


//Task2  数码时钟

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

function clockHandler() {
    //封装计时器
    Timer(function () {
        box.innerHTML = GetTime().toString("宝宝 时钟提示您 <br/>现在是：<br/>Y年M月D日 <br/>周W<br/>  h时m分s秒 ", true);
    }, -1);

}

clockHandler();





// setInterval(function(){
//     var now = new Date();
//     var hour = now.getHours();
//     var min = now.getMinutes();
//     var sec = now.getSeconds();

//     var n1 = parseInt(hour/10);
//     var n2 = hour%10;
//     var n3 = parseInt(min/10);
//     var n4 = min%10;
//     var n5 = parseInt(sec/10);
//     var n6 = sec%10;

//     var imgs = document.getElementsByTagName("img");
//     imgs[0].src = "img/"+n1+".png";
//     imgs[1].src = "img/"+n2+".png";
//     imgs[2].src = "img/"+n3+".png";
//     imgs[3].src = "img/"+n4+".png";
//     imgs[4].src = "img/"+n5+".png";
//     imgs[5].src = "img/"+n6+".png";
//     //console.log(n1,n2,n3,n4,n5,n6);
// }, 1000);


// 进度条

var pbar = Timer(function (count) {
    var str = 100 - (count - 1);
    progressing.style.width = str + "%";
    var i = Number(str);
    if (i<80) {
        alertAd("加载中" + str + "%" + "... 嗨起来了！");
    } else if(i<100&&i>=80){
        alertAd("...再见了，我会想你的");
        ad.style.width=50+(100-i)+"%";
        ad.style.height=50+(100-i)+"%";
    }else{
        ad.style.display="none";
        adclose.style.display="none";
        progressBar.style.display="none";
    }
    console.log(str + "%");
}, 100, 100);






// 答案window.onload = function(){
// 答案    var num = 5;
// 答案    var div = document.getElementById("ad");
// 答案    var t = setInterval(function(){
// 答案        if(num == 0) {
// 答案            clearInterval(t);
// 答案            div.style.display = "none";
// 答案            return;
// 答案        }
// 答案        div.children[0].innerHTML = --num;
// 答案    },1000);
// 答案}

// 广告弹出窗

function alertAd(str) {
    ad.innerHTML = str;
}

adclose.onclick=function(){
    ad.style.display="none";
    adclose.style.display="none";
    progressBar.style.display="none";
    clearTimeout(pbar);
}


// window.onload = function(){
//     var fdiv = document.getElementById("filldiv");
//     var percent = document.getElementById("percent");
//     var timer = setInterval(function(){
//         fdiv.style.width = parseInt(getStyle(fdiv,"width") ) + 1 + "px";
//         if(fdiv.style.width == "200px") {
//             clearInterval(timer);
//         }
//     },50);
// }

// 顶部悬浮
// API 参考
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onscroll

// window.onscroll = function(){
//     var div2 = document.getElementById("div2");
//     var _top = document.body.scrollTop || document.documentElement.scrollTop;
//     if(_top > 400) {
//         div2.style.position = "fixed";
//         div2.style.top = "0px";
//     } else {
//         div2.style.position = "absolute";
//         div2.style.top = "400px";
//     }
// }

// var boxh= box.style.height; +"box h:"+boxh
window.onscroll=function(){
    // clearInterval(pbar);
    var x=window.pageXOffset;
    var y=window.pageYOffset;
    console.log("检测到页面滚动事件:"+window.pageXOffset+" "+window.pageYOffset );
    ad.style.top=y+"px";
    
    
}



// 回到顶部

// window.onscroll = function(){
//     var backBtn = document.getElementById("backTop");
//     backBtn.onclick = function(){
//         //将滚动距离设为0，则回到顶部
//         document.documentElement.scrollTop = document.body.scrollTop = 0;
//     }
//     //计算滚动的距离
//     var _top = document.documentElement.scrollTop + document.body.scrollTop;
//     //if(距离 > 1000) 显示回到顶部的按钮
//     if(_top > 1000) {
//         backBtn.style.display = "block";
//     } else {
//         backBtn.style.display = "none";
//     }
// }