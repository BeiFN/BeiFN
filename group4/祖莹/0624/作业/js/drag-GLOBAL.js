var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");

var GLOBAL = {};
//点击拖拽条,才可以实现拖拽运动。
function handlerDragStart(evt){
      var e = evt || event;
      //handlerDragStart 函数中的x值和y值，想要给DragMove进行使用,使用GLOBAL{};
      GLOBAL.offsetX = e.offsetX;
      GLOBAL.offsetY = e.offsetY;
      //开始拖拽时添加topBar的监听函数;
      topBar.addEventListener("mousemove" ,  handlerDragMove);
}

function handlerDragMove(evt){
      var e = evt || event;

      box.style.left = e.clientX - GLOBAL.offsetX + "px";
      box.style.top = e.clientY - GLOBAL.offsetY + "px";

}
function handlerDragEnd(){
      topBar.removeEventListener("mousemove" ,  handlerDragMove);
}

topBar.addEventListener("mouseup" , handlerDragEnd );
topBar.addEventListener("mousedown" , handlerDragStart);
