//   1. 核心部分 => 难度选择，开场动画，计分，暂停...
//   2. 飞机     => 跟随移动
//   3. 子弹     => 飞行移动 , 和敌机的交互(击落)

let{$,on} = Utils;
class Core{
    
    //难度选择，开场动画
    constructor(){
        this.option = $(".options");
        this.main = $(".main");
        this.init();
    }
    init(){
        on(this.option,"click",this.hanlderClick.bind(this))
    }
    hanlderClick(evt){
        //console.log(1);
        let e = evt || event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "P") return false;
        //获取难度
        this.setHardLevel(target);
       //s console.log(1);
        //清场
        this.clearAll();
        //logo入场
        this.showAll();
        //飞机动画入场
        this.animate();
        //开始游戏
        setTimeout(() => {
            this.clearAll();
            this.gameStart();
        },2000)
    }
    setHardLevel(target){
        Core.hardLeval = Array.from(target.parentNode.children).indexOf(target);
        //console.log(Core.hardLeval);
    }
    
    clearAll(){
        this.option ? this.option.remove() : "";
        clearInterval(this.loading);
        this.logo ? this.logo.remove() : "";
        this.plane_loading ? this.plane_loading.remove() : "";
    }

    showAll(){
        this.logo = Core.createEle("logo");
        this.plane_loading = Core.createEle("plane-loading");
    }

    animate(){
        let index = 0;
        this.loading = setInterval( () =>{
            this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3 + 1}.png)`;

        },800 )
        let positionY = 0;
        let speed = 5;
        //console.log(Core.hardLeval);
        switch(Core.hardLeval){
            case 0 : speed = 20; break;
            case 1 : speed = 8; break;
            case 2 : speed = 5; break;
            case 3 : speed = 20; break;
        }
        this.bg_moving = setInterval(() =>{
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        },50)
    }
    gameStart(){
        plane.init().fire();
        //Enemy.enemyCreater();
    }

    static createEle(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }

    static hardLeval;
}

class Plane{
    constructor(){

    }
    init(){
        this.ele = this.createPlane();
        this.main = $(".main");
        Plane.plane_size = {
            width : this.ele.offsetWidth
        }
        this.main_size = {
            left  : this.main.offsetLeft,
            width : this.main.offsetWidth
        }
        this.ele_size = {
            width : this.offsetWidth,
            height : this.offseteHeight
        }
        on(document,"mousemove",this.planeMove.bind(this));
        return this;
    }
    createPlane(){
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "plane";
        ele.style.cursor = "none";
        document.body.appendChild(ele);
        ele.style.left = (cWidth - ele.offsetWidth)/2 + "px";
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop;
        return ele;
    }
    planeMove(evt){
        
        let e = evt || event ;
        console.log(e.clientY);
        let { x , y } = this.boundary( e.clientX - this.ele_size.width / 2 , e.clientY - this.ele_size.height / 2); 
        Plane.x = x;
        Plane.y = y;
        this.ele.style.left = x + "px";
        this.ele.style.top  = y + "px";
        //console.log(this.ele.style.top);
    }

    boundary(x,y){
        console.log(y);
        let minX = this.main_size.left;
        let maxX = this.main_size.left + this.main_size.width - this.ele_size.width;
        x = x < minX ? minX : x;
        x = x > maxX ? maxX : x;
        y = y < 0 ? 0 : y;
        return {
            x,
            y
        }
    }

    fire(){
        
    }
    static x;
    static y;
    static plane_size;
}

class Bullet{

}

class Enemy{

}

new Core();
let plane = new Plane();