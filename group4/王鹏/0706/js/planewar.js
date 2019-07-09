let { $, on } = MyLibs;


// 核心部分;
// 1. logo入场 ;
// 2. 飞机动画 ;
// 3. 背景运动 ;
class Core {
    constructor() {
        this.option = $(".options")
        this.options = this.option.children;
        this.main = $(".main");
        this.init();
    }
    init() {
        for (let i = 0, ele; ele = this.options[i++];) {
            on(ele, "click", this.hanlderClick.bind(this, i - 1))
        }
    }
    hanlderClick(index) {
        Core.hardLevel = index;
        console.log(Core.hardLevel)

        this.clearAll();
        this.showLog();
        this.animate();

        setTimeout(() => {
            this.clearAll();
            this.gameStart();
        }, 1000)

    }
    clearAll() {
        this.option ? this.option.remove() : "";
        clearInterval(this.loading);
        this.logo ? this.logo.remove() : "";
        this.plane_loading ? this.plane_loading.remove() : "";
    }
    showLog() {
        this.logo = Core.createEle("logo");
        this.plane_loading = Core.createEle("plane-loading");
    }
    animate() {
        let index = 0,
            loadingSrc = {
                1: "https://upload-images.jianshu.io/upload_images/18597145-1a4f0cdfd3074b06.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                2: "https://upload-images.jianshu.io/upload_images/18597145-37c200793130c5d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                3: "https://upload-images.jianshu.io/upload_images/18597145-8a02f2a5d0484017.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            }
        this.loading = setInterval(() => {
            this.plane_loading.style.backgroundImage = `url(${loadingSrc[++index % 3 + 1]})`

        }, 500)

        let [positionY, speed] = [0, 5];
        switch (Core.hardLevel) {
            case 0: speed = 20; break;
            case 1: speed = 8; break;
            case 2: speed = 5; break;
            case 3: speed = 20; break;
        }
        Core.bg_moving = setInterval(() => {
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        }, 50)
    }

    gameStart() {
        console.log("游戏开始")
        plane.init().fire();
        Enemy.enemyCreater();
    }

    static createEle(className) {
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
    static hardLevel;
    static bg_moving
}



//创建飞机
//1.初始化创建飞机
//2.飞机跟随鼠标移动
//3.边界检测
//4.飞机实例和子弹实例联系，控制不同难度子弹发射频率
class Plane {
    constructor() {

    }
    init() {
        this.ele = this.createPlane();
        this.main = $(".main");
        Plane.plane_size = {
            width: this.ele.offsetWidth,
            height: this.ele.offsetHeight
        }
        this.main_size = {
            left: this.main.offsetLeft,
            width: this.main.offsetWidth
        }
        this.ele_size = {
            width: this.ele.offsetWidth,
            height: this.ele.offsetHeight
        }

        on(document, "mousemove", this.planeMove.bind(this))


        return this;
    }
    planeMove(evt) {
        let e = evt || window.event;
        let { x, y } = this.boundary(e.clientX - this.ele_size.width / 2, e.clientY - this.ele_size.height / 2)
        Plane.x = x;
        Plane.y = y;
        this.ele.style.left = x + "px";
        this.ele.style.top = y + "px";
    }
    boundary(x, y) {
        let minX = this.main_size.left,
            maxX = this.main_size.left + this.main_size.width - this.ele_size.width;
        x = x < minX ? minX : x;
        x = x > maxX ? maxX : x;
        y = y < 0 ? 0 : y;
        return {
            x,
            y
        }
    }
    createPlane() {
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "plane";
        ele.style.cursor = "none";
        document.body.appendChild(ele);
        ele.style.left = cWidth / 2 - ele.offsetWidth / 2 + "px"
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop;
        return ele;
    }
    fire() {
        let frequency = 100;
        switch (Core.hardLevel) {
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
        setInterval(() => {
            new Bullet();
        }, frequency)
    }
    static x;
    static y;
    static plane_size;
    static

}


//创建子弹
//1.初始化创建子弹
//2.子弹移动
//3.子弹死亡
class Bullet {
    constructor() {
        this.speed = 20;
        if (Bullet.bullet_timer === undefined) {
            Bullet.bullet_timer = setInterval(() => {
                this.bulletMove();
            }, 50)
        }
        if (Bullet.bullet_list === undefined) {
            Bullet.bullet_list = [];
        }
        this.init();
    }
    init() {
        let ele = this.createBullet();
        if (Bullet.bullet_size === undefined) {
            Bullet.bullet_size = {
                width: ele.offsetWidth,
                height: ele.offsetHeight
            }
        }
    }
    createBullet() {
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);

        let left = Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
        let top = Plane.y;

        Bullet.bullet_list.push({
            ele,
            left,
            top,
            die: this.bulletDie.bind(this)
        })
        return ele;
    }
    bulletMove() {
        for (let attr in Bullet.bullet_list) {
            let bullet = Bullet.bullet_list[attr];
            if (bullet.top <= -20) {
                this.bulletDie(bullet);
                continue;
            }
            bullet.top -= this.speed;
            bullet.ele.style.top = bullet.top + "px";
            bullet.ele.style.left = bullet.left + "px";
        }
    }
    bulletDie(bullet) {
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index, 1);
        bullet.ele.className += " die";
        setTimeout(() => {
            bullet.ele.remove();
            bullet = false;
        }, 500)
    }

    static bullet_timer;
    static bullet_list;
    static bullet_size;
}

//敌机创建
//1.初始化随机水平位置创建敌机
//2.敌机移动
//3.敌机死亡
class Enemy {
    constructor(enemy_type) {
        this.main = $(".main");
        this.main_size = {
            width: this.main.offsetWidth,
            height: this.main.offsetHeight,
            left: this.main.offsetLeft
        }
        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval(() => {
            this.enemyMove();
            this.collisionDetection()
            this.gameOver();
        }, 50);
        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        this.enemies = {
            "small": {
                className: "enemy-small",
                speed: 10,
                hp: 1,
                dieClassName: "enemy-small-die"
            },
            "middle": {
                className: "enemy-middle",
                speed: 5,
                hp: 10,
                dieClassName: "enemy-middle-die"
            },
            "large": {
                className: "enemy-large",
                speed: 1,
                hp: 50,
                dieClassName: "enemy-large-die"
            }
        }
        enemy_type = enemy_type ? enemy_type : "small";
        this.enemy_data = this.enemies[enemy_type];
        this.init();

    }
    init() {
        this.createEnemy();
    }
    createEnemy() {
        let ele = document.createElement("div");
        ele.className = this.enemy_data.className;
        document.body.appendChild(ele);
        Enemy.enemy_list.push({
            ele,
            hp: this.enemy_data.hp,
            left: Enemy.randomLeft(this.main_size.left, this.main_size.left + this.main_size.width - ele.offsetWidth),
            top: 0,
            speed: this.enemy_data.speed,
            width: ele.offsetWidth,
            height: ele.offsetHeight,
            die: this.enemyDie.bind(this)
        })
    }
    enemyMove() {
        for (let attr in Enemy.enemy_list) {
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;
            if (enemy.top >= this.main_size.height - 50) {
                this.enemyDie(enemy);
                continue;
            }
            enemy.ele.style.top = enemy.top + "px";
            enemy.ele.style.left = enemy.left + "px";
        }
    }
    enemyDie(enemy) {
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index, 1);
        enemy.ele.className += " die";
        setTimeout(() => {
            enemy.ele.remove();
        }, 1000)
    }

