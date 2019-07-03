//创建烟花 => 烟花上升功能 => 烟花爆炸功能
function Fireworks(selector){
    this.main=document.querySelector(selector);
    //参数合法性验证
    if(this.main===null) return false;
    this.init();
}
//绑定事件
Fireworks.prototype.init = function(){
    this.main.addEventListener("click",this.handleFireWorks.bind(this));
}
//控制器，首要存在的目的是解耦
Fireworks.prototype.handleFireWorks=function(evt){
    var e = evt || window.event;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    //this => 实例对象
    //创建一个随机颜色的烟花
    // var firework=this.createFireWorks();
    // firework.style.left=offsetX+"px";
    // firework.style.bottom=0;
    // this.main.appendChild(firework);
    var firework=this.fireworkInit(offsetX)
    //console.log(offsetX,offsetY);
    this.fireworksMove(firework,offsetY,this.fireworksBoom.bind(this,offsetX,offsetY));
}
//烟花创建
Fireworks.prototype.createFireWorks=function(){
    //创建元素 => 运算 => 放入页面中
    var firework = document.createElement("div");
    firework.className = "firework";
    firework.style.background = randomColor(); 
    // this.main.appendChild(firework);
    //console.log(firework.style.background);
    return firework;  
}
//烟花初始化
Fireworks.prototype.fireworkInit=function(offsetX){
    var firework=this.createFireWorks();
    firework.style.left=offsetX+"px";
    firework.style.bottom=0;
    this.main.appendChild(firework);
    return firework;
}
//烟花上升
Fireworks.prototype.fireworksMove=function(firework,offsetY,boomCallback){
    move(firework,{
        top:offsetY
    },function(){
        firework.remove();
        boomCallback();
    });
}
//烟花爆炸
Fireworks.prototype.fireworksBoom=function(offsetX,offsetY){
    //console.log(offsetX,offsetY);
    //起始点到终点
    var randomFireworksCount = 25+Math.round(Math.random()*10);
    var blank=Math.round(360/randomFireworksCount);
    var r=50+Math.round(Math.random()*50);
    var angle=0;
    for(var i=0;i<randomFireworksCount;i++){
        angle+=blank;
        var fireX=Math.round(Math.cos(Math.PI/180*angle)*r+offsetX);
        var fireY=Math.round(Math.sin(Math.PI/180*angle)*r+offsetY);
        //console.log(fireX,fireY);
        var fireboom=this.createFireWorks();
        //console.log(fireboom);
        fireboom.style.left=offsetX+"px";
        fireboom.style.top=offsetY+"px";
        this.main.appendChild(fireboom);
        //console.log(fireX,fireY);
        move(fireboom,{
            left:fireX,
            top:fireY,
            opacity:0
        },function(fireboom){
            fireboom.remove();
        }.bind(false,fireboom))
    }
}
//随机颜色
function randomColor(){
    return "#"+ Math.round(parseInt("ffffff",16)*Math.random()).toString(16).padStart(6,"0");
}
//多属性的运动框架
function move(dom,options,callback){
    clearInterval(dom.timer);
    dom.timer=setInterval(function(){
        for(var attr in options){
            var now = attr==="opacity"?parseInt(getComputedStyle(dom)[attr]*100):parseInt(getComputedStyle(dom)[attr]);
            var speed = (options[attr]-now)/10 > 0 ? Math.ceil((options[attr]-now)/10):Math.floor((options[attr]-now)/10);
            if(options[attr]===now){
                delete options[attr];
                if(Object.keys(options).length===0){
                    clearInterval(dom.timer);
                    typeof callback === "function" ? callback() : "" ;
                }
            }else{
                dom.style[attr]= attr==="opacity" ? (now+speed)/100:now+speed+"px";
            }
        }
    },50)
}
//实例化一个对象
new Fireworks("#container");