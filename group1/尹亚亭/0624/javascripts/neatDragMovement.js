var removableBox=document.getElementById("box");
var topBar=document.getElementById("top-bar");
var reduction=document.getElementById("goBack");

var timer=null;
var recordArray=[];

var GLOBAL={ };

topBar.addEventListener("mousedown",handlerDragStart);
topBar.addEventListener("mouseup",handlerDragEnd);
reduction.addEventListener("click",handlerPlayBack);

// 鼠标按下--拖拽开始
function handlerDragStart(evt){
	var e=evt || event;
	 GLOBAL.offsetX=e.offsetX;
	 GLOBAL.offsetY=e.offsetY;		
	topBar.addEventListener("mousemove",handlerDragMove);
}

// 鼠标移动--拖拽进行中
function handlerDragMove(evt){
	var e=evt || event;
	var dragLeft=e.clientX - GLOBAL.offsetX ;
	var dragTop=e.clientY - GLOBAL.offsetY;
	removableBox.style.left=dragLeft+"px";
	removableBox.style.top=dragTop+"px";
	// 记录拖拽中的位置信息（与回放相关的）
	recordArray.push({
		left:dragLeft,
		top:dragTop
	})
}

// 鼠标抬起--拖拽结束
function handlerDragEnd(){
	topBar.removeEventListener("mousemove",handlerDragMove);
}

// 回放
function handlerPlayBack(){
	var start=recordArray.length;
	console.log(recordArray.length);
	timer=setInterval(function(){	
		start--;	
		console.log(recordArray[start]);
		box.style.left=recordArray[start].left+"px";
		box.style.top=recordArray[start].top+"px";
		
		if(start===0){		
			clearInterval(timer);
			recordArray.length=0;
		}
		
	},50)
}


