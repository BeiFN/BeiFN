function $(selector){
    var sel = null;
   return  sel = (document.querySelectorAll(selector).length == 1)　?　document.querySelectorAll(selector)[0] : document.querySelectorAll(selector);
}


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
    // 回到顶部显示
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
// 点击回到顶部
goTop.onclick = function(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
}

//轮播图;
var showindex = 0 ;
var wrap = $("#wrap");
var ele_ul = $("#banner_list");
var next = $(".bottom");
var prev = $(".top");
    //运动框架
    function move (target , dom , attr){
        clearInterval(dom.timer);
        target = attr === "opacity" ? target * 100 : target ;
        dom.timer = setInterval(function (){
            var iNow = (attr === "opacity" ? parseInt( getComputedStyle(dom)[attr] *  100 ) : parseInt(getComputedStyle(dom)[attr]))
            var speed = (target - iNow) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(target === iNow){
                clearInterval(dom.timer)
            }else{
                dom.style[attr] = ( attr === "opacity" ? (iNow + speed)/100 : iNow + speed + "px" )
            }
        },50)
    }
    wrap.addEventListener("click", function(evt){
        var e = evt || window.event;
        console.log(e.target , next);
        if(e.target ===next || e.target === prev ){
            move(-1130 * showindex , ele_ul , "left");
        }
    })
next.addEventListener("click", handlerNext);
prev.addEventListener("click", handlerPrev);
// console.log(ele_ul.children.length);
function handlerNext(){
   if(showindex == ele_ul.children.length - 1 ){
       ele_ul.style.left = 0;
       showindex = 1;
   }else{
       showindex ++;
   }
//    console.log(showindex);
}
function handlerPrev(){
    if(showindex === 0 ){
        ele_ul.style.left = (ele_ul.children.length - 1) * -1130 +"px";
        showindex = ele_ul.children.length - 2  ;
    }else{
        showindex --;
    }
    // console.log(showindex);
}

var Stars = setInterval( automatic,3000);
function automatic(){
    if(showindex < (ele_ul.children.length-2)){
        showindex ++
    }else{
        showindex = 1
        ele_ul.style.left  = 0;
    }
    move(-1130 * showindex , ele_ul , "left");  
}

// 鼠标移动到前进后退   清除自动跳转 并开启延时器2s 再重新开启自动跳转；
// 中间经历了5s ；  如果过程中有点击操作  清除延时器 并开启一个新的延时器 5s 在重新开启自动跳转

var timer_time = null;
next.onmouseover = Stops;
prev.onmouseover = Stops;
function Stops(){
    clearInterval(Stars);
    var timer_time = setTimeout(function(){
        console.log(1)
        clearInterval(Stars);
        next.addEventListener("click",Stops_Click);
        prev.addEventListener("click",Stops_Click);        
        Stars = setInterval( automatic,3000);
    },2000)
}
function Stops_Click(){
    console.log(2)
    clearInterval(Stars);
    clearTimeout(timer_time);
    var timer_set = setTimeout(function(){
        console.log(3);
        clearInterval(Stars);
        Stars = setInterval( automatic,3000);
    },5000)
}