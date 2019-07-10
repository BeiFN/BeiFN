
var 
      button_next = $(".button-next"),
      button_prev = $(".button-prev"),
      container   = $(".container"),
      pagination  = $(".pagination"),
      sliders     = $(".slider"),
      wrapper     = $(".wrapper");
var Index = 0;

function $(selector){
      var res = null;
      return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res ;
}
pagination.onclick = function(evt){
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      console.log(target.innerHTML);
      switch (target.innerHTML){
            case "1" :
                  console.log(1);
                  move(-300 * 0 , wrapper , "left");
                  break;
            case "2" :
                  move(-300 * 1 , wrapper , "left");
                  break;
            case "3" :
                  move(-300 * 2 , wrapper , "left");
                  break;
            case "4" :
                  move(-300 * 3 , wrapper , "left");
                  break;
            case "5" :
                  move(-300 * 4 , wrapper , "left");
                  break;
      }
}
button_next.onclick = function(){
      if(Index === sliders.length - 1){
            Index = 0 ;
            wrapper.style.left = 0;
      }else{
            Index ++;
      }
}
button_prev.onclick = function(){
      if(Index === 0){
            Index = sliders.length - 1;
            wrapper.style.left = -300*Index + "px";
      }else{
            Index -- ;
      }
}
container.onclick = function(evt){
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      if(target === button_next || target === button_prev){
            move( -300*Index , wrapper , "left");
      }
}
function move(target, dom , attr){
      clearInterval(dom.timer);
       dom.timer = setInterval(function(){
            if(attr === "opacity"){
                  var len = parseInt(getComputedStyle(dom)[attr]*100);
            }else{
                  var len = parseInt(getComputedStyle(dom)[attr]);
            }
      
            var speed = ((attr === "opacity" ? target*100 : target) - len)/10 ;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      
            if(target === len){
                  clearInterval(dom.timer);
            }else{
                  if(attr === "opacity"){
                        dom.style[attr] = (speed + len)/100;
                  }else{
                        dom.style[attr] = speed + len + "px";
                  }
            }
      },50)
}