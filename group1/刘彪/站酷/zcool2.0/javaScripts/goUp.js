//回到顶部

var goUp = document.getElementsByClassName("up")[0];

window.addEventListener("scroll",showUpArrow)

function showUpArrow(){
    var scroll_top = document.body.scrollTop || document.documentElement.scrollTop;
     
     if(scroll_top > 3080){
        goUp.style.cssText = " width: 50px;height: 50px;position:absolute;top: 3722px;right: 120px;background: #bbbbbb;border-radius: 8px;z-index: 5;display: block;"
        
     }else if(scroll_top>=560 && scroll_top<=3080 )
     {
        goUp.style.cssText = " width: 50px;height: 50px;position:fixed;bottom: 30px;right: 120px;background: #bbbbbb;border-radius: 8px;z-index: 5;display: block;"
     }
    
}