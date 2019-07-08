/**
 *  Utils.js 
 *  v 0.1.11  
 *  Mr.Du
 *  2019/7/5 
 *  */ 

class Utils{

    /**     ①  
     * @function bgColor 
     * 作用 : 返回 rgba()字符串，随机颜色。
     */
    static bgColor(type){
        if(type === "rgba"){
            let r=Math.round(Math.random()*255);
            let g=Math.round(Math.random()*255);
            let b=Math.round(Math.random()*255);
            let a=Math.random().toFixed(2);
            return "rgba("+r+","+g+","+b+","+a+")";
        }else{
            return "#" + Math.round(Math.random()*parseInt("ffffff",16)).toString(16).padStart(6,0);
        } 
    }
        
        /**     ②  
     * @param 参数一  num1
     * @param 参数二  num2
     * @param 运算符  opt
     * 作用：获取value值进行简单的运算
     */
    // sum.onclick=function (){
    //     let num1=document.getElementById("num1").value;
    //     let num2=document.getElementById("num2").value;
    //     let opt=document.getElementById("opt").value;
    //     let res=calculator(num1,num2,opt);
    //         alert(res);
    // }
    static calculator(num1,num2,opt){
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
    static isNumber(str){
        return !isNaN(str);
    }

    /**     ④  
     * @param {数组arr}  
     * 作用：对数组arr进行去重，得到一个新的数组
     */
    static noRepeat(arr){
        let temp=[];
        for(var i in arr){
            if(temp.indexOf(arr[i]) == -1){
                temp.push(arr[i]);
            }
        }
        return temp;
    }
    // Array.from(new Set(arr));

     /**     ⑤  
     * @param {}  
     * 作用：事件委托函数的封装
     */
    static on(dom,evetType,callback,selector){
        if(dom.addEventListener){
            if(arguments.length === 4 && typeof arguments[3] === "string" ){
                dom.addEventListener(evetType , Utils.delegation( callback , selector ));
            }else{
                dom.addEventListener(evetType , callback);
            }
        }else if(dom.attachEvent){
            dom.attachEvent("on" + eventType, callback);
        }else{
            dom["on" + eventType] = callback;
        }
    }
    static delegation( handlerClick , selector ){
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
    }

     /**     ⑥
     * getCountDown(year,month,date[,hour,minute,second])
     * 返回值结构 :
     *           [hour,minute,second]
     */
    static getCountDown(){
        var 
              hour   = 0,
              minute = 0,
              second = 0;
  
        var targetDate = new Date();
        targetDate.setFullYear(arguments[0]); // 2019 6 18 
        targetDate.setMonth   (arguments[1] - 1);       // 2019 7 18 
        targetDate.setDate    (arguments[2]);       // 2019 7 10 
  
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
    // static handlerMove(){
    //     move(this,{
    //         "width"     :900,
    //         "height"    :300,
    //         "opacity"   :20,
    //     },function(){
    //         box.style.backgroundColor = "pink";
    //     });
    // }
    static move(dom,obj,fn){
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

    /**
     * 获取元素的绝对位置  ⑧
     */ 
    static getAbsPosition(dom){
        var position = {
              left : dom.offsetLeft,
              top  : dom.offsetTop
        }
        if(dom.offsetParent === document.body){
              return position;
        }else{
              var pos = getAbsPosition(dom.offsetParent)
              return {
                    left : dom.offsetLeft + pos.left,
                    top  : dom.offsetTop  + pos.top
              }
        }
    }

    /**
     * $ 选择器  ⑨
     */
    static $(selector){
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }

    /**
     * 删除类名  ⑩
     */
    static removeClassName(dom , className){
        return dom.className = dom.className.replace(new RegExp("\\s\?"+className) , "" );
    }

    /**
     * 获取当前元素大小  ⑩①
     */
    static getSize(dom){
        return {
            width : parseInt(getComputedStyle(dom)["width"]),
            height: parseInt(getComputedStyle(dom)["height"])
        }
    }

    
}