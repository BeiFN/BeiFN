var showIndex = 0;

var next_btn  = $(".button-next");
var prev_btn  = $(".button-prev");
var sliders   = $(".slider");
var wrapper   = $(".wrapper");
var container = $(".container");
var pagination = $(".pagination");
var eleList = pagination.querySelectorAll("span");

function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

pagination.addEventListener("click",handerChange.bind(this));
function handerChange(evt){
      var e = evt || event;
      var target = e.target || e.srcElement;
      for(var i = 0;i < eleList.length ;i++){
            if(eleList[i] === target){
                  move(-300 * i , wrapper , "left");
                  showIndex = i;
                  //return showIndex;
            }
      }
}
next_btn.onclick = function(){
      if(showIndex === sliders.length - 1){
            showIndex = 1;
            wrapper.style.left = 0;
      }else{
            showIndex ++;
      }
      // console.log(showIndex);
      // move(-300 * showIndex , wrapper , "left");
}

prev_btn.onclick = function(){
      if(showIndex === 0){
            showIndex = sliders.length - 2;
            wrapper.style.left = -300*(sliders.length - 1) + "px";
      }else{
            showIndex --;
      }
}

container.onclick = function(evt){
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      if(target === next_btn || target === prev_btn){
            move(-300 * showIndex , wrapper , "left");
            
      }
}
 
function move( target , dom , attr ){
      clearInterval( dom.timer );
      dom.timer = setInterval(function(){
            var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr] * 100) : parseInt(getComputedStyle(dom)[attr]);
            target = (attr === "opacity" ? target * 100 : target)
            var speed = (target - iNow) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(target === iNow){
                  clearInterval(dom.timer)
            }else{
                  dom.style[attr] = (attr === "opacity" ? (iNow + speed ) / 100 : iNow + speed + "px")
            }
      },50)
}