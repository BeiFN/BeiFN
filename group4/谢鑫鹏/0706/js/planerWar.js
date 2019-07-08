/**
 * 1. 核心部分 => 难度选择，开场动画，计分，暂停...
 * 2. 飞机     => 跟随移动
 * 3. 子弹     => 飞行移动 , 和敌机的交互(击落)
 * 4. 敌机     => 分类 , 小中大。 
 */
let{$, on} = Utils;
/**
 * 核心部分
 * 1. logo入场
 * 2. 飞机动画
 * 3. 背景运动
 */
class Core{
    constructor(){
        // 选择元素
        this.main = $(".main");
        this.options = $(".options");
        // 难度等级
        this.difficultyLevel = 0;
        // 初始化功能
        this.init();
    }
    // 初始化
    init(){
        on(this.options, "click", this.handleClick.bind(this));
    }
    // 处理点击
    handleClick(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "P") return false;
        // 获取难度
        this.getDifficultyLevel(target);
        // 清场
        this.clearAll();
        // 显示logo和飞机动画
        this.showAll();
        // 加载动画
        this.animate();
        // 背景移动
        this.bgMove();
        // 飞机动画结束
        setTimeout(()=>{
            this.clearAll();
            this.gameStart();
        }, 1500)
    }
    // 获取难度
    getDifficultyLevel(target){
        Core.difficultyLevel = Array.from(this.options.children).indexOf(target);
    }
    // 清场
    clearAll(){
        this.options ? this.options.remove() : "";
        clearInterval(this.loading);
        this.logo ? this.logo.remove() : "";
        this.plane_loading ? this.plane_loading.remove() : "";
    }
    // 显示logo和飞机动画
    showAll(){
        this.logo = Core.createEle("logo");
        this.plane_loading = Core.createEle("plane-loading");
    }
    // 加载动画
    animate(){
        let index = 0;
        this.loading = setInterval(()=>{
            this.plane_loading.style.backgroundImage = `url(https://raw.githubusercontent.com/xxp13579/picture/planeWar/loading${++index % 3 + 1}.png)`;
        },500)
    }
    // 背景移动
    bgMove(){
        let positionY = 0;
        let bg_speed = 0;
        switch(this.difficultyLevel){
            case 0:
                bg_speed = 20;
                break;
            case 1:
                bg_speed = 10;
                break;
            case 2:
                bg_speed = 5;
                break;
            case 3:
                bg_speed = 20;
                break;
        }
        Plane.bg_moving = setInterval(()=>{
            positionY += bg_speed;
            this.main.style.backgroundPositionY = positionY + "px";
        }, 50)
    }
    // 游戏开始
    gameStart(){
        new Plane().fire();
        Enemy.enemyCreater();
    }
    // 创建新元素
    static createEle(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
    static frequency;
    static bg_moving;
}
// 飞机部分
class Plane{
    constructor(){
        this.init();
    }
    init(){
        this.plane = this.createPlane();
        Plane.plane = this.plane;
        Plane.plane_size = {
            width : this.plane.offsetWidth,
            height : this.plane.offsetHeight
        }
        this.main = $(".main");
        Core.mainSize = {
            left  : this.main.offsetLeft,
            width : this.main.offsetWidth,
            height : this.main.offsetHeight
        }
        this.planeSize = {
            width  : this.plane.offsetWidth,
            height : this.plane.offsetHeight
        }
        on(document, "mousemove", this.planeMove.bind(this));
        return this;
    }
    // 创造己方飞机
    createPlane(){
        let plane = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        plane.className = "plane";
        plane.style.cursor = "none";
        document.body.appendChild(plane);
        plane.style.left = cWidth / 2 - plane.offsetWidth / 2 + "px";
        Plane.x = plane.offsetLeft;
        Plane.y = plane.offsetTop;
        return plane;
    }
    // 飞机移动
    planeMove(evt){
        let e = evt || window.event;
        let{x, y} = this.boundry(e.clientX - this.planeSize.width / 2, e.clientY - this.planeSize.height / 2);
        Plane.x = x;
        Plane.y = y;
        this.plane.style.left = x + "px";
        this.plane.style.top  = y + "px";
    }
    // 边界检测
    boundry(x, y){
        let minX = Core.mainSize.left;
        let maxX = Core.mainSize.left + Core.mainSize.width - this.planeSize.width;
        x = x < minX ? minX : x;
        x = x > maxX ? maxX : x;
        y = y < 0 ? 0 : y;
        return {x, y};
    }
    // 开火
    fire(){
        let frequency = 0;
        switch(Core.difficultyLevel){
            case 0 :
                frequency = 500;
                break;
            case 1 :
                frequency = 300;
                break;
            case 2 :
                frequency = 200;
                break;
            case 3 :
                frequency = 100;
                break;
        }
        Plane.create_bullet_timer = setInterval(()=>{
            new Bullet();
        }, frequency)
    }
    // 飞机当前位置
    static x;
    static y;
    // 飞机大小
    static plane_size;
    static mainSize;
    static create_bullet_timer;
    static plane;
}
// 子弹部分
class Bullet{
    constructor(){
        this.bullet_speed = 20;
        // 创建唯一的定时器
        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval(()=>{
                this.bulletMove();
            }, 50)
        }
        // 创建唯一的子弹列表
        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
        this.init();
    }
    init(){
        let bullet = this.createBullet();
        if(Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width : bullet.offsetWidth,
                height : bullet.offsetHeight
            }
        }
    }
    // 创建子弹
    createBullet(){
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);
        let left = Plane.x + Plane.plane_size.width / 2 - (Bullet.buller_size ? Bullet.buller_size.width / 2 : ele.offsetWidth / 2);
        let top = Plane.y;
        Bullet.bullet_list.push({
            ele,
            left,
            top,
            die : this.bulletDie.bind(this)
        })
        return ele;
    }
    // 子弹移动
    bulletMove(){
        for(let attr in Bullet.bullet_list){
            let bullet = Bullet.bullet_list[attr];
            if(bullet.top <= -20){
                this.bulletDie(bullet);
                continue;
            }
            bullet.top -= this.bullet_speed;
            bullet.ele.style.top = bullet.top + "px";
            bullet.ele.style.left = bullet.left + "px";
        }
    }
    // 子弹死亡
    bulletDie(bullet){
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index, 1);
        bullet.ele.className += " die";
        setTimeout(()=>{
            bullet.ele.remove();
            bullet = false;
        }, 500)
    }  
    static bullet_timer;
    static bullet_size;
    static bullet_list;
}
// 敌机部分
class Enemy{
    constructor(enemy_type){
        this.main = $(".main");
        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval(()=>{
            this.enemyMove();
            this.collision();
        }, 50)
        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        this.enemies = {
            "small" : {
                className : "enemy-small",
                speed : 10,
                hp : 1,
                dieClassName : "enemy-small-die"
            },
            "middle" : {
                className : "enemy-middle",
                speed : 5,
                hp : 10,
                dieClassName : "enemy-middle-die"
            },
            "large" : {
                className : "enemy-large",
                speed : 1,
                hp : 50,
                dieClassName : "enemy-large-die"
            },
        }
        enemy_type = enemy_type ? enemy_type : "small";
        this.enemy_data = this.enemies[enemy_type];
        this.init();
    }
    init(){
        this.createEnemy();
    }
    // 创建敌机
    createEnemy(){
        let ele = document.createElement("div");
        ele.className = this.enemy_data.className;
        document.body.appendChild(ele);
        Enemy.enemy_list.push({
            ele,
            hp : this.enemy_data.hp,
            left : Enemy.randomLeft(Core.mainSize.left,Core.mainSize.left + Core.mainSize.width - ele.offsetWidth),
            top : 0,
            speed : this.enemy_data.speed,
            width : ele.offsetWidth,
            height : ele.offsetHeight,
            die :this.enemyDie.bind(this)
        })
    }
    // 移动敌机
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;
            if(enemy.top >= Core.mainSize.height - enemy.height){
                this.enemyDie(enemy);
                continue;
            }
            enemy.ele.style.top = enemy.top + "px";
            enemy.ele.style.left = enemy.left + "px";
            if(this.collisionMy(enemy)){
                this.gameover();
                break;
            }
        }
    }
    // 敌机死亡
    enemyDie(enemy){
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index, 1);
        enemy.ele.className += " die";
        setTimeout(()=>{
            enemy.ele.remove();
        }, 1000)
    }
    // 碰撞检测
    collision(){
        for(let i = 0, bullet; bullet = Bullet.bullet_list[i]; i ++){
            for(let j = 0, enemy; enemy = Enemy.enemy_list[j]; j ++){
                if(this.collisionLeft(enemy, bullet) && this.collisionTop(enemy, bullet)){
                    bullet.die(bullet);
                    enemy.hp --;
                    if(enemy.hp <= 0){
                        enemy.die(enemy);
                    }
                }
            }
        }
        
    }
    // 水平碰撞检测
    collisionLeft(enemy, bullet){
        return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width;
        return true;
    }
    // 垂直碰撞检测
    collisionTop(enemy, bullet){
        return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
        return true;
    }
    // 检验己方飞机是否撞上了敌机
    collisionMy(enemy_list){
        for(let i = 0, enemy; enemy = Enemy.enemy_list[i]; i++){
            let left = Plane.x > enemy.left - Plane.plane_size.width && Plane.x < enemy.left + enemy.width;
            let top = Plane.y > enemy.top - Plane.plane_size.height && Plane.y < enemy.top + enemy.height;
            return left && top;
        }
    }
    // 游戏结束
    gameover(){
        clearInterval(Plane.bg_moving);
        clearInterval(Bullet.bullet_timer);
        clearInterval(Plane.create_bullet_timer);
        clearInterval(Enemy.enemy_timer);
        clearInterval(Enemy.enemy_create_timer);
        for(let i = 0, ele; ele = Enemy.enemy_list[i]; i++){
            ele.ele.remove();
        }
        for(let i = 0, ele; ele = Bullet.bullet_list[i]; i++){
            ele.ele.remove();
        }
        Enemy.enemy_list = [];
        Bullet.bullet_list = [];
        Plane.plane.remove();
        let btn = $("#btn");
        btn.style.display = "block";
        on(btn, "click", function(){
            location.reload();
        })
    }
    // 随机敌机出现的位置
    static randomLeft(min, max){
        return min + Math.round(Math.random() * (max - min));
    }
    // 随机生成敌机
    static enemyCreater(){
        Enemy.enemy_create_timer = setInterval(() => {
            let count = Enemy.randomLeft(1, 100);
            switch (true){
                case count < 70 :
                    new Enemy("small");
                    break;
                case count < 95 :
                    new Enemy("middle");
                    break;
                case count <= 100 :
                    new Enemy("large");
                    break;
            }
        }, 1000);
    }
    static enemy_list;
    static enemy_timer;
    static enemy_create_timer;
}

new Core();