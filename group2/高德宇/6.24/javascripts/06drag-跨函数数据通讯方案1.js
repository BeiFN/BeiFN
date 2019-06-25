var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");

var GLOBAL = {};
//点击拖拽条,才可以实现拖拽运动。
function handlerDragStart(evt){
      // console.log("拖拽开始");
      // 在此要获取鼠标点击时,距离元素边缘的x值和y值;
      var e = evt || event;
      // console.log(e.offsetX,e.offsetY);
      // * handlerDragStart 函数中的x值和y值，想要给DragMove进行使用,应该咋办?
      GLOBAL.offsetX = e.offsetX;
      GLOBAL.offsetY = e.offsetY;

      topBar.addEventListener("mousemove" ,  handlerDragMove);
}

function handlerDragMove(evt){
      // console.log("拖拽进行中");
      var e = evt || event;
      // console.log(e);

      // 统一 ; 
      // 选择client,为了和box定位的元素统一; 

      // 出现了一个bug ,现在的元素跟着鼠标坐标的点去进行定位 。 鼠标在元素的左上角。
      // 让元素定位时将鼠标包含在内,向左移，向上移。
      // 向 左  ？ 向 上 ？

      // console.log(GLOBAL.offsetX,GLOBAL.offsetY);
      box.style.left = e.clientX - GLOBAL.offsetX + "px";
      box.style.top = e.clientY - GLOBAL.offsetY + "px";

}
function handlerDragEnd(){
      // console.log("拖拽结束");
      topBar.removeEventListener("mousemove" ,  handlerDragMove);
}



topBar.addEventListener("mouseup" , handlerDragEnd );
topBar.addEventListener("mousedown" , handlerDragStart);
