
/**
 * 1. 核心部分  难度选择，开场动画
 * 2. 飞机  需要跟随鼠标移动
 * 3. 子弹  需要跟随飞机 然后上升移动，与敌机交互
 * 4. 敌机  需要分类 然后下落；
 */

let{ $,on } = Utils;

/**
 *  核心部分
 *  1. log入场
 *  2. 飞机动画
 *  3. 背景运动；
 */
class Core{
    constructor(){
        //选中我们需要的核心元素
        this.main = $(".main");
        this.options = $(".options");

        //初始化函数
        this.init();
    }
    init(){
        //绑定事件
        on(this.options,"click",this.handlerClick.bind(this));
    }
    handlerClick(evt){
        //事件委托
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "P") return false ;
        //获取事件源的下标
        this.getIndex(target);
        // 隐藏options 清除一些元素；
        this.hideAll();
        //显示一些logo
        this.showAll();
        //3s后清除动画和logo等
        setTimeout(()=>{
            this.hideAll();
            this.gameStart();
        },3000)
        
    }
    getIndex(target){
        Core.option_index = Array.from(this.options.children).indexOf(target);
    }
    hideAll(){
        //隐藏options
        this.options.style.display = "none" ;
        clearInterval(this.loading);
        this.logo ? this.logo.remove() : "";
        this.plane_loading ?  this.plane_loading.remove() : "";
    }
    showAll(){
        //显示logo
        this.logo = Core.createEle("logo");
        this.plane_loading = Core.createEle("plane-loading");
        this.animation();
    }
    animation(){
        let loading_src = ["https://upload-images.jianshu.io/upload_images/18448040-6e673624356d3507.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240","https://upload-images.jianshu.io/upload_images/18448040-42abdd682bdde028.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240","https://upload-images.jianshu.io/upload_images/18448040-1dd6ba5c6106d240.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"];
        let index = 0 ;
        let positionY = 0;
        let speed    = 0;
        this.loading = setInterval(()=>{
            this.plane_loading.style.backgroundImage = `url(${loading_src[++index%3]})`;
        },800)
        switch(Core.option_index){
            case 0 : speed = 20; break;
            case 1 : speed = 10; break;
            case 2 : speed = 5; break;
            case 3 : speed = 20; break;
        }
        this.bg_moving = setInterval(()=>{
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        },100)

    }
    gameStart(){
        plane.init().fire();
        Enemy.enemyCreater();
    }

    //创建元素 插入到body
    static createEle(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele ;
    }

    static option_index;
}

/**
 * 创建飞机部分
 */
class Plane{
    constructor(){
        this.main = $(".main");
        Plane.main_size ={
            left : this.main.offsetLeft,
            width : this.main.offsetWidth,
            height : this.main.offsetHeight
        }
    }
    init(){
        //创建飞机
        let plane = this.createPlane();
        //移动飞机
        on(document,"mousemove",this.planeMove.bind(this,plane));
        return this;
    }
    createPlane(){
        let plane = Core.createEle("plane");
        Plane.plane_size = {
            width : plane.offsetWidth,
            height: plane.offsetHeight,
        }
        //把飞机放到屏幕的正中间;
        let cWidth = document.documentElement.clientWidth;
        plane.style.left = cWidth/2 - plane.offsetWidth/2 + "px";
        plane.style.cursor = "none";
        Plane.x = plane.offsetLeft;
        Plane.y = plane.offsetTop;
        return plane;
    }
    planeMove(plane,evt){
        let e = evt || window.event;
        //需要做边界检测
        let {x,y} = this.boundary(e.clientX - plane.offsetWidth/2, e.clientY - plane.offsetHeight/2);
        Plane.x  = x;
        Plane.y  = y;
        plane.style.left = x + "px";
        plane.style.top  = y + "px"
    }
    boundary(x,y){
        let minX = Plane.main_size.left ;
        x = x < minX ? minX : x ;
        let maxX = Plane.main_size.left + Plane.main_size.width - Plane.plane_size.width;
        x = x > maxX ? maxX : x ;
        let maxY = Plane.main_size.offsetHeight - Plane.plane_size.height;
        y = y > maxY ?  maxY : y ;
        let minY = 0;
        y = y < 0 ?  0 : y;
        return {x,y};
    }

    fire(){
        let frequency = 100;
        switch(Core.option_index){
            case 0 :
                frequency = 500;break;
            case 1 :
                frequency = 300;break;
            case 2 : 
                frequency = 200;break;
            case 3 :
                frequency = 100;break;
        }
        setInterval(()=>{
            new Bullet();
        },frequency)
    }

    static x;
    static y;
    static plane_size;
    static main_size;
}

