class Utils {
    static getAbsPosition(dom) {
        var position = {
            left: dom.offsetLeft,
            top: dom.offsetTop,
        }
        if (dom.offsetParent === document.body) {
            return position;
        } else {
            var pos = Utils.getAbsPosition(dom.offsetParent);
            return {
                left: dom.offsetLeft + pos.left,
                top: dom.offsetTop + pos.top,
            }
        }
    }
    static getSize(dom) {
        return {
            width: parseInt(getComputedStyle(dom)["width"]),
            height: parseInt(getComputedStyle(dom)["height"])
        }
    }
    static removeClassName(dom, className) {
        return dom.className = dom.className.replace(new RegExp("\S?" + className), "");
    }

    static $(selector) {
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }

    static delegation(handlerClick, selector) {
        return function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var eleList = this.querySelectorAll(selector);
            var targetFamily = [];
            var _tempTarget = target;
            var count = 0;
            while (true && count++ < 100) {
                if (_tempTarget === this || _tempTarget === null) {
                    break;
                }
                targetFamily.push(_tempTarget);
                _tempTarget = _tempTarget.parentNode;
            }
            for (var i = 0, ele; ele = eleList[i++];) {
                if (targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1) {
                    handlerClick.call(ele, e, ele, i - 1);
                    break;
                }
            }
        }
    }

    static getRandomColor(type) {
        if (type === "rgb") {
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var a = Math.random().toFixed(2);
            return "rgba(" + r + "," + g + "," + b + " ," + a + ")";
        } else {
            return "#" + Math.round(Math.random() * parseInt("ffffff", 16)).toString(16).padStart(6, "0");
        }
    }
    static move(dom, options, callback) {
        clearInterval(dom.timer);
        dom.timer = setInterval(function () {
            for (var attr in options) {
                if (attr === "opacity") {
                    var iNow = parseInt(getComputedStyle(dom)[attr] * 100)
                } else {
                    var iNow = parseInt(getComputedStyle(dom)[attr])
                }
                var speed = (options[attr] - iNow) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if (options[attr] === iNow) {
                    delete options[attr];
                    if (Object.keys(options).length === 0) {
                        clearInterval(dom.timer);
                        typeof callback === "function" ? callback() : "";
                    }
                } else {
                    if (attr === "opacity") {
                        dom.style[attr] = (iNow + speed) / 100;
                    } else {
                        dom.style[attr] = iNow + speed + "px";
                    }
                }
            }
        }, 50)
    }

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
                          handlerClick.call(ele , e,i-1,ele);
                          break;
                    }
              }
        }
  }
}