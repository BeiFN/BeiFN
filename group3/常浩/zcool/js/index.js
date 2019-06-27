function $(selector){
    var sel = null;
   return  sel = (document.querySelectorAll(selector).length == 1)　?　document.querySelectorAll(selector)[0] : document.querySelectorAll(selector);
}
// var ele_bannerList = $("#banner_list");
// var forward  = $(".bottom");
// var back     = $(".top");
var nav   = $(".nav"); //导航条的固定
window.addEventListener("scroll",handlerSticky)
var goTop = $("#goTop");
var navTop = nav.offsetTop;

function handlerSticky(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop >= navTop){
        nav.style.position = "fixed";
        nav.style.top = 0;
    }else{
        nav.style.position = "static"
    }

    if(scrollTop >= 3118){
        goTop.style.position = "absolute";
        goTop.style.top = "3670px" ;
        goTop.style.display = "block";
        goTop.style.right  =  "3%";
    }else if(scrollTop >= navTop && scrollTop < 3118){
        goTop.style.display = "block";
        goTop.style.position = "fixed";
        goTop.style.top   =  "560px" ;
        goTop.style.right  =  "3%";
    }else{
        goTop.style.display = "none";
     }
}
goTop.onclick = function(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

