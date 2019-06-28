/*
**回到顶部
*/
//var gotoTop = document.getElementById("gotoTop");
window.onscroll = function(){
    var scrollTop =  document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop > 382 &&  scrollTop < 3150){
        gotoTop.style.position = "fixed";
        gotoTop.style.top = 537+"px" ;
        gotoTop.style.display = "block";
    }
    else if(scrollTop >3150){
            gotoTop.style.position = "absolute";
            gotoTop.style.top = 3675 +"px";          
    }
    else{
        gotoTop.style.display = "none";
    }
    gotoTop.onclick = function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}


