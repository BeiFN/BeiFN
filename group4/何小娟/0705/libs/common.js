class Utils{
  // 随机颜色
  static randomColor(type){
      if(type === "rgb"){
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var a = Math.random().toFixed(2);
            return "rgba("+ r +","+ g +","+ b +" ,"+ a +")";
      }else{
            return "#" + Math.round(Math.random()* parseInt("ffffff",16)).toString(16).padStart(6,"0");
      }
  }

  // 倒计时
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

  // 事件委托
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


  // 事件绑定
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

  // 获取元素绝对位置

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


  // 选择器

  static $(selector){
    let ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
  }
  // 删除类名
  static removeClassName(dom , className){
      return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
  }

}