    collisionDetection() {
        let bullets = Bullet.bullet_list;
        let enemys = Enemy.enemy_list;
        for (let i = 0, bullet; bullet = bullets[i]; i++) {
            for (let j = 0, enemy; enemy = enemys[j]; j++) {
                if (this.collisionLeft(enemy, bullet)) {
                    if (this.collisionTop(enemy, bullet)) {
                        bullet.die(bullet);
                        enemy.hp--
                        if (enemy.hp <= 0) {
                            enemy.die(enemy);
                        }
                    }
                }
            }

        }
    }
    collisionLeft(enemy, bullet) {
        return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width
    }
    collisionTop(enemy, bullet) {
        return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
    }

    //游戏结束
    gameOver() {
        let enemys = Enemy.enemy_list;
        for (let k = 0, enemy; enemy = enemys[k]; k++) {
            if (this.collisionLeftXGR(enemy)) {
                if (this.collisionTopXGR(enemy)) {
                    // console.log("gameOver")
                    clearInterval(Enemy.enemy_timer)
                    clearInterval(Core.bg_moving)
                    clearInterval(Bullet.bullet_timer)
                    setTimeout(()=>{
                        location.reload();
                    },1000)
                }
            }
        }
    }
    collisionLeftXGR(enemy) {
        return Plane.x > enemy.left - Plane.plane_size.width && Plane.x < enemy.left + enemy.width
    }
    collisionTopXGR(enemy) {
        return Plane.y > enemy.top - Plane.plane_size.height && Plane.y < enemy.top + enemy.height;
    }


    static enemy_timer;
    static enemy_list;
    static enemy_size;
    static randomLeft(min, max) {
        return min + Math.round(Math.random() * (max - min));
    }
    static enemyCreater() {
        let count = 0;
        setInterval(() => {
            count++;
            Math.random() > 0.5 ? new Enemy() : "";
            count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
            count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";
        }, 1000)
    }
}

new Core();
let plane = new Plane();
