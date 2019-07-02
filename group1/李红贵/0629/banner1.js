var next_btn = $(".button-next");
var prev_btn = $(".button-prev");
var sliders = $(".slider");
var wrapper = $(".wrapper")
var container = $(".container")

var pagespan = $("span");
console.log(pagespan);

var bannerTimer = null;

// 当前显示哪一张
var showIndex = 1;
window.onload= function(){
    console.log(showIndex,wrapper.offsetLeft);
    
    
    wrapper.style.left = -300 * showIndex +"px"; 
    console.log(showIndex,wrapper.offsetLeft,wrapper.style.left);
    changePageView(showIndex);
    bannerTimer = setInterval(timerNext,3000);
}


function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length ===1 ? ele[0]:ele;
}

prev_btn.addEventListener ("cloick",handlderClick);
function handlderClick(){
    getIndexPrev();
    makeBannerMove();
}
function getIndexPrev(){
    if(showIndex === 0){
        showIndex = sliders.length -1;
    }else{
        showIndex --;
    }
    console.log(showIndex);
}
function move(target, dom, attr){
    clearInterval(dom.timer);
    var target = attr ==="opacity"?target*100 : target;
    dom.timer = setInterval(function(){
        var iNow = attr ==="opacity"?parseInt(getComputedStyle(dom)[attr] *100):parseInt(getComputedStyle(dom)[attr]);
        var speed = (target - iNow)*10;
    },50);
}
function makeBannerMove(){

}