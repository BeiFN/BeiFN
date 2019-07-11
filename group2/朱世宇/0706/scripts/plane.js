/**
 * 1. 核心部分 => 难度选择 开场动画 计分 暂停
 * 2. 飞机 => 跟随运动
 * 3. 敌机 => 分类 小中大
 * 4. 子弹 => 飞行移动 和敌机的交互
 * 
 */
let {$ , on} = Utils;

class Core{
    constructor(){
        this.option = $(".options");
        this.init();
    }
    init(){
        on(this.option , this.handlerClick.bind(this));
    }
    handlerClick(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "P") return false;
    }
    showPlaneAnimate(){
        let ele = document.createElement("div");
        ele.className = "";
        document.body.appendChild(ele);
    }
    animate(){
        this.loading = setInterval(() => {
            this.plane_loading.style.backgroundImage = "url()"
        },800)
        this.bg_moving = setInterval(() =>{
            
        },50)
    }
}

class Plane{
    constructor(){

    }
    init(){

    }
}

//单计时器子弹；
class Bullet{
    constructor(){

    }
    init(){
        this.createEle();
    }
    createEle(){
        let ele = document.createElement();
        ele.className = "";
        document.body.appendChild();
        return ele;
    }
    eleMove(){
        setInterval(() => {
            
        },50);
    }
}

class Utils{
    static $(selector){
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;  
    }
    static on(dom  ,eventType ,handlerEvent){
        dom.addEventListener(eventType ,handlerEvent);
    }
}