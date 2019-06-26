var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");
var goBack = document.getElementById("goBack")
var timer = null;
var recordArray = [];

var _tempDragMove = null;//定义全局变量接收，柯里化函数
function handlerDragStart(evt){
      var e = evt || event;
      
      document.removeEventListener("mousemove" , _tempDragMove);//解决鼠标移出body放开后，拖拽框不停止的bug


    //   使用bind柯里化，固定鼠标首次点击位置参数
      document.addEventListener("mousemove" , 
      _tempDragMove = handlerDragMove.bind( false , {offsetX : e.offsetX , offsetY : e.offsetY}));
}
function handlerDragMove(_offset, evt){
      var e = evt || event;
      var numLeft = e.clientX - _offset.offsetX;
      var numTop = e.clientY - _offset.offsetY
      box.style.left = numLeft  + "px";
      box.style.top = numTop + "px";

    //   移动位置记录在全局变量中，
      recordArray.push({
            left : numLeft,
            top : numTop
      })
}
function handlerDragEnd(){
      document.removeEventListener("mousemove" ,  _tempDragMove);
}
function handlerReplay(){

      var start = recordArray.length;
      if(start === 0) return;//避免多次点击回放bug
      timer = setInterval( function (){
            start --;
            
            box.style.left = recordArray[start].left + "px";
            box.style.top = recordArray[start].top + "px";

            if(start === 0){
                  clearInterval(timer);
                  recordArray.length = 0;
            }
      },50)
}

topBar.addEventListener("mouseup" , handlerDragEnd );
topBar.addEventListener("mousedown" , handlerDragStart);
goBack.addEventListener("click" , handlerReplay);

