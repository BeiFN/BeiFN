var showIndex = 0;

var next_btn = $(".button-next");
var prev_btn = $(".button-prev");
var sliders  = $(".slider");
var wrapper = $(".wrapper");
var container =$(".container");
var sps = $(".sp");


function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] :ele ;
}

function things( ){
    
}




next_btn.onclick = function(){
    if(showIndex === sliders.length - 1){
        showIndex = 1;
        wrapper.style.left = 0;
        for(var i =0 ,sp; sp =sps[i++];){
            sp.style.opacity ="";
            if(showIndex === 0 || showIndex ===sliders.length-1){
                sps[0].style.opacity = "0.5";
            }
            if(showIndex === i-1){
                sp.style.opacity ="0.5";
                break;
            }
        }
    }else{
        showIndex ++;
       // console.log( showIndex)
        for(var i =0 ,sp; sp =sps[i++];){
            sp.style.opacity ="";
            if(showIndex === 0 || showIndex ===sliders.length-1){
                sps[0].style.opacity = "0.5";
            }
            if(showIndex === i-1){
                sp.style.opacity ="0.5";
                break;
            }
        }
    }
   
}
prev_btn.onclick = function(){
    if(showIndex === 0){
        //wrapper.style.right = 0;
        wrapper.style.left = -1200 +"px";
        showIndex = sliders.length - 2;
        for(var i =0 ,sp; sp =sps[i++];){
            sp.style.opacity ="";
            if(showIndex === 0 || showIndex ===sliders.length-1){
                sps[0].style.opacity = "0.5";
            }
            if(showIndex === i-1){
                sp.style.opacity ="0.5";
                break;
            }
        }
        
       
    }else{
        showIndex --;
        for(var i =0 ,sp; sp =sps[i++];){
            sp.style.opacity ="";
            if(showIndex === 0 || showIndex ===sliders.length-1){
                sps[0].style.opacity = "0.5";
            }
            if(showIndex === i-1){
                sp.style.opacity ="0.5";
                break;
            }
        }
    }
}
container.onclick =function(evt){
    var e = evt || event;
    var target = e.target || e.srcElement;
    if(target === next_btn || target === prev_btn){
        move(-300*showIndex,wrapper ,"left");
    }
}


function move (target ,dom, attr){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        var iNow = (attr === "opacity" ? parseInt(getComputedStyle(dom)[attr]) : parseInt(getComputedStyle(dom)[attr]));
        target =(attr === "opacity" ? target*100 :target)
        var speed = (target - iNow) /10;
        speed =speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if(target === iNow){
            clearInterval(dom.timer);
        }else{
            dom.style[attr] = (attr === "opacity" ? (iNow + speed) / 100 : iNow +speed +"px" );
        }
    },5)
}