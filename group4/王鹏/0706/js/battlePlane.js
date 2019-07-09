/**
 * 1. 核心部分 => 难度选择，开场动画，计分，暂停...
 * 2. 飞机     => 跟随移动
 * 3. 子弹     => 飞行移动 , 和敌机的交互(击落)
 * 4. 敌机     => 分类 , 小中大。
 * 
 *  */

let { on, $ } = Utils;

/**
 * 核心部分
 * 1. logo显示
 * 2. 飞机加载动画
 * 3. 背景运动
 */
class Core {
    constructor() {
        this.main = $(".main");
        this.option = $(".options");
        this.init();
    }
    init() {
        // 按钮事件绑定
        on(this.option, "click", this.handlerClick.bind(this));
    }
    handlerClick(evt) {
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName !== "P") {
            return false;
        }
        // 获取下标
        this.setHardLevel(target);
        console.log(Core.hardLevel);
        // 清场
        this.clearAll();
        // 显示logo
        this.showAll();
        // 显示加载动画 获取游戏难度 背景移动
        this.animate();
        
        setTimeout(() => {
            this.clearAll();
            // 游戏正式开始
            this.gameStart();
        },1000);
    }

    clearAll(){
        this.option ? this.option.remove() : "";
        this.logo ? this.logo.remove() : "";
        this.plane_loading ? this.plane_loading.remove() : "";
    }
    setHardLevel(target){
        Core.hardLevel = Array.from(target.parentNode.children).indexOf(target)
    }
    showAll(){
        this.logo = Core.createEle("logo");
        this.plane_loading = Core.createEle("plane-loading");
        
    }
    animate(){
        this.plane_loading.className += " load";
        let positionY = 0;
        let speed = 2;
        switch(Core.hardLevel){
            case 0 : speed = 6; break;
            case 1 : speed = 4; break;
            case 2 : speed = 2; break;
            case 3 : speed = 6; break;
        }
        this.bg_moving = setInterval(() => {
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        },40);
    }
    gameStart(){
        console.log("kaishile ");
        plane.init().fire();
    }


    static createEle(className){
        let ele = document.createElement("div");
        ele.className = (className);
        document.body.appendChild(ele);
        return ele;
    }
    static hardLevel;
}

// 玩家飞机
class Plane{

    init(){
        this.main = $(".main");
        this.ele = this.createPlane();
        Plane.plane_size = {
            width : this.ele.offsetWidth
        }
        this.mainSize = {
            left : this.main.offsetLeft,
            width : this.main.offsetWidth,
            height : this.main.offsetHeight
        }
        this.eleSize = {
            width : this.ele.offsetWidth,
            height : this.ele.offsetHeight
        }
        on(document, "mousemove", this.planeMove.bind(this));
        return this;
    }
    createPlane(){
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "plane";
        ele.style.cursor = "none";
        document.body.appendChild(ele);
        ele.style.left = cWidth / 2 - ele.offsetWidth / 2 + "px";
        
        return ele;

    }
    planeMove(evt){
        let e = evt || window.event;
        let {x, y} = this.boundary(e.clientX - this.eleSize.width / 2, e.clientY - this.eleSize.height / 2);
        this.ele.style.left = x + "px";
        this.ele.style.top = y + "px";
    }
    boundary(x, y){
        let minX = this.mainSize.left;
        let maxX = this.mainSize.left + this.mainSize.width - this.eleSize.width;
        let maxY = this.mainSize.height - this.eleSize.height;
        x = x < minX ? minX : x;
        x = x > maxX ? maxX : x;
        y = y < 0 ? 0 : y;
        y = y > maxY ? maxY : y;
        return{
            x,
            y
        };
    }

    fire(){
        let frequency = 100;
        switch(Core.hardLevel){
            case 0 : frequency = 500; break;
            case 0 : frequency = 300; break;
            case 0 : frequency = 200; break;
            case 0 : frequency = 100; break;
        }
        setInterval(() => {
            new Bullet();
        }, frequency);
    }
    static plane_size;
    static x;
    static y;
}


// 子弹
class Bullet{
    constructor(){
        this.speed = 20;


        this.init();
    }
    init(){
        let ele = this.createBullet();
    }
    createBullet(){
        let ele  = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);
    }


}

// 仅创建出了子弹， 









new Core();
let plane = new Plane();

