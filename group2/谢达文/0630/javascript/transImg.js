/**
 * 
 * @param {attribute} selector 
 * 属性选择器
 */
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0]:ele;
}

var wrapper  = $("#wrapper");
var showList = 0;

var ele_left  = $("#left");
var ele_right = $("#right");
var ele_shunxun = $("#shunxun");
var ele_child  = ele_shunxun.children;
console.log(ele_child);
console.log(ele_child.length);
var ele_content = $(".content");
var slider = $(".slider");




ele_left.addEventListener("click",handlerClickLeft);
ele_right.addEventListener("click",handlerClickRight);


// 手动轮播
function handlerClickLeft(){
    if(showList == 0){
        showList =  slider.length - 1;
       
        wrapper.style.left = -1000*showList +"px";
    }
  
     showList --;
    
    for( var i = 0;i<ele_child.length;i++){
        ele_child[i].style.backgroundColor = "gray";
    }
    ele_child[showList].style.backgroundColor = "#fff";
    
    // ele_child[showList].style.backgroundColor = "#fff";
    // move(-1000*showList,wrapper,"left");
    console.log(showList);
}



function handlerClickRight(){
   
   
    if(showList == slider.length - 1){
        showList = 1;
        wrapper.style.left = 0;
    }
    else{
        showList ++;
    }
    for( var i = 0;i<ele_child.length;i++){
        ele_child[i].style.backgroundColor = "gray";
    }
    var show = (showList === 4) ? 0 : showList;
    ele_child[show].style.backgroundColor = "#fff";
    console.log(showList);
    
    // move(-1000*showList,wrapper,"left");
}

ele_content.addEventListener("click",bothControl);

 function bothControl (evt){
    var e = evt || event;
    var target = e.target || e.srcElement;
    if(target === ele_left || target ===ele_right){
       
        move(-1000*showList,wrapper,"left");
    }
}

//自动轮播
setInterval(function(){
    if(showList == slider.length - 1){
        showList = 1;
        wrapper.style.left = 0;
    }
    else{
        showList ++;
    }
    for( var i = 0;i<ele_child.length;i++){
        ele_child[i].style.backgroundColor = "gray";
    }
    var show = (showList === 4) ? 0 : showList;
    ele_child[show].style.backgroundColor = "#fff";
    move(-1000*showList,wrapper,"left");
},3000)



// 事件委托
ele_shunxun.addEventListener("click",delegation(handlerClick,"div"));

function delegation(callBack,selector){
    return function(evt){
        var e = evt || event;
        var target = e.target || e.srcElement;
        var eleList = this.querySelectorAll(selector);

        for(var i = 0, ele ;ele = eleList[i++];){
            if(ele == target){
                handlerClick.call(ele);
            }
        }
    }


}
function handlerClick(){
    for( var i = 0;i<ele_child.length;i++){
        ele_child[i].style.backgroundColor = "gray";
    }
    this.style.backgroundColor = "#fff";
    // move(-1000*showList,wrapper,"left");
    
     var  num = this.innerHTML;
     move(-1000*(num-1),wrapper,"left");

}

// function move(target,dom,attr){
//     clearInterval(dom.timer);
//     console.log(target);
//     console.log(dom);
//     console.log(attr);
//     dom.timer = setInterval(function(){
//         var icrrent = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr]*100) : getComputedStyle(dom)[attr];
//         target = (attr == "opacity" ? target * 100 : target);
//         var speed = (target - icrrent)/10;
//         speed = speed > 0?Math.ceil(speed) : Math.floor(speed);
//         if(target == icrrent){
//             clearInterval(dom.timer);
//         }
//         else{
          
//             dom.style[attr] = (attr === "opacity" ? (icrrent + speed ) / 100 : icrrent + speed + "px");
//         }
//     },50)
// }


function move( target , dom , attr ){
    clearInterval( dom.timer );
    dom.timer = setInterval(function(){
          // 获取当前元素的位置;
          var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr] * 100) : parseInt(getComputedStyle(dom)[attr]);
          // target重新赋值;
          target = (attr === "opacity" ? target * 100 : target)
          var speed = (target - iNow) / 5;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          if(target === iNow){
                clearInterval(dom.timer)
          }else{
                dom.style[attr] = (attr === "opacity" ? (iNow + speed ) / 100 : iNow + speed + "px")
          }
    },50)
}