// 当前显示哪一张

var showIndex = 0;

var next_btn = $(".button-next");
var prev_btn = $(".button-prev");


function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length ===1 ? ele[0]:ele;
}

next_btn.onclick = function(){
    if(showIndex === sliders.length-1){
        showIndex = 0;
    }else{
    showIndex ++;}
}
prev_btn.onclick = function(){
    if(showIndex === 0){
        showIndex = sliders.length-1;
    }else{
    showIndex --;}
}
var sliders = $(".slider");


function move(target,dom,attr){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        var iNow = attr === "opacity"? parseInt(getComputedStyle(dom)[attr]*100):parseInt(getComputedStyle(dom)[attr]);

        target = (attr === "opacity"?target *100:target);
        
        var speed = (target-iNow)/10;
        speed = speed>0? Math.ceil(speed):Math.floor(speed);
        if(target === iNow){
            clearInterval(dom.timer);
        }else{
            dom.style.left = dom.offsetLeft + speed + "px";
        }
    })
}