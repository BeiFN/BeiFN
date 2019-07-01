function $(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
}

function on(ele,eee,fn){
    ele.addEventListener(eee,fn);
}

var box1 = $("#box1"),
    box2 = $("#box2"),
    box3 = $("#box3");

on(box1,"mouseenter",heightChange);
on(box2,"mouseenter",widthChange);
on(box3,"mouseenter",opacityChange);

function heightChange(){
    move(400,this,"height");
}
function widthChange(){
    move(400,this,"width");
}
function opacityChange(){
    move(0.3,this,"opacity");
}

function move(target , dom , attr){
    clearInterval(dom.timer)
    dom.timer = setInterval(function(){
        if(attr === "opacity"){
            var iNow = parseInt(getComputedStyle(dom)[attr] * 100);
        }else{
            var iNow =  parseInt(getComputedStyle(dom)[attr]);
        }
        var speed = ( (attr === "opacity" ? target * 100 : target)  - iNow) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if(target === iNow){
            clearInterval(dom.timer)
        }else{
            if(attr === "opacity"){
                dom.style.opacity = (iNow + speed) / 100; 
            }else{
                dom.style[attr] = iNow + speed + "px";
            }
        }
    },50)
}