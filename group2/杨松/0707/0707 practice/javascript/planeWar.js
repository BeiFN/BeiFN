// 核心部分;
class Core{
    constructor(){
        // 核心元素;
        this.option = $(".options");
        this.main   = $(".main");
        // 初始化功能;
        this.init();
    }
    init(){
        // 绑定事件;
        on(this.option , "click" , this.handlerClick.bind(this));
        this.main.style.cursor = "pointer";
    }
    handlerClick(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "P") return false;
        // 获取下标;
        this.setHardLevel(target);
        // 清场;
        this.clearAll();
        // 显示logo;
        this.showAll();
        // 显示飞机动画;
        this.animate();
        setTimeout( () => {
            this.clearAll();
            this.gameStart();
        } , 1000)
    }
    //清除logo和加载
    clearAll(){
        this.option ? this.option.remove() :"";
        clearInterval(this.loading);
        this.logo? this.logo.remove() : "";
        this.plane_loading? this.plane_loading.remove(): "";
    }
    //设置等级
    setHardLevel(target){
        Core.hardLevel = Array.from(target.parentNode.children).indexOf(target);
    }
    //显示logo和加载
    showAll(){
        this.logo = Core.createEle("logo");
        this.plane_loading = Core.createEle("plane-loading");
    }
    //背景运动
    animate(){
        let index = 0;
        this.loading = setInterval( ()=>{
            // console.log(this)  => 实例对象;
            this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3 + 1}.png)`;
        } , 1500);

        let positionY = 0;
        let speed     = 5;
        switch(this.hardLevel){
            case 0 : speed = 20;break;
            case 1 : speed = 8;break;
            case 2 : speed = 5;break;
            case 3 : speed = 20;break;
        }
        this.moving = setInterval( ()=>{
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        } , 50)
    }
    // 游戏开始
    gameStart(){
        plane.init().fire();
        Enemy.enemyCreater();
    }
    //创建logo和加载游戏
    static createEle(className){
        let   ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
    static hardLevel;
}

// 功能调用;
class Plane{
    constructor(){

    }
    //初始化
    init(){
        this.ele = this.createPlane();
        this.main = $(".main");
        Plane.plane_size = {
            width:this.ele.offsetWidth
        };
        this.mainSize = {
            left  : this.main.offsetLeft,
            width : this.main.offsetWidth
        };
        this.eleSize = {
            width  : this.ele.offsetWidth,
            height : this.ele.offsetHeight
        };
        on(this.ele , "mousemove" , this.planeMove.bind(this));

        // 返回实例对象操作实际上是用于连缀的;
        return this;
    }
    //飞机移动
    planeMove(evt){
        let e = evt || window.event;
        let { x , y } = this.boundary( e.clientX - this.eleSize.width / 2 , e.clientY - this.eleSize.height / 2);
        Plane.x = x;
        Plane.y = y;
        this.ele.style.left = x + "px";
        this.ele.style.top  = y + "px";
    }
    //边界检测
    boundary(x,y){
        let minX =  this.mainSize.left;
        let maxX =  this.mainSize.left + this.mainSize.width - this.eleSize.width ;
        x = x < minX ? minX : x;
        x = x > maxX ? maxX : x;
        y = y < 0 ? 0 : y;
        return {x , y}
    }
    //创建飞机
    createPlane(){
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "plane";
        ele.style.cursor = "pointer";
        document.body.appendChild(ele);
        ele.style.left = cWidth/2 - ele.offsetWidth / 2 + "px";
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop;
        return ele;
    }

    fire(){
        let frequency = 100;
        switch(Core.hardLevel){
            case 0 :frequency = 500;break;
            case 1 :frequency = 300;break;
            case 2 :frequency = 200;break;
            case 3 :frequency = 100;break;
        }
        setInterval( ()=>{
            new Bullet();
        } , frequency)
    }

    static x ;
    static y ;
    static plane_size;
}


// 加入子弹;
class Bullet{
    constructor(){
        this.speed = 30;
        // 创建一个子弹运动定时器;
        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval( ()=> {
                this.bulletMove();
            },50)
        }
        // 确保只创建一个子弹列表;
        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
        this.init();
    }
    init(){
        let ele = this.createBullet();
        if(Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width  : ele.offsetWidth,
                height : ele.offsetHeight
            }
        }

    }
    //创建子弹
    createBullet(){
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);
        let left =  Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
        let top = Plane.y;
        Bullet.bullet_list.push({
            ele ,
            left,
            top ,
            die : this.bulletDie.bind(this)
        });

        return ele;
    }
    //子弹移动
    bulletMove(){
        // console.log("让所有的子弹运动");
        for(let attr in Bullet.bullet_list){
            let bullet = Bullet.bullet_list[attr];
            if(bullet.top <= -20){
                this.bulletDie(bullet);
                continue ;
            }
            bullet.ele.setAttribute("data","move");
            bullet.top -= this.speed ;
            bullet.ele.style.top  =  bullet.top + "px";
            bullet.ele.style.left =  bullet.left + "px";
        }
    }
    //子弹死亡动画
    bulletDie(bullet){
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index,1);
        bullet.ele.className += " die";
    // 等待动画完成;
        setTimeout( ()=>{
            bullet.ele.remove();
            bullet = false;// 清除引用;
        },500)
    }

    static bullet_timer;
    static bullet_list;
    static bullet_size;
}

//加入敌机
class Enemy{
    constructor( enemy_type ){
        this.main = $(".main");
        this.mainSize = {
            width  : this.main.offsetWidth,
            height : this.main.offsetHeight,
            left   : this.main.offsetLeft
        };

        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        this.enemies = {
            "small" : {
                className : "enemy-small",
                speed     : 10,
                hp        : 1,
                dieClassName : "enemy-small-die"
            },
            "middle" : {
                className : "enemy-middle",
                speed     : 5,
                hp        : 10,
                dieClassName : "enemy-middle-die"
            } ,
            "large" : {
                className : "enemy-large",
                speed     : 1,
                hp        : 30,
                dieClassName : "enemy-large-die"
            }
        };
        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval( ()=>{
            this.enemyMove();
        },50);
        enemy_type = enemy_type ? enemy_type : "small";
        this.enemy_data = this.enemies[enemy_type];
        this.init();
    }
    init(){
        this.createEnemy();
    }
    createEnemy(){
        let ele = document.createElement("div");
        ele.className = this.enemy_data.className;
        document.body.appendChild(ele);
        Enemy.enemy_list.push({
            ele,
            hp : this.enemy_data.hp,
            left : Enemy.randomLeft(this.mainSize.left , this.mainSize.left + this.mainSize.width - ele.offsetWidth ),
            top : 0 ,
            speed : this.enemy_data.speed,
            width : ele.offsetWidth,
            height : ele.offsetHeight,
        })

    }
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;
            enemy.ele.style.top = enemy.top + "px";
            enemy.ele.style.left = enemy.left + "px";
        }
    }
    static enemy_timer ;
    static enemy_list ;
    static enemy_size  ;
    static randomLeft(min , max){
        return  min + Math.round(Math.random() * (max - min));
    }
    static enemyCreater(){
        // 1. 小敌机创建;
        let count = 0;
        setInterval( ()=>{
            count ++ ;
            Math.random() > 0.5 ? new Enemy() : "";
            count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
            count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";
        } , 1000)
    }

}
function $(selector){
    let ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
function on( dom , eventType,  handlerEvent ){
    dom.addEventListener(eventType,handlerEvent);
}
new Core();
let plane =  new Plane();
