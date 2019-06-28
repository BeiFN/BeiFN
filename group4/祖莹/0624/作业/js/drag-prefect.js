var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");


var _tempDragMove = null;
function handlerDragStart(evt){
      var e = evt || event;
      
      document.removeEventListener("mousemove" , _tempDragMove);
      document.addEventListener("mousemove" , _tempDragMove = handlerDragMove.bind( false , {offsetX : e.offsetX , offsetY : e.offsetY}));
}

function handlerDragMove(_offset,evt){
      var e = evt || event;
      box.style.left = e.clientX - _offset.offsetX + "px";
      box.style.top = e.clientY - _offset.offsetY + "px";

}

function handlerDragEnd(){
      document.removeEventListener("mousemove" ,  _tempDragMove);
}

topBar.addEventListener("mouseup" , handlerDragEnd );
topBar.addEventListener("mousedown" , handlerDragStart);


