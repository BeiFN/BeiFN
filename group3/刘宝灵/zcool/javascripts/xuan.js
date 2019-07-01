var xuan=document.getElementById("xuan");
var goTop =document.getElementById("goTop");
window.onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop >= 626){
          xuan.style.position = "fixed";
          xuan.style.top = "-53px";
    }else{
          xuan.style.position = "static";
          goTop.style.display = "none";
    }
    if(scrollTop >= 3200){
          goTop.style.position = "absolute";
          goTop.style.top = "3660px";
          goTop.style.display = "block";
    }else if(scrollTop < 3200 && scrollTop >= 626){
          goTop.style.cssText = "display:block;position:fixed;top:500px";
    }
}
goTop.onclick = function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


var btn=document.getElementById("btnn");
btn.addEventListener("mouseover",changeBorderColor)
function changeBorderColor(){
    btn.style.border="1px solid black";
}
btn.addEventListener("mouseout",changeInit)
function changeInit(){
    btn.style.border="1px solid #bbb";
}