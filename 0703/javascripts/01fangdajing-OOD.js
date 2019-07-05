
function Magnifier(){
      // 属性获取; => 元素选择;

      // 核心方法调用 ;
};

Magnifier.prototype.init = function(){

}
Magnifier.prototype.show = function(){

}
Magnifier.prototype.hide = function(){
      
}
Magnifier.prototype.move = function(){
      
}
Magnifier.prototype.hanlderMousemove = function(){
      
}
// 边界检测;
Magnifier.prototype.boundary = function(){
      
}
// 根据比例计算大图位置;
Magnifier.prototype.getBigPosition = function(){
      
}



function getAbsPosition(dom){
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

function getSize(dom){
      return {
            width : parseInt( getComputedStyle(dom)["width"] ),
            height : parseInt( getComputedStyle(dom)["height"] ) 
      }
}

function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}






