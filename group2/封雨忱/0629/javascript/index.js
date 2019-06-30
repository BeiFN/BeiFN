//-------封装$-------
function $(selector){
    var ele=null;
    return  (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
}
//-------获取dom节点------
var container=$('.container');
var wrapper=$('.wrapper');
var slider=$('.slider');
var next_button=$('.next-button');
var prev_button=$('.prev-button');
var span=document.getElementsByTagName('span');
span[0].style.background='#000'
var showIndex=0;
var timer=null;
//-----添加事件----
next_button.onclick=function(){
    if(showIndex===slider.length-1){
        showIndex=1;
        wrapper.style.left='0';
    }else{
        showIndex++;
        changPointColornext(showIndex);
    }
    indexMove(-500*showIndex,wrapper);
    // console.log(showIndex)
}
prev_button.onclick=function(){
    if(showIndex===0){
        showIndex=slider.length-1
    }else{
        showIndex--;
        changPointColorprev(showIndex);
    }
    // console.log(showIndex)
    indexMove(-500*showIndex,wrapper);
}
container.onclick=function(evt){
    var e=evt||window.event;
    var target=e.target||e.srcElement;
    if(target===prev_button||target===next_button){
       indexMove(-500*showIndex,wrapper) 
    }
    
}
// container.onclick = function(evt){
//     var e = evt || window.event;
//     var target = e.target || e.srcElement;
//     if(target === next_button || target === prev_button){
//         indexMove(-500 * showIndex , wrapper , "left");
//     }
// }
function indexMove(target,dom,arrt){
    clearInterval(dom.timer);
    dom.timer=setInterval(function(){
        var speed=(target-dom.offsetLeft)/5;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        // console.log(speed)
        if(showIndex===6){
            alert()
            speed=target-dom.offsetLeft;    
        }
        if(target===dom.offsetLeft){
            clearInterval(dom.timer)
        }else{
        dom.style.left=dom.offsetLeft+speed+'px';        
        // console.log(speed)
        }

    },50)
};


function changPointColornext(showIndex){
    span[showIndex].style.background='#000';
    span[showIndex-1].style.background='#fff';
    // console.log(showIndex)
}
function changPointColorprev(showIndex){
    span[showIndex].style.background='#000';
    span[showIndex+1].style.background='#fff';
}