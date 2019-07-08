/*
**回到顶部
*/
//var gotoTop = document.getElementById("gotoTop");
window.onscroll = function(){
    var scrollTop =  document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop > 382 &&  scrollTop < 3150){
        gotoTop.style.position = "fixed";
        gotoTop.style.top = 537+"px" ;
        gotoTop.style.display = "block";
    }
    else if(scrollTop >3150){
            gotoTop.style.position = "absolute";
            gotoTop.style.top = 3675 +"px";          
    }
    else{
        gotoTop.style.display = "none";
    }
    gotoTop.onclick = function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

/**
 * banner 轮播图
 */
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
var show_index = 0;//下标从0开始
var timer = null;
var btn_next = $(".next_btn");
var btn_prev = $(".prev_btn");
var banner = $(".banner");
var slider = $(".slider");
var wrapper = $(".wrapper");

btn_next.onclick = function(){
    if(show_index === slider.length -1){
        show_index = 1;
        wrapper.style.left = 0 + "px";
    }
    else{
        show_index ++;
    }
}
btn_prev.onclick = function(){
    if(show_index === 0){
        show_index = slider.length -2;
        wrapper.style.left = -1130*(show_index+1) + "px"; 
    }
    else{
        show_index --;
    }
}
    
banner.onclick = function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if(target === btn_next || target === btn_prev){
        move(-1130*show_index , wrapper , "left");
    }
}

timer = setInterval(function(){
    if(show_index === slider.length-1){
        show_index =1;
        wrapper.style.left = 0 ;
    }
    else{
        show_index ++;
    }
    move(-1130*show_index , wrapper , "left");
},4000)


function move( target , ele , attr ){
    clearInterval( ele.timer );
    target = (attr === "opacity" ? target *100 : target);
    ele.timer = setInterval(function(){
        var iNow = ( attr ==="opacity" ? parseInt( getComputedStyle(ele)[attr] * 100 ) : parseInt(getComputedStyle(ele)[attr]));
        var speed = (target - iNow) /10;
        speed > 0 ? speed = Math.ceil(speed) : speed = Math.floor(speed);
        if(target === iNow){
            clearInterval(ele.timer);
        }
        else{
            if(attr === "opacity"){
                ele.style[attr]= (iNow + speed) /100 +"px";
            }
            else{
                ele.style[attr] = iNow + speed +"px";
            }
        }
    },50)
}




