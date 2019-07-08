/* *
 * 1. 核心部分=>难度选择，开场动画，计分，暂停...
 * 2. 飞机   =>跟随移动
 * 3. 子弹   => 飞行移动，  和敌机的交互（击落）
 * 4. 敌机   => 分类 ，小中大。
 * 
 * */

let { $ , on } = Utils;

//核心部分；
//1.logo入场；
//2.飞机动画；
//3.背景运动；

class Core{
    constructor(){
        //核心元素
        this.option = $(".options");
        this.main   = $(".main");
        //初始化功能
        this.init();
    }
    init(){
        //绑定事件
        on(this.option , "click" , this.handlerClick.bind(this));
    }
    handlerClick(evt){
        //处理耦合关系；
        //记录当前元素的下标；
        //简单委托；
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !=="P") return false;
        //获取下标；
        this.setHardLevel(target);
        //清场
        this.clearAll();
        //显示logo;
        this.showAll();
        //显示飞机动画；
        this.animate();
        setTimeout( () =>{
            this.clearAll();
            this.gameStart();
        } , 1000)
    }
    clearAll(){
        this.option ? this.option.remove() :"";
        clearInterval(this.loading);
        this.logo? this.logo.remove() :"";
        this.plane_loading ? this.plane_loading.remove():"";
    }
    setHardLevel(target){
        Core.hardLevel = Array.from(target.parentNode.children).indexOf(target);
    }
    showAll(){
        this.logo = Core.createEle("logo");
        this.plane_loading = Core.createEle("plane-loading");
    }
    animate(){
        let index = 0;
        this.loading = setInterval( ()=>{//初始页面从左向右的小飞机
            this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3 + 1 }.png)`;
        },800)

        let positionY = 0;
        let speed     = 5;

        switch(this.hardLevel){//难度系数
            case 0 : speed = 20;break;
            case 1 : speed = 8;break;
            case 2 : speed = 5;break;
            case 3 : speed = 20;break;
        }
        this.bg_moving = setInterval( ()=>{//背景图片移动
            positionY += speed;
            this.main.style.backgroundPositionY = positionY +"px";
        }, 50)
    }
    gameStart(){
        //游戏开始了
        plane.init().fire();
        Enemy.enemyCreater();
    }
    static createEle(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
    static hardLevel;
}
//功能调用；
class Plane{
    constructor(){

    }
    init(){
        this.ele = this.createPlane();
        this.main = $(".main");
        Plane.plane_size = {
            width:this.ele.offsetWidth//获取飞机的宽度
        }
        this.mainSize = {
            left :this.main.offsetLeft,//获取主体距离窗口的左边距
            width:this.main.offsetWidth//获取主体的宽度
        }
        this.eleSize = {
            width :this.ele.offsetWidth,
            height:this.ele.offsetHeight
        }
        //1.创建元素并放入页面之中
        on(document ,"mousemove", this.planeMove.bind(this));
        //返回实例对象操作实际上是用于连缀的；
        return this;
    }
    planeMove(evt){
        let e = evt || window.event;
        let { x , y }=this.boundary( e.clientX - this.eleSize.width / 2 , e.clientY - this.eleSize.height / 2);
        Plane.x = x;
        Plane.y = y;
        this.ele.style.left = x + "px";
        this.ele.style.top  = y + "px";
    }
    boundary(x,y){//边界检测
        let minX = this.mainSize.left;
        let maxX = this.mainSize.left + this.mainSize.width - this.eleSize.width;
        x = x < minX ? minX : x;
        x = x > maxX ? maxX : x;

        y = y < 0 ? 0 : y;
        return {
            x,
            y
        }
    }
        createPlane(){
            let ele = document.createElement("div");
            let cWidth = document.documentElement.clientWidth;
            ele.className ="plane";
            ele.style.cursor = "none";
            document.body.appendChild(ele);
            ele.style.left = cWidth/2 - ele.offsetWidth/2 + "px";
            Plane.x = ele.offsetLeft;
            Plane.y = ele.offsetTop;
            return ele;
 1   }
 fire(){
      let frequency = 100;
      switch(Core.hardLevel){
            case 0 :
                frequency =500;
                break;
            case 1 :
                frequency =300;
                break;
            case 2 :
                frequency =200;
                break;
            case 3 :
                frequency =100;
                break;
      }

      setInterval(()=>{
          new Bullet();
      },frequency)
 }
    static x;
    static y;
    static plane_size;
}

//单计时器子弹
//原始版本子弹；
class Bullet{
    constructor(){
        this.speed = 20;
        //确保无论多少次实例，我也只创建一个定时器，创建一个统一的子弹列表；
        //确保只创建一个子弹运动定时器；
        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval(()=>{
                this.bulletMove();
            },50)
        }
        //确保只创建一个子弹列表；
        if(Bullet.bullet_list ===undefined){
            Bullet.bullet_list = [];
        }
        this.init();
    }
    init(){
        let ele = this.createBullet();

        if(Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width : ele.offsetWidth,
                height :ele.offsetHeight
            }
        }
    }

    createBullet(){
         let ele =document.createElement("div");
         ele.className = "bullet";
         document.body.appendChild(ele);

         let left = Plane.x + Plane.plane_size.width / 2 -(Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
         let top = Plane.y;

         Bullet.bullet_list.push({
             ele ,
             left,
             top,
             die :this.bulletDie.bind(this)
         })
         return ele;
        }
        bulletMove(){
            for(let attr in Bullet.bullet_list){
                let bullet = Bullet.bullet_list[attr];
                if(bullet.top<=-20){
                    this.bulletDie(bullet);
                    continue;
                }
                bullet.ele.setAttribute("data","move");
                bullet.top -=this.speed ;
                bullet.ele.style.top = bullet.top + "px";
                bullet.ele.style.left =bullet.left + "px";
            }
        
        }

        bulletDie(bullet){
            let index = Bullet.bullet_list.indexOf(bullet);
            Bullet.bullet_list.splice(index,1);
            bullet.ele.className +="die";

            //等待动画完成；
            setTimeout(()=>{
                bullet.ele.remove();
                bullet = false;//清除引用；
            },500)
        }
        static bullet_timer;
        static bullet_list;
        static bullet_size;
}
class Enemy{
    constructor( enemy_type ){
        this.main = $(".main");
        this.mainSize = {
            width  : this.main.offsetWidth,
            height : this.main.offsetheight,
            left   : this.main.offsetLeft
        }
        Enemy.enemy_timer ? "":Enemy.enemy_timer = setInterval(()=>{
            this.enemyMove();
            //碰撞检测
            this.collisionDetection()
        },50);
        Enemy.enemy_list ? "" :Enemy.enemy_list = [];

        this.enemies = {
            "small" : {
                className : "enemy-small",
                speed     : 10,
                hp        : 1,
                dieClassName : "enemy-small-die"
            },
            "middle" : {
                className : "enemy-middle",
                speed     :5,
                hp        :10,
                dieClassName: "enemy-middle-die"
            },
            "large" : {
                className :"enemy-large",
                speed     :1,
                hp        :50,
                dieClassName :"enemy-largr-die"
            }
        }
        enemy_type = enemy_type ? enemy_type: "small";
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
            hp:this.enemy_data.hp,
            left: Enemy.randomLeft(this.mainSize.left , this.mainSize.left + this.mainSize.width - ele.offsetWidth),
            top : 0,
            speed: this.enemy_data.speed,
            width : ele.offsetWidth,
            height : ele.offsetHeight,
            die : this.enemyDie.bind(this)
        })
    }
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;

            if(enemy.top >=this.mainSize.height - 50){
                this.enemyDie(enemy);
                continue;
            }
            enemy.ele.style.top = enemy.top + "px";
            enemy.ele.style.left = enemy.left + "px";
        }
    }
    enemyDie(enemy){
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index , 1);
        enemy .ele.className += " die";
        setTimeout(()=>{
            enemy.ele.remove();
        },1000)
    }
    collisionDetection(){
        //碰撞检测
        let bullets = Bullet.bullet_list;
        let enemys = Enemy.enemy_list;
        //双层循环比对；
        for(let i=0,bullet ; bullet= bullets[i]; i++){
            for(let k =0,enemy;enemy = enemys[k] ; k++){
                if(this.collisionLeft(enemy,bullet)){
                    if(this.collisionTop(enemy,bullet)){
                        bullet.die(bullet);
                        enemy.hp--
                        if(enemy.hp <= 0){
                            enemy.die(enemy);
                        }
                    }
                };
            }
        }
    }
    collisionLeft(enemy,bullet){
        return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width
    }
    collisionTop(enemy,bullet){
        return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top +enemy.height;
    }
    static enemy_timer;
    static enemy_list;
    static enemy_size;
    static randomLeft(min , max){
        return min + Math.round(Math.random()*(max - min));
    }
    static enemyCreater(){

        //1.小敌机的创建;
        let count = 0;
        setInterval(()=>{
            count ++ ;
            Math.random() > 0.5 ? new Enemy() :"";
            count % 5===0 ?(Math.random()< 0.8 ? new Enemy("middle"): ""):"";
            count % 10===0 ?(Math.random() <0.9 ? new Enemy("large"): ""):"";
        },1000)
    }
}


new Core();
let plane =  new Plane();

