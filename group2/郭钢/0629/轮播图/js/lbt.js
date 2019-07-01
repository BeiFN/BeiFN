function $(selector) {
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

var btn_Next = $(".button-next");
var btn_pre = $(".button-prev");
var container = $(".container");
var wrapper = $(".wrapper");
var sliders = $(".slider");
var count = 0;
var spans = $("span");

for(var i = 0,spanNum;spanNum = spans[i++];){
    spanNum.addEventListener("click",function(){
        count = this.innerHTML - 1;
        move(-300*count,wrapper,"left")
    });
}



container.onclick = function(evt){
    var e = evt || event;
    var target = e.target || e.srcElement;
    if(target === btn_Next || target === btn_pre){
        move(-300*count,wrapper,"left")
    }
}

btn_Next.onclick = function(){
    if(count === sliders.length - 1 ){
        count = 1;
        wrapper.style.left = 0;
    }else{
        count++;
    }
}

btn_pre.onclick = function(){
    if(count === 0){
        count = sliders.length - 1;
    }else {
        count -- ;
    }
}


// btn_Next.onclick = function(){
//     count = (++count)%5;
//     if(count===0){
//         wrapper.style.left =0;
//     }
// }
// btn_pre.onclick = function(){
//     count =(--count)%5;
//     if(count===0){
//         wrapper.style.left =0;
//     }
// }


function move( target , ele , attr ){
    clearInterval( ele.timer );
    ele.timer = setInterval(function(){
          var iNow = attr === "opacity" ? parseInt(getComputedStyle(ele)[attr] * 100) : parseInt(getComputedStyle(ele)[attr]);
          target = (attr === "opacity" ? target * 100 : target)
          var speed = (target - iNow) / 10;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          if(target === iNow){
                clearInterval(ele.timer)
          }else{
            ele.style[attr] = (attr === "opacity" ? (iNow + speed ) / 100 : iNow + speed + "px")
          }
    },50)
}






// function move(n,ele,attr) {
//     clearInterval(ele.timer);
//     ele.timer = setInterval(function () {
//         if(wrapper.offsetLeft === -300*n){
//             clearInterval(ele.timer);
//         }else{
//             if(n<0){
//                 var speed = Math.ceil((wrapper.offsetLeft + 300*(5+n))/5)
//                 wrapper.style[attr] = wrapper.offsetLeft - speed + "px"
//             }else{
//                 var speed = Math.ceil((wrapper.offsetLeft +300*n)/5) ;
//                 wrapper.style[attr] = wrapper.offsetLeft - speed + "px"
//             }
//         }
//     }, 50)
// }
