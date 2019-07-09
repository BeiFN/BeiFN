let { $ , on , createEle} = Utils;

//主界面类;
class Core{
    constructor(){
        this.option = $(".options");
        this.main   = $(".main");

        this.init();
        //loading飞机的背景图列表
        this.loading_background_img_list = [
            "https://upload-images.jianshu.io/upload_images/18473112-30f576b06cf5b158.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "https://upload-images.jianshu.io/upload_images/18473112-d892f2d98c04e4d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "https://upload-images.jianshu.io/upload_images/18473112-23d101c7de021832.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        ]
    }

    //游戏难度;
    static hard_level;

    //事件绑定函数;
    init(){
        on(this.option , "click" , this.handlerClick.bind(this));
    }

    //点击事件处理函数;
    handlerClick(evt){
        let e = evt || event;
        let target = e.target || e.srcElement;

        if(target.nodeName !== "P")  return false;

        //获取点击的元素的下标;
        this.getHardLevel(target);

        //清空界面;
        this.clearAll();

        //显示logo
        this.showAll();

        //显示过场飞机动画
        this.animate();

        //过场动画过后清空动画画面
        setTimeout( ()=>{
            this.clearAll();
            this.gameStart();
        },1000);
    }

    //获取游戏难度函数;
    getHardLevel(target){
        Core.hard_level = Array.from(target.parentNode.children).indexOf(target);
        // console.log(1);
    }

    //清空函数;
    clearAll(){
        this.option ? this.option.remove() : "";
        clearInterval(this.loading);
        this.logo ? this.logo.remove() : "";
        this.plane_loading ? this.plane_loading.remove() : "";
    }

    //显示游戏logo
    showAll(){
        this.logo = createEle("logo");
        this.plane_loading = createEle("plane-loading");
    }

    //飞机loading动画函数
    animate(){
        let index = 0;
        this.loading = setInterval( () => {
            this.plane_loading.style.backgroundImage = `url(`+this.loading_background_img_list[++index % 3]+`)`;
        },300);

        let positionY = 0;
        let speed     = 5;

        //根据难度等级决定背景运动的快慢;
        switch(this.hard_level){
            case 0 : speed = 20;break;
            case 1 : speed = 8;break;
            case 2 : speed = 5;break;
            case 3 : speed = 20;break;
        }

        this.big_moving = setInterval( ()=>{
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        })
    }

    //游戏开始
    gameStart(){
        // plane.init().fire();
        let plane = new Plane();
        // plane.init();
        plane.fire();
        Enemy.enemyCreater();
    }

}

//主角飞机类
class Plane{
    constructor(){
        this.main = $(".main");

        this.init();
    }

    init(){
        this.plane = this.createPlane();
        Plane.plane_size = {
            width : this.plane.offsetWidth,
            height: this.plane.offsetHeight
        }

        this.main_size = {
            left : this.main.offsetLeft,
            width: this.main.offsetWidth
        }

        on(document , "mousemove" , this.planeMove.bind(this));

        return this;
    }

    //飞机跟随鼠标移动函数
    planeMove(evt){
        let e = evt ||event;

        let{x , y} = this.boundary( e.clientX - Plane.plane_size.width/2 , e.clientY - Plane.plane_size.height/2);

        Plane.x = x;
        Plane.y = y;

        this.plane.style.left = x + "px";
        this.plane.style.top  = y + "px";

        // console.log(x , y);
    }

    //飞机创建及属性设置;
    createPlane(){
        let ele = createEle("plane");
        let cWidth = document.documentElement.clientWidth;
        ele.style.cursor = "none";
        ele.style.left = cWidth/2 - ele.offsetWidth/2 + "px";

        return ele;
    }

    //边界检测
    boundary(x , y){
        let minX = this.main_size.left;
        let maxX = this.main_size.left + this.main_size.width - Plane.plane_size.width;

        x = x < minX ? minX : x;
        x = x > maxX ? maxX : x;

        y = y < 0 ? 0 : y;

        return {
            x,
            y
        }
    }

    fire(){
        let frequency = 100;

        switch(Core.hard_level){
            case 0:
                frequency = 500;
                break;
            case 1:
                frequency = 300;
                break;
            case 2:
                frequency = 200;
                break;
            case 3:
                frequency = 100;
                break;
        }
        setInterval( ()=>{
            new Bullet();
        },frequency);
    }


