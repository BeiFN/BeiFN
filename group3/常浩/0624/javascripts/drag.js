var ele_box = document.getElementById("box");
var ele_topBar = document.getElementById("top-bar");
var ele_goBack = document.getElementById("goBack");
var offsetX = null;
var offsetY = null;
var recordArray = [];
var timer = null;
ele_topBar.addEventListener("mousedown",handlerDragStar);
ele_topBar.addEventListener("mouseup",handlerDragStop);
ele_goBack.addEventListener("click",handlerReplay);
function handlerDragStar(evt){
    var e = evt || event;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.addEventListener("mousemove",handlerDraging);
}
function handlerDraging(evt){
    var e = evt || event;
    var left = e.clientX - offsetX;
    var tops = e.clientY - offsetY;
    ele_box.style.left = left + "px";
    ele_box.style.top  = tops + "px";
    recordArray.push({
        left:left,
        top :tops
    })
    // console.log(recordArray);
}

function handlerDragStop(){
    document.removeEventListener("mousemove",handlerDraging);
}
function handlerReplay(){
    // for(i = recordArray.length ; i-- > 0;){
    //     ele_box.style.left = recordArray[i].left + "px";
    //     ele_box.style.top  = recordArray[i].top + "px";  
    // }
    var i = recordArray.length;
    timer = setInterval(function(){
        i--;
        ele_box.style.left = recordArray[i].left + "px";
        ele_box.style.top  = recordArray[i].top + "px";
        if(i === 0){
            clearInterval(timer);
            recordArray.length = 0;
        }  
    },20)
}