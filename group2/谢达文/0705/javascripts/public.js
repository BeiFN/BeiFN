/***
 * 类库函数
 * 
 */

 class Utils{
    //  删除属性值
    static removeClassName(dom , className){
        // var classString = dom.className;
        // var classReg = new RegExp("\S?"+className);
        // classString = classString.replace(classReg,"");
        // dom.className = classString;
        return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
    }

    // 事件委托函数
    static  delegation( handlerClick , selector ){
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
                          handlerClick.call(ele , e , ele);
                          break;
                    }
              }
        }
    }
    // 选择器
    static $(selector){
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }

// 获取元素的宽高
    static getSize(dom){
        return {
              width : parseInt( getComputedStyle(dom)["width"] ),
              height : parseInt( getComputedStyle(dom)["height"] ) 
        }
    }

    // 获取绝对位置
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

// 获取随机颜色
    static getRandomColor(){
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
  }

// 运动框架哦！亲
  static move( dom , options , callback){
      clearInterval( dom.timer );
      dom.timer = setInterval( function(){
            // console.log(1);
            // 根据 attr 判定获取 iNow;
            // 根据iNow 和 target 获取 speed;
            // 根据target和 iNow 判定终止条件;
            // 根据attr 判定 dom操作;
            // * attr  target;
            for(var attr in options){
                  // console.log(attr,options[attr]);
                  if( attr === "opacity"){
                        var iNow = parseInt(getComputedStyle(dom)[attr] * 100 )
                  }else{
                        var iNow = parseInt(getComputedStyle(dom)[attr])
                  }
                  // console.log(attr , iNow);
                  // target => options[attr];
                  var speed = (options[attr] - iNow) / 10;
                  speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);

                  if(options[attr] === iNow){
                        // 所有属性运动结束之后再去关闭定时器;
                        delete options[attr];
                        // console.log(options);
                        // var count = 0;
                        // for(var key in options){
                        //       count ++;
                        // }
                        // if(count === 0){
                        //       clearInterval(dom.timer);
                        // }
                        if(Object.keys(options).length === 0){
                              clearInterval(dom.timer);
                              typeof callback === "function" ? callback() : "";
                        }
                  }else{
                        if(attr === "opacity"){
                              dom.style[attr] = (iNow + speed) / 100;
                        }else{
                              dom.style[attr] = iNow + speed + "px";
                        }
                  }
            }
      } ,50)
}
 }