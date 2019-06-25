var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");
var goBack = document.getElementById("goBack");
var _tempDragMove = null;
var timer = null;
var recordArray = [];

topBar.addEventListener("mousedown", handlerStart);
document.addEventListener("mouseup", handlerEnd);
goBack.addEventListener("click" , handlerReplay);

function handlerStart(e) {
	e = e || window.event;
	var obj = {
		offsetX : e.offsetX,
		offsetY : e.offsetY
	}
	_tempDragMove = handlerMoving.bind(obj);
	document.removeEventListener("mousemove", _tempDragMove);
	document.addEventListener("mousemove", _tempDragMove);
}

function handlerMoving(e) {
	e = e || window.event;
	var numLeft = e.clientX - this.offsetX;
  	var numTop = e.clientY - this.offsetY;
  	box.style.left = numLeft + "px";
  	box.style.top = numTop + "px";
	recordArray.push({
	    left : numLeft,
	    top : numTop
	})
}

function handlerEnd(e) {
	e = e || window.event;
	document.removeEventListener("mousemove", _tempDragMove);
}

function handlerReplay(){
	var start = recordArray.length;
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