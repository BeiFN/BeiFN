


var next_btn = $(".button-next");
var prev_btn = $(".button-prev");
var sliders = $(".slider");
var wrapper = $(".wrapper")
var container = $(".container")

var pagespan = $("span");
console.log(pagespan);

var bannerTimer = null;

// 当前显示哪一张
var showIndex = 0;
window.onload= function(){
    console.log(showIndex,wrapper.offsetLeft);
    
    
    wrapper.style.left = -300 * showIndex +"px"; 
    console.log(showIndex,wrapper.offsetLeft,wrapper.style.left);
    changePageView(showIndex);


    bannerTimer = setInterval(timerNext,3000);

    // //定时器程序中怎么触发事件
    // setInterval(function(){
    //     var evto = new Event("click",clickNextBtn);
    //     // 构建新事件自动调用触发函数，暂无法冒泡。
    //     next_btn.dispatchEvent(evto);
    // },2000);

}


function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length ===1 ? ele[0]:ele;
}

// next_btn.onclick = function clickNextBtn(){
    
//     if(showIndex === sliders.length-2){
//         console.log(666);
//         showIndex = 1;
//         wrapper.style.left = 0;
//     }else{
//         showIndex ++;
//     }
// }
// next_btn.addEventListener("click",clickNextBtn);

next_btn.onclick = clickNextBtn;

function clickNextBtn(){
    console.log(111);
    if(showIndex === sliders.length-1){
        showIndex = 1;
        wrapper.style.left = 0;
    }else{
        showIndex ++;
    }
    console.log(showIndex);
}


function timerNext(){
    clickNextBtn();
    if(showIndex===5){
        changePageView(0);
    }else{
        changePageView(showIndex);
    }
    move(-300 * showIndex,wrapper,"left");
}

prev_btn.onclick = function(){

    if(showIndex === 0){
        showIndex = sliders.length-2;
        wrapper.style.left = "-1500px";
    }else{
        showIndex --;
    }
 

}

container.onclick = function(evt){
    var e = evt || window.event;
    // 事件源
    var target = e.target || e.srcElement;
    console.log(target,target.nodeName);
    if(target === next_btn || target === prev_btn){
        move(-300 * showIndex,wrapper,"left");
    }else if(target.nodeName === "SPAN"){
        console.log(target.innerText);
        
        showIndex = parseInt( target.innerText)-1;
        console.log(showIndex);
        move(-300 * showIndex,wrapper,"left");
    }
    //修改选中页面样式
    console.log(showIndex);
    if(showIndex === 5){
        changePageView(0);
    }else{
        changePageView(showIndex);
    }
}

function move(target,dom,attr){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        var iNow = attr === "opacity"? parseInt(getComputedStyle(dom)[attr]*100):parseInt(getComputedStyle(dom)[attr]);

        target = (attr === "opacity"?target *100:target);
        
        var speed = (target-iNow)/10;
        speed = speed>0? Math.ceil(speed):Math.floor(speed);
        if(target === iNow){
            clearInterval(dom.timer);

            console.log(showIndex, wrapper.offsetLeft, wrapper.style.left);
      
        }else{
            dom.style.left = dom.offsetLeft + speed + "px";
        }
        
    },20);
    
}

function changePageView(page){
    for(var i=0,ele; ele = pagespan[i];i++){
        if(page ===i){
            ele.style.backgroundColor = "#fff";
        }else{
            ele.style.backgroundColor = "#eee";
        }
    }
}