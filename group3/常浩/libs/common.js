/**
 *  commonjs 函数库 
 *  v 0.1.0  
 *  by. huaizhiY
 *  date : 2019/7/5 
 * 
 *  */ 

 class Utils{
      // 随机颜色; 
      static randomColor(type){
            if(type === "rgba"){
                  let r = Math.round(Math.random() * 255);
                  let g = Math.round(Math.random() * 255);
                  let b = Math.round(Math.random() * 255);
                  let a = Math.random().toFixed(2);
                  return "rgba("+ r +","+ g +","+ b +" ,"+ a +")";
            }else{
                  return "#" + Math.round(Math.random()* parseInt("ffffff",16)).toString(16).padStart(6,"0");
            }
      }
      /**
       * getCountDown(year,month,date[,hour,minute,second])
       * 
       * 返回值结构 :
       *           [hour,minute,second]
       * 
       */
      // 倒计时;
      static getCountDown(){
            var  
                  hour   = 0,
                  minute = 0,
                  second = 0;
      
            var  targetDate = new Date();
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
            var targetTime = targetDate.setSeconds(second)
            
            var reduce = targetTime - Date.now()
            
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
      
      // 事件绑定;
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

      // 事件委托;
      static delegation( handlerClick , selector ){
            return function(evt){
                  let e = evt || window.event;
                  let target = e.target || e.srcElement;
                  let eleList = this.querySelectorAll(selector);
                  let targetFamily = [];
                  let _tempTarget = target;
                  let count = 0;
                  while(true && count ++ < 100){
                        if(_tempTarget === this || _tempTarget === null){
                              break;
                        }
                        targetFamily.push(_tempTarget);
                        _tempTarget = _tempTarget.parentNode;
                  }
                  for(var i = 0 , ele ; ele = eleList[i++]; ){
                        if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                              handlerClick.call(ele , e, ele);
                              break;
                        }
                  }
            }
      }
      
      // 获取元素绝对位置;
      
      static getAbsPosition(dom){
            let position = {
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
      //选择器;
      static $(selector){
            let ele = null;
            return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
      }
      // 删除类名
      static removeClassName(dom , className){
            return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
      }

      //获取元素的大小
      static getEleSize (dom){
            let eleSize = {
                width  :  parseInt(getComputedStyle(dom)["width"]),
                height :  parseInt(getComputedStyle(dom)["height"])
            }
            return eleSize;
        }
      /**
        * 运动框架 
        * options = {
        *       attr : target 
        *   } 
        */
      static move( dom , options , callback){
            clearInterval(dom.timer);
            dom.timer = setInterval(function(){
                for(let attr in options){
                    if(attr === "opacity"){
                        var iNow = parseInt( getComputedStyle(dom)[attr] * 100 )
                        var target = options[attr];
                    }else{
                        var iNow = parseInt( getComputedStyle(dom)[attr] )
                        var target = options[attr];
                    }
                    var speed = (target - iNow) / 10;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed) ;
                    if(target == iNow){
                        delete options[attr] ; 
                        if(Object.keys(options).length === 0 ){
                            clearInterval(dom.timer);
                            typeof callback === "function" ? callback() : "";
                        }
                    }else{
                        if(attr == "opacity"){
                            dom.style[attr] = (iNow + speed) / 100 ;
                        }else{
                            dom.style[attr] = iNow + speed + "px";
                        }
                    }
                }
            },50)
        }
 }


