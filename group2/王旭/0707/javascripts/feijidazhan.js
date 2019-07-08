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
        Enemy.enemyCreater();
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
            width : this.ele.offsetWidth,
            height : this.ele.offsetHeight
        }
        on(document , "mousemove" , this.planeMove.bind(this));
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
        //console.log(e.clientX,e.clientY);
        let { x , y } = this.boundary( e.clientX - this.ele_size.width / 2 , e.clientY - this.ele_size.height / 2); 
        Plane.x = x;
        Plane.y = y;
        //console.log(this.ele_size.width / 2,this.ele_size.height / 2);
        this.ele.style.left = x + "px";
        this.ele.style.top  = y + "px";
        //console.log(this.ele.style.left,this.ele.style.top);
    }

    boundary(x,y){
        //console.log(y);
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
        let speed = 100;
        switch(Core.hardLeval){
            case 0 :
                speed = 500;
                break;
            case 1 :
                speed = 300;
                break;
            case 2 :
                speed = 200;
                break;
            case 3 :
                speed = 100;
                break;
        }
        setInterval(() =>{
            new Bullet();
        },speed)
    }
    static x;
    static y;
    static plane_size;
}

class Bullet{
    constructor(){
        this.speed = 20;
        //只创建一个子弹列运动定时器
        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval(() =>{
                this.bulletMove();
            },50)
        }
        //只创建一个子弹列表
        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
        this.init();

    }

    init(){
        let ele = this.creatBullet();
        if(Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width  : ele.offsetWidth,
                height : ele.offsetHeight
            }
        }
    }

    creatBullet(){
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);
        let left = Plane.x + Plane.plane_size.width/2-(Bullet.bullet_size ? Bullet.bullet_size.width/2 : ele.offsetWidth/2);
        let  top = Plane.y;
        Bullet.bullet_list.push({
            ele,
            left,
            top,
            die : this.bulletDie.bind(this)
        });
        return ele;
    }

    bulletMove(){
        // 让所有子弹运动
        for(let attr in Bullet.bullet_list){
            let bullet = Bullet.bullet_list[attr];
            if(bullet.top <= -20){
                this.bulletDie(bullet);
                continue;
            }
            bullet.top -= this.speed;
            bullet.ele.style.left = bullet.left + "px";
            bullet.ele.style.top  = bullet.top  + "px"; 
            bullet.top
        }
    }

    bulletDie(bullet){
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index,1);
        bullet.ele.className += "die";
        setTimeout(() =>{
            bullet.ele.remove();
            bullet = false;
        },500)
    }

    static bullet_timer;
    static bullet_list;
    static bullet_size;
}

class Enemy{
    constructor(enemy_type){
        this.main = $(".main");
        this.main_size = {
            width  : this.main.offsetWidth,
            height : this.main.offsetHeight,
            left   : this.main.offsetLeft 
        }
        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval(() =>{
            this.enemyMove();
            this.poomCheck();
        },50)
        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        //className 不同
        //speed不同
        //hp不同
        //die className不同
        this.enemies ={
            "small" : {
                className : "enemy-small",
                speed : 10,
                hp :1,
                dieClassName : "enemy-small-die"
            },
            "middle" : {
                className : "enemy-middle",
                speed : 5,
                hp :10,
                dieClassName : "enemy-middle-die"
            },
            "large" : {
                className : "enemy-large",
                speed : 1,
                hp :50,
                dieClassName : "enemy-large-die"
            }
        }
        enemy_type = enemy_type ? enemy_type : "small";
        this.enemy_date = this.enemies[enemy_type];
        this.init();
    }

    init(){
        this.creatEnemy();
    }

    creatEnemy(){
        let ele = document.createElement("div");
        ele.className = this.enemy_date.className;
        document.body.appendChild(ele);
        Enemy.enemy_list.push({
            ele,
            hp : this.enemy_date.hp,
            left : Enemy.randomLeft(this.main_size.left,this.main_size.left + this.main_size.width - ele.offsetWidth),
            top : 0,
            speed : this.enemy_date.speed,
            width : ele.offsetWidth,
            height : ele.offsetHeight,
            die : this.enemyDie.bind(this)
        });
    }
    
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;
            if(enemy.top >= this.main_size.height - 30){
                this.enemyDie(enemy);
                continue;
            }
            enemy.ele.style.top = enemy.top + "px";
            enemy.ele.style.left = enemy.left + "px";
        }
    }

    enemyDie(enemy){
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index,1);
        enemy.ele.className += " die";
        setTimeout(() =>{
            enemy.ele.remove();
        },1000)
    }

    poomCheck(){
        //碰撞检测
        let bullets = Bullet.bullet_list;
        let enemys = Enemy.enemy_list;
        for(let i = 0,bullet; bullet = bullets[i];i++){
            for(let k = 0,enemy; enemy = enemys[k];k++){
                if(this.poomLeft(enemy,bullet)){
                    if(this.poomTop(enemy,bullet)){
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
    poomLeft(enemy,bullet){
        return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width;
    }

    poomTop(enemy,bullet){
        return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
    }

    static enemy_timer;
    static enemy_list;
    static enemy_size;
    static randomLeft(min,max){
        return min + Math.round(Math.random()*(max-min));
    }
    static enemyCreater(){
        //小敌机创建
        let count = 0;
        setInterval(() => {
            count ++;
            Math.random() > 0.5 ? new Enemy() : "";
            count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
            count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";
        },1000)
    }
}

new Core();
let plane = new Plane();