function $(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
}


var ball = $("#ball");
var container = $("#container");
var progress = $(".progress");
var timer = null;
var speed = 3;
var g = 0.5;
var target = 400;
var moving = false;
var speedX = 0;

document.addEventListener("click" , handlerClick);
container.addEventListener("mousemove" , handlerMouseMove)
function handlerMouseMove(evt){
        var e = evt || window.event;
        if(!moving){
            ball.style.left = e.offsetX - 20 + "px";
            ball.style.top = e.offsetY - 20 + "px";
        }
        getBallTurn(e.offsetX);
}
function getBallTurn(x){
        if(x <= 300){
            // console.log("向左");
            var prop = (300 - x) / 300 * 100
            speedX = - 5 * (prop / 100);

        }else{
            var prop = (x - 300) / 300 * 100;
            speedX =   5 * (prop / 100);

        }
        // console.log(prop);
        progress.style.height = prop + "px";
}

function handlerClick(){
        moving = true;
        clearInterval(timer);
        timer = setInterval( ballMove , 50 )
}
function ballMove(){
        speed += g;

        ball.style.top = ball.offsetTop + speed + "px";
        ball.style.left = ball.offsetLeft + speedX + "px";

        if( Math.abs(target - 40 - ball.offsetTop) <= speed ){
            ball.style.top = target - 40 + "px";
            // clearInterval(timer)
            speed = -speed;

            // console.log(speed);
            if(speed > -2){
                    clearInterval(timer);
                    ball.style.top = target - 40  + "px";
            }
        }

}