    static plane_size;
    static x;
    static y;
}

//创建子弹类
class Bullet{
    constructor(){
        this.speed = 20;

        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval( ()=>{
                this.bulletMove();
            },50)
        }

        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
        this.init();
    }

    init(){
        let ele = this.createBullet();

        // console.log(Bullet.bullet_size);

        if(Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width : parseInt(getComputedStyle(ele)["width"]),
                height: parseInt(getComputedStyle(ele)["height"])
            }
        }
        // console.log(getComputedStyle(ele)["height"]);
        
    }

    //创建子弹元素
    createBullet(){
        let ele = createEle("bullet");

        let left = Plane.x + Plane.plane_size.width/2 - (Bullet.bullet_size ? Bullet.bullet_size.width/2 : parseInt(getComputedStyle(ele)["width"])/2);

        

        let top = Plane.y;

        Bullet.bullet_list.push({
            ele,
            left,
            top,
            die : this.bulletDie.bind(this)
        })

        return ele;
    }

    //子弹移动函数
    bulletMove(){
        for(let attr in Bullet.bullet_list){
            let bullet = Bullet.bullet_list[attr];
            if(bullet.top <= 0){
                this.bulletDie(bullet);
                continue;
            }
            bullet.top -= this.speed;
            bullet.ele.style.top = bullet.top + "px";
            bullet.ele.style.left = bullet.left + "px";

            // console.log(bullet.left);
        }
    }

    bulletDie(bullet){
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index , 1);

        bullet.ele.className += " die";

        setTimeout( ()=>{
            bullet.ele.remove();
            bullet = false;
        },500);
    }
    static bullet_timer;
    static bullet_list;
    static bullet_size;
}

//敌机
class Enemy{
    constructor( enemy_type ){
        this.main = $(".main");
        this.main_size = {
            width : this.main.offsetWidth,
            height: this.main.offsetHeight,
            left  : this.main.offsetLeft
        }

        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval( ()=>{
            this.enemyMove();
            this.collisionDetection();
        },50);

        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        
        //敌机属性
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
                hp     : 8,
                dieClassName : "enemy-middle-die"
            },
            "large" : {
                className : "enemy-large",
                speed     : 1,
                hp     : 30,
                dieClassName : "enemy-large-die"
            }
        }
        enemy_type = enemy_type ? enemy_type : "small";
        this.enemy_data = this.enemies[enemy_type];

        this.init();
    }

    init(){
        this.createEnemy();
    }

    createEnemy(){
        let ele = createEle(this.enemy_data.className);
        
        Enemy.enemy_list.push({
            ele,
            hp : this.enemy_data.hp,
            left : Enemy.randomLeft(this.main_size.left , this.main_size.left + this.main_size.width - ele.offsetWidth),
            top : 0,
            speed : this.enemy_data.speed,
            width : ele.offsetWidth,
            height:ele.offsetHeight,
            die : this.enemyDie.bind(this)
        })
    }

    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;

            //特别条件判断
            if(enemy.top >= this.main_size.height - 50){
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
        enemy.ele.className += " die";
        setTimeout( ()=>{
            enemy.ele.remove();
        },1000);
    }

    //碰撞检测函数
    collisionDetection(){
        let bullets = Bullet.bullet_list;
        let enemys  = Enemy.enemy_list;


        for(let i = 0, bullet ; bullet = bullets[i] ; i++){
            for(let j = 0 , enemy ; enemy = enemys[j] ; j++){
                if(this.collisionLeft(enemy,bullet)){
                    if(this.collisionTop(enemy,bullet)){
                        bullet.die(bullet);
                        enemy.hp--;
                        if(enemy.hp <= 0){
                            enemy.die(enemy);
                        }
                    }
                }
            }
        }
    }

    collisionLeft(enemy , bullet){
        return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width;
    }

    collisionTop(enemy , bullet){
        return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
    }

    static enemyCreater(){
        let count = 0;
        setInterval( ()=>{
            count ++;
            Math.random() > 0.5 ? new Enemy() : "";
            count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
            count % 10 === 0 ? (Math.random() <0.9 ? new Enemy("large") : "") : "";
        },1000);
    }
    static enemy_list;
    static enemy_timer;
    static enemy_size;
    static randomLeft(min , max){
        return min+Math.round(Math.random() * (max - min));
    }
}

new Core();
// let plane = new Plane();
