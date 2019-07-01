function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

var navList = $("#nav_list");
var productTitle = $("#product_title");
var goBack = $("#goback");


function delegation(eventCallBack,selector){
    return function (evt){
        var e = evt || event;
        var target = e.target || e.srcElement;
        var _target = target;
        var targetFamily = [];
        var eleList = this.querySelectorAll(selector);
        
        var count = 0;
        while(true && count<100){
            if(_target === this) break;
            targetFamily.push(_target);
            _target = _target.parentNode;
            count++;
        }
        for(var i = 0,ele ; ele = eleList[i++];){
            if(targetFamily.length===1 ? ele === targetFamily[0] : targetFamily.indexOf(ele)!==-1){
                eventCallBack.call(ele,e);
            }
        }
    }
}

function changeColor(){
    this.style.backgroundColor = "#000";
    this.style.color = "#ffe300";
}

function returnColor(){
    this.style.backgroundColor = "";
    this.style.color = "";
}

window.onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var line = productTitle.offsetTop;
    if(scrollTop>=603){
        productTitle.style.position = "fixed";
        productTitle.style.top = "0px";
    }else{
        productTitle.style.position = "static";
        // productTitle.style.top = "603px";
    }
    if(scrollTop>1200){
        goBack.style.display = "block";
    }
    if(scrollTop>2990){
        goBack.style.position = "absolute";
        goBack.style.top = "3645px";
    }
    if(scrollTop>1200 && scrollTop<2990){
        goBack.style.cssText = "display:block;position:fixed;"
    }
    if(scrollTop<1200){
        goBack.style.display = "none";
    }
}
navList.addEventListener("mouseover" , delegation(changeColor,".hover"));
// navList.addEventListener("mouseover" , changeTextColor("A","#ffe300"));
navList.addEventListener("mouseout" , delegation(returnColor,".hover"));
goBack.onclick = function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// var arr=navList.querySelectorAll("li");
var banner = $("#banner");
var bannerPic = $("#banner_pic");
var nextBtn = $("#next_btn");
var prevBtn = $("#prev_btn");
var sliders = $(".slider");

var showIndex = 0;
var timer = null;

banner.onclick = function(evt){
    var e = evt || event;
    var target = e.target || e.srcElement;
    if(target === nextBtn || target === prevBtn){
        move(-1130 * showIndex , bannerPic , "left");
        // alert(1);
    }
}
nextBtn.onclick = function(){
    if(showIndex === sliders.length-1){
        showIndex = 1;
        bannerPic.style.left = 0;
    }else{
        showIndex++;
    }
}

prevBtn.onclick = function(){
    if(showIndex === 0){
        showIndex = sliders.length-1;
        bannerPic.style.left = -1130*6 +"px";
    }else{
        showIndex--;
    }
}

function move(target , dom , attr){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        var iNow = parseInt(getComputedStyle(dom)[attr]);
        var speed = (target - iNow)/10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if(target === iNow){
            clearInterval(dom.timer);
        }else{
            dom.style[attr] = iNow + speed +"px";
        }
    },50)
}