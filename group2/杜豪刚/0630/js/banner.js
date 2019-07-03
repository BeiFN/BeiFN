function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length ===1? res[0] : res ;
}

var showPic  = 0;                       //显示的哪一张图片
var pics     = $(".slider");            //获取的图片
var btn_next = $(".button-next");
var btn_prev = $(".button-prev");
var wrapper  = $(".wrapper");
var timer    = null;
var container= $(".container");

// 手动切换上一张
btn_prev.onclick = function(){
    if(showPic == 0){
        showPic = pics.length -2;
        wrapper.style.left = -5500 + "px";
    }else{
        showPic --;
    }
    move(-1100 * showPic,wrapper,"left");
    // console.log(showPic);
}

// 手动切换下一张
btn_next.onclick = function(){
    if(showPic == pics.length -1){
        showPic = 1;
        wrapper.style.left = 0;
    }else{
        showPic ++;
    }
    move(-1100 * showPic,wrapper,"left");
    // console.log(showPic);
}

// 图片运动
function move(target,dom,attr){
    // 1.关闭上个定时器，开启新的定时器
    clearInterval(dom.timer);
    dom.timer =  setInterval(function(){
        // 2.求出移动的速度
        var nowWidth = parseInt(getComputedStyle(dom)[attr]);        //求出现在的宽度
        var speed    = (target - nowWidth)/10;
        // console.log(nowWidth);
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        // 3.判断终止条件
        if(target === nowWidth){
            clearInterval(dom.timer);
        }else{
            // 4.图片素开始移动
            dom.style[attr] = nowWidth + speed + "px";
        }
    },50)
}

// 自动播放
var c
function automove(){
    if(showPic === pics.length - 1){
        showPic = 1;
        wrapper.style.left = 0;
    }else{
        showPic ++;
    }
    move(-1100 * showPic,wrapper,"left");
}

// 鼠标悬停时，停止播放,离开时继续播放
// wrapper.addEventListener("mouseenter ",stopPlay);
// wrapper.addEventListener("mouseleave",continuePlay);
// function stopPlay(){
//     console.log(1);
//     clearInterval(auto);
// }
// function continuePlay(){
//     auto = setInterval(automove,2000);
// }