class Bullet{
    constructor(){
        this.speed = 20;
        this.init();
    }
    init(){
        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval(()=>{
                this.bulletMove();
            },50)
        }
        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
        let ele = this.creatBullet();
        if (Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width  : ele.offsetWidth,
                height : ele.offsetHeight
            }
        }
    }
    //创建子弹
    creatBullet(){
        let bullets = Core.createEle("bullet");
        let left = Plane.x +(Plane.plane_size.width/2)-(Bullet.bullet_size ? Bullet.bullet_size.width/2 : bullets.offsetWidth/2) ;
        let top = Plane.y;
        Bullet.bullet_list.push({
            bullets,
            left,
            top,
            die : this.bulletDie.bind(this)
        })
        return bullets;
    }

    //移动子弹
    //记录上一次top值 比对上一次和下一次的值是否相等  相等则说明其没有动  未能解决 
    bulletMove(){
        for(let attr in Bullet.bullet_list){
            let bullet = Bullet.bullet_list[attr];
            let _top = bullet.bullets.style.top ;
            bullet.top -= this.speed;
            bullet.bullets.style.left = bullet.left  + "px";
            bullet.bullets.style.top  = bullet.top   + "px";
            if(bullet.top <= 0 || bullet.top == _top || bullet.top === undefined){
                this.bulletDie(bullet);
            }
        }
       
    }
    //子弹爆炸
    bulletDie(bullet){
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index , 1);
        bullet.bullets.className += " die";
        setTimeout(()=>{
            bullet.bullets.remove();
        },500)
    }


    static bullet_list ;
    static bullet_timer;
    static bullet_size;
}

/**
 * 创建敌机部分
 */
class Enemy{
    constructor(enemy_type){
        this.enemies = {
            "small" : {
                className : "enemy-small",
                speed     : 10 ,
                hp        : 1,
                dieClassName : "enemy-small-die"
            },
            "middle" : {
                className : "enemy-middle",
                speed     : 5 ,
                hp        : 10,
                dieClassName : "enemy-middle-die"
            },
            "large" : {
                className : "enemy-large",
                speed     : 1 ,
                hp        : 10,
                dieClassName : "enemy-large-die"
            }
        }
        enemy_type = enemy_type ? enemy_type : "small"
        this.enemy_data = this.enemies[enemy_type];
        this.init();
    }
    init(){
        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval(()=>{
            this.enemyMove();
            this.collisionDetection();
        },50)
        this.creatEnemy();
    }
    creatEnemy(){
        let enemy_plane = Core.createEle(this.enemy_data.className);
        Enemy.enemy_list.push( {
            enemy_plane,
            hp : this.enemy_data.hp,
            left : Enemy.randomLeft(Plane.main_size.left,Plane.main_size.left + Plane.main_size.width - enemy_plane.offsetWidth),
            top : 0,
            speed : this.enemy_data.speed,
            width : enemy_plane.offsetWidth,
            height: enemy_plane.offsetHeight,
            die : this.enemyDie.bind(this)
        })
    }
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;
            enemy.enemy_plane.style.left = enemy.left + "px";
            enemy.enemy_plane.style.top  = enemy.top  + "px";
            if(enemy.top >= Plane.main_size.height - enemy.height){
                this.enemyDie(enemy);
            }
        }
    }
    enemyDie(enemy){
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index,1);
        enemy.enemy_plane.className += " die";
        setTimeout(()=>{
            enemy.enemy_plane.remove();
        },1000);
    }
    //碰撞检测
    collisionDetection(){
        let bullets = Bullet.bullet_list;
        let enemies = Enemy.enemy_list;
        for(let i = 0 , bullet ; bullet = bullets[i] ; i ++){
            for(let k = 0 , enemy ; enemy = enemies[k] ; k ++){
                if(this.collisionLeft(enemy,bullet)){
                    if(this.collisionTop(enemy,bullet)){
                        bullet.die(bullet);
                        enemy.hp --;
                        if(enemy.hp <= 0){
                            enemy.die(enemy);
                        }
                    }
                }
            }
        }


    }
    collisionLeft(enemy,bullet){
        return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width;
    }
    collisionTop(enemy,bullet){
        return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
    }
    static enemy_list;
    static enemy_timer;
    static randomLeft(min , max){
        return min + Math.round(Math.random()*(max - min));
    }
    static enemyCreater(){
        let count = 0;
        setInterval(()=>{
            count ++ ;
            Math.random() > 0.5 ? new Enemy() : "";
            count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle"): "") : "";
            count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large"): "") : "";

        },1000)
    }
}

new Core();
let plane = new Plane;