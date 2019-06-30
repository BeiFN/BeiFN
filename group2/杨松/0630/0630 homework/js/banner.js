function $(selector){
    var ele =null;
    return (ele = document.querySelectorAll(selector)).length ===1 ? ele[0] : ele;
}

var container =$(".container");
var wrapper   =$(".wrapper");
var sliders   =$(".slider");
var nextBtn   =$(".next");
var prevBtn   =$(".prev");
var pages     =$(".page");
var points     =$(".point");
var  index =1;
var showIndex =0;
nextBtn.onclick =function(){
  if(showIndex ===sliders.length - 1 ){
      showIndex = 1;
      wrapper.style.left = 0;
  }else {
      showIndex ++;
  }
  move(-500*showIndex ,wrapper, 'left');
};

prevBtn.onclick=function () {
    if(showIndex === 0){
        showIndex=sliders.length - 1;
    }else {
        showIndex --;
    }
    move(-500*showIndex,wrapper ,"left");

};

function move(target,dom,attr){
    clearInterval(dom.timer);
    dom.timer = setInterval(function (){
        var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr]*100) : parseInt(getComputedStyle(dom)[attr]);
        target = (attr === "opacity" ? target *100 :target);
        var speed = (target - iNow) /10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if(target === iNow){
            clearInterval(dom.timer)
        }else {
            dom.style[attr] =(attr === "opacity" ? (iNow +speed) /100 :iNow +speed + "px")
        }
    },50)
}


pages.addEventListener("click",handlerClickPages);
function handlerClickPages(){
    for( var i = 0;i<pages.length;i++){
        pages[i].style.backgroundColor = "gray";
    }

    move(-500*(num-1),wrapper,"left");

}
