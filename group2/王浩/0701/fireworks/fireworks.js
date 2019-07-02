//创建烟花 => 烟花上升功能 => 烟花爆炸功能
function Fireworks(selector){
    this.main=document.querySelector(selector);
    //参数合法性验证
    if(this.main===null) return false;
    this.init();
}

Fireworks.prototype.init = function(){
    this.main.addEventListener("click",this.handleFireWorks.bind(this));
}

Fireworks.prototype.handleFireWorks=function(evt){
    //this => 实例对象
    //创建一个随机颜色的烟花
    var e = evt || window.event;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    var firework=this.createFireWorks();
    this.main.appendChild(firework);
    console.log(offsetX,offsetY);
}

Fireworks.prototype.createFireWorks=function(){
    //创建元素 => 运算 => 放入页面中
    var firework = document.createElement("div");
    firework.className = "firework";
    firework.style.background = randomColor(); 
    // this.main.appendChild(firework);
    //console.log(firework.style.background);
    return firework;  
}

Fireworks.prototype.fireworkInit=function(){}

Fireworks.prototype.fireworksBoom=function(){}

Fireworks.prototype.fireworksDisappear=function(){}

//随机颜色
function randomColor(){
    return "#"+ Math.round(parseInt("ffffff",16)*Math.random()).toString(16).padStart(6,"0");
}

function move(dom, options,attr){}



//实例一个对象
new Fireworks("#container");