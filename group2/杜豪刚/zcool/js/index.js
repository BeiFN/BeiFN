//顶部悬浮
var main = document.getElementById("main");
function scrollHeight(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop >= 620){
        main.style.position = "fixed";
        main.style.top = 0 ;
        main.style.zIndex = 9;
    }else{
        main.style.position = "static";
    }
}
document.addEventListener("scroll",scrollHeight);

// 返回顶部
var toTop = document.getElementById("toTop");
function toScroll(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop >= 700){
        toTop.style.display = "block";
        toTop.style.bottom = 35 + "px";
        if(scrollTop >= 2100){
            toTop.style.bottom = 280 +"px";
        }
    }else{
        toTop.style.display = "none";
    }
}
function goTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
toTop.addEventListener("click",goTop);
document.addEventListener("scroll",toScroll);



