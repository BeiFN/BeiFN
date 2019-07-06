// var timer=null;
function move(ele, obj, deal) {
				clearInterval(ele.timer);
				var iNode = null;
				var speed = null;
				ele.timer = setInterval(function() {
					for (var attr in obj) {
						if (attr === "opacity") {
							iNode = getComputedStyle(ele)[attr] * 100;
						} else {
							iNode = parseInt(getComputedStyle(ele)[attr]);
						}
						speed = (obj[attr] - iNode) / 10;
						speed > 0 ? speed = Math.ceil(speed) : speed = Math.floor(speed);

						if (iNode === obj[attr]) {
							delete obj[attr];
							if (Object.keys(obj).length === 0) {
								clearInterval(ele.timer);
								typeof deal === "function" ? deal() : "";
							}
						} else {
							if (attr === "opacity") {
								ele.style.opacity = (parseInt(iNode + speed)) / 100;
							} else {
								ele.style[attr] = iNode + speed + "px";
							}
						}
					}
				}, 100);
			}
//判断class
function removeClassName(dom , className){
	return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
}
//绑定事件
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
                        handlerClick.call(ele , e , ele);
                        break;
                  }
            }
      }
}