/**
 * 
 * @param { string } selector 
 */
function $(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
}

var btn_prev = $("#btn-prev"),
    btn_next = $("#btn-next"),
    banner = $(".banner"),
    container = $(".container"),
    bannerIndex=$(".bannerIndex"),
    bannerIndexList = bannerIndex.children,
    slider=$(".slider"),
    timer=null,
    showIndex = 0;
    //console.log(bannerIndexList);

btn_prev.addEventListener("click",toPrev);
btn_next.addEventListener("click",toNext);
container.addEventListener("click",bannerMove);
container.addEventListener("mouseenter",stopAutoLive);
bannerIndex.addEventListener("mouseenter",stopAutoLive);
//自动轮播
window.onload=function(){
    timer=setInterval(function(){
        toNext();
    },2000);
}
//根据索引切滑动到相应的位置
for(var i = 0,index;index = bannerIndexList[i++];){
    index.addEventListener("click",function(){
        showIndex = this.innerHTML - 1;
        move(-600*showIndex,banner,"left")
    });
}

function toPrev(){
    if(showIndex === 0){
        showIndex = slider.length - 2;
        banner.style.left=(slider.length-1)*-600+"px";
    }else{
        showIndex --;
    }
    // addCss(showIndex)

}

function toNext(){
    if(showIndex===slider.length-1){
        showIndex=1;
        banner.style.left=0;
    }else{
        showIndex++;
    }
    // addCss(showIndex)
    animate(); 
}

function bannerMove(evt){
    var e=evt||window.event,
        target=e.target||e.srcElement;
    if(target===btn_prev||target===btn_next){
        animate();
    }
}

function animate(){
    move(-600*showIndex,banner,"left");

}

function stopAutoLive(){
    clearInterval(timer);
}

function autoLive(){
    timer=setInterval(function(){
        toNext();
    },2000);
}
//运动框架的封装
function move(target,ele,attr){
    clearInterval(ele.timer);
    ele.timer=setInterval(function(){
        var now=(attr==='opacity'? parseInt(getComputedStyle(ele)[attr]*100):parseInt(getComputedStyle(ele)[attr]));
        target=(attr==='opacity'?target*100:target);
        var speed=(target-now)/10;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        if(target===now){
            clearInterval(ele.timer);
        }else{
            ele.style[attr]=(attr==='opacity'?(now+speed)/100:now+speed+"px");
        }
    },50)
}

