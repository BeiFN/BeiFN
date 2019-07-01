var divs = document.getElementsByTagName("div"),
    timer = null;
for(var i = 0 ,div ; div = divs[i++]; ){
    div.onmouseover = function(){
        move(400,this);
    }
}
function move(target , dom ){
    clearInterval(dom.timer);
    dom.timer = setInterval( function(){
        var speed = (target - dom.offsetWidth) / 10;
        speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
        if(target === dom.offsetWidth){
            clearInterval(dom.timer);
        }else{
            dom.style.width = dom.offsetWidth + speed + "px";
        }
    },50)
}