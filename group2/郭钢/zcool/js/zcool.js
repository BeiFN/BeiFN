function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1?ele[0]:ele;
}

var kindTop = $(".kind");
var goToTop = $(".goToTop");
var toTop = $(".toTop");
var guessLisk = $(".guessLisk");
var topScroll = null;


toTop.addEventListener("click",returnToTop);
window.onscroll = topSuspendAndToTop;
function topSuspendAndToTop(){
    topScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if(topScroll>=611){
        kindTop.style.position = "fixed";
        kindTop.style.top = 0 ;
        kindTop.style.zIndex = 20;
        goToTop.style.display = "block"
    }else{
        kindTop.style.position="static";
        goToTop.style.display = "none"
    }



    if(topScroll>=3056){
        goToTop.style.position = "absolute";
        goToTop.style.top = guessLisk.offsetTop + guessLisk.offsetHeight -100 + "px";
    }else{
        goToTop.style.position = "fixed";
        goToTop.style.top = 600 + "px";
    }
}

function returnToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}