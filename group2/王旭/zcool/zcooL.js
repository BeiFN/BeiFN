var nav_list = document.getElementById("nav_list");
var nav_menu  = document.getElementById("nav_caidan");
var nav_first = document.getElementById("nav_first");
var nav_second = document.getElementById("nav_second");

var _position = document.getElementById("position");
var nav_position = document.getElementById("nav_position");

var _acticity = document.getElementById("activity");
var nav_activity = document.getElementById("nav_activity");

var _icon = document.getElementById("icon");
var nav_material = document.getElementById("nav_material");

var _class = document.getElementById("_class");
var nav_class = document.getElementById("nav_class");


nav_list.addEventListener("mouseover",handerEjectMenu);
nav_list.addEventListener("mouseout",handerHiddenMenu);
nav_first.addEventListener("mouseover",changeBgColor);
nav_second.addEventListener("mouseover",changeColor);


_acticity.addEventListener("mouseover",handerEjectMenu);
_acticity.addEventListener("mouseout",handerHiddenMenu);
nav_activity.addEventListener("mouseover",changeBgColor);

_position.addEventListener("mouseover",handerEjectMenu);
_position.addEventListener("mouseout",handerHiddenMenu);
nav_position.addEventListener("mouseover",changeBgColor);

_icon.addEventListener("mouseover",handerEjectMenu1);
_icon.addEventListener("mouseout",handerHiddenMenu1);
nav_material.addEventListener("mouseover",changeBgColor);

_class.addEventListener("mouseover",handerEjectMenu);
_class.addEventListener("mouseout",handerHiddenMenu);
nav_class.addEventListener("mouseover",changeBgColor);

//nav_list.onmousemove = handerEjectMenu;
//弹出二级菜单
function handerEjectMenu(){
    this.children[1].style.display = "block";
    this.children[1].style.position = "absolute";
    this.children[1].style.left = 0;
    this.children[1].style.top = this.height + "px";
    this.children[1].style.zIndex = 1000;
}
//隐藏二级菜单
function handerHiddenMenu(){
    this.children[1].style.display = "none";
}
function handerEjectMenu1(){
    this.children[2].style.display = "block";
    this.children[2].style.position = "absolute";
    this.children[2].style.left = 0;
    this.children[2].style.top = 55 + "px";
    this.children[2].style.zIndex = 1000;
}
//隐藏二级菜单
function handerHiddenMenu1(){
    this.children[2].style.display = "none";
}

//改变颜色
function changeBgColor(evt){
    var e = evt || event;
    var target = e.target || e.srcElement;
    //console.log(target.nodeName);
    if(target.nodeName === "A"){
        target.style.backgroundColor = "#ffe300";
    }
    target.addEventListener("mouseout",removeBgChange);
}
//还原颜色
function removeBgChange(){
    //this.removeEventListener("mouseover",changeColor);
    this.style.backgroundColor = "#fff";
}
function changeColor(evt){
    var e = evt || event;
    var target = e.target || e.srcElement;
    if(target.nodeName === "A"){
        target.style.color = "red";
    }
    target.addEventListener("mouseout",removeChange);
}
function removeChange(){
    this.style.color = "#333";
}


//控制回到顶部按钮事件
window.onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop <= 500){
        goTop.style.display = "none";
    }else if(scrollTop <= 3300 && scrollTop >= 500 ){
        goTop.style.cssText = "display:block;position:fixed;top:400px";
    }else if(scrollTop >= 3300){
        goTop.style.position = "absolute";
        goTop.style.top = "3700px";
        goTop.style.display = "block";
        goTop.style.zIndex = "1000";
        //goTop.style.backgroundColor = "red";
       // goTop.removeAttribute("bottom");
        
    }
}

