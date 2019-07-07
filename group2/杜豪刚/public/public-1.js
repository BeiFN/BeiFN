/**
 *  public.js 
 *  v 0.0.7  
 *  Mr.Du
 *  2019/6/13 
 *  */ 

 
/**     ①  
 * @function bgColor 
 * 作用 : 返回 rgba()字符串，随机颜色。
 */
function bgColor(){
    var r=Math.round(Math.random()*255);
    var g=Math.round(Math.random()*255);
    var b=Math.round(Math.random()*255);
    var a=Math.random().toFixed(2);
        return "rgba("+r+","+g+","+b+","+a+")";
}
"#" + Math.round(Math.random()*parseInt("ffffff",16)).toString(16).padStart(6,0);

/**     ②  
 * @param 参数一  num1
 * @param 参数二  num2
 * @param 运算符  opt
 * 作用：获取value值进行简单的运算
 */
sum.onclick=function (){
    var num1=document.getElementById("num1").value;
    var num2=document.getElementById("num2").value;
    var opt=document.getElementById("opt").value;
    var res=calculator(num1,num2,opt);
        alert(res);
}
function calculator(num1,num2,opt){
    switch(opt){
        case "+":
            return Number(num1)+Number(num2);
            break;
        case "-":
            return num1-num2;
            break;
        case "*":
            return num1*num2;
            break;
        case "/":
            return num1/num2;
            break;
        case "%":
            return num1%num2;
            break;
        default :
            return ("暂不支持运算");
    }
}

/**     ③  
 * @param {字符串str}
 * 作用：判断一个数是不是纯数字；如果是则返回true；
 */
function isNumber(str){
    return !isNaN(str);
}

/**     ④  
 * @param {数组arr}  
 * 作用：对数组arr进行去重，得到一个新的数组
 */
function noRepeat(arr){
    var temp=[];
    for(var i in arr){
        if(temp.indexOf(arr[i]) == -1){
            temp.push(arr[i]);
        }
    }
    return temp;
}

/**     ⑤  
 * @param {}  
 * 作用：事件委托函数的封装
 */
function on(dom,evetType,callback,selector){
    if(dom.addEventListener){
        if(arguments.length === 4 && typeof arguments[3] === "string" ){
            dom.addEventListener(evetType , delegation( callback , selector ));
        }else{
            dom.addEventListener(evetType , callback);
        }
    }else if(dom.attachEvent){
          dom.attachEvent("on" + eventType, callback);
    }else{
          dom["on" + eventType] = callback;
    }
}
function delegation( handlerClick , selector ){
    return function(evt){
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        var eleList = this.querySelectorAll(selector);
        var targetFamily = [];
        var _tempTarget = target;
        var count = 0;
        while(true && count ++ < 100){
            if(_tempTarget === this || _tempTarget === null){
                    break;
            }
            targetFamily.push(_tempTarget);
            _tempTarget = _tempTarget.parentNode;
        }
        for(var i = 0 , ele ; ele = eleList[i++]; ){
            if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                handlerClick.call(ele , e);
                break;
            }
        }
    }

/**     ⑥
 * getCountDown(year,month,date[,hour,minute,second])
 * 返回值结构 :
 *           [hour,minute,second]
 */
function getCountDown(){
    // 1. 只传年月日 ;
    // 2. 年月日时分秒;
    var 
        hour   = 0,
        minute = 0,
        second = 0;
    var targetDate = new Date();
    targetDate.setFullYear(arguments[0]);           // 2019 6 18 
    targetDate.setMonth   (arguments[1] - 1);       // 2019 7 18 
    targetDate.setDate    (arguments[2]);           // 2019 7 10 
    // 根据参数不同,我们会进行不同的计算;
    if( arguments.length > 3){
        hour   = arguments[3];
        minute = arguments[4];
        second = arguments[5];
    }
    targetDate.setHours  (hour);
    targetDate.setMinutes(minute);
    var targetTime = targetDate.setSeconds(second);
    var reduce = targetTime - Date.now();
    var second = parseInt(reduce / 1000 % 60) ;
    var minute = parseInt(reduce / 1000 / 60 % 60);
    var hour   = parseInt( reduce / 1000 / 3600);
    var days   = hour > 24 ? parseInt(hour / 24) : 0;  
    hour       = hour > 24 ? hour % 24 : hour;
    console.log(hour);
    return [
            hour < 10 ? "0" + hour : "" + hour ,
            minute < 10 ? "0" + minute : "" +minute ,
            second < 10 ? "0" + second : "" +second ,
            days ? days : ""
          ];
}

/**
 * 一个运动框架  ⑦
 */
function handlerMove(){
    move(this,{
        "width"     :900,
        "height"    :300,
        "opacity"   :20,
    },function(){
        box.style.backgroundColor = "pink";
    });
}
function move(dom,obj,fn){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        for(var attr in obj){
            if(attr === "opacity"){
                var iNow = parseInt(getComputedStyle(dom)[attr]*100);
            }else{
                var iNow = parseInt(getComputedStyle(dom)[attr]);
            }
            var speed = (obj[attr] - iNow) / 10;
            speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
            if(obj[attr] === iNow){
                if(Object.keys(obj) === null){
                    clearInterval(dom.timer);
                }
                if(typeof(fn) === "function"){
                    fn();
                }
            }else{
                if(attr =="opacity"){
                    dom.style.opacity =(iNow + speed)/100;
                }else{
                    dom.style[attr] = (iNow + speed) + "px";
                }
            }
        }
    },50);
}


