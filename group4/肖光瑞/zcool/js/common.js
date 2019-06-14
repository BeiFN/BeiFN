function move(eleNode,target,attr,num){
    var g = getComputedStyle;
    clearInterval(eleNode.timer);
    eleNode.timer = setInterval(function(){
          var iNow = attr === "opacity" ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
          var speed = (target - iNow) / num;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          iNow += speed;
          eleNode.style[attr] = attr === "opacity" ?  iNow / 100 : iNow + "px";
          // 单if 不带 return的这样的情况都可以简写成三目运算符;
          iNow === target ? clearInterval(eleNode.timer) : "";
    },50)
}