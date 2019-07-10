let {
    $,
    on
} = Utils;

//核心
class Core {
    constructor() {
        this.option = $(".options");
        Core.main = $(".main");
        this.images_loading = [
            "https://upload-images.jianshu.io/upload_images/12728563-b6848300e2570f2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "https://upload-images.jianshu.io/upload_images/12728563-688ef39e5dd8b5fa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "https://upload-images.jianshu.io/upload_images/12728563-e696f9e5d8635d42.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"

        ]

        // console.log(this.main)
        this.init();
    }
    //对象初始化
    init() {
        // this.main.backgroundImage =`url(../images/bg.jpg)`
        // 绑定事件;
        this.option.addEventListener("click", this.handlerClick.bind(this));
    }

    // 事件耦合函数
    handlerClick(evt) {
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if (target.nodeName !== "P") return false;
        this.setHardLevel(target);
        this.clearAll();
        this.showAll();
        this.animate();
        setTimeout(() => {
            this.clearAll();
            this.gameStart();
        }, 1000);

    }


    //展示
    showAll() {
        this.logo = Core.createEle("logo");
        this.loading = Core.createEle("plane-loading");
    }

    //清场
    clearAll() {
        this.option ? this.option.remove() : "";
        this.logo ? this.logo.remove() : "";
        this.loading ? this.loading.remove() : "";
    }
    //设置等级
    setHardLevel(target) {
        Core.hardLevel = Array.from(target.parentNode.children).indexOf(target);
        //  return index;
    }
    //动画设置
    animate() {
        let i = 0;
        this.animate_timer = setInterval(
            () => {
                // this.loading.style.backgroundImage = "this.images_loading[i++]";
                // console.log(this.images_loading[i++])

                switch (i++ % 3) {
                    case 0:
                        this.loading.style.backgroundImage = "this.images_loading[0]";
                        break;
                    case 1:
                        this.loading.style.backgroundImage = "this.images_loading[1]";
                        break;
                    case 2:
                        this.loading.style.backgroundImage = "this.images_loading[2]";
                }

                // this.loading.style.backgroundImage = "this.images_loading[i++]";
                // console.log(this.images_loading[i++])
            }, 300);

        let speed = 15;
        let t_op = 0;
        switch (Core.hardLevel) {
            case 0:
                speed = 15;
                break;
            case 1:
                speed = 10;
                break;
            case 2:
                speed = 8;
                break;
            case 3:
                speed = 5;
                break;
        }
        this.bg_timer = setInterval(
            () => {
                t_op -= speed;
                // console.log(t_op);
                Core.main.style.backgroundPositionY = t_op + "px";
            }, 50)
    }
    gameStart() {
        //游戏开始
        //连缀写法， 返回this
        plane.init().fire();
        // enemy.init();
        Enemy.createEnemy();

        // plane.init();
        // plane.fire();

    }

    //创建元素
    static createEle(class_Name) {
        let ele = document.createElement("div");
        document.body.appendChild(ele);
        ele.className = class_Name;
        return ele;
    }
    static hardLevel;

    //删除元素

}
//飞机对象
class Plane {
    constructor() {
        // this.main = $(".main");

    }
    //飞机数据初始化
    init() {
        this.plane = this.createPlane();
        //   console.log(this.plane);
        //屏幕宽度
        this.cWidth = document.documentElement.clientWidth;

        //我的飞机尺寸
        this.plane_size = {
            width: this.plane.offsetWidth,
            height: this.plane.offsetHeight,
            left: this.plane.offsetLeft
        }

        //战斗区域
        this.main_size = {
            width: Core.main.offsetWidth,
            height: Core.main.offsetHeight,
            left: Core.main.offsetLeft
        }
        //飞机初始位置
        this.plane.style.left = this.cWidth / 2 - this.plane_size.width / 2 + "px";
        this.plane.style.bottom = 0 + "px";
        //飞机移动
        document.addEventListener("mousemove", this.plane_move.bind(this));
        //init返回this  用于连缀
        return this;

    }

    //创建飞机
    createPlane() {
        let ele = document.createElement("div");
        document.body.appendChild(ele);
        ele.className = "plane";
        return ele;
    }
    //发射子弹
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

    plane_move(evt) {
        let e = evt || window.event;
        // let target = e.target ||e.srcElement;
        //边界检测
        // this.plane.style.left =  + "px";
        // this.plane.style.top = + "px";
        let {
            left,
            top
        } = this.boundary(e.clientX - this.plane_size.width / 2, e.clientY - this.plane_size.height / 2);
        // console.log(left, top);
        // Plane.left = left + this.plane_size.width / 2;
        Plane.left = left + this.plane_size.width / 2;
        Plane.top = top;
        this.plane.style.left = left + "px";
        this.plane.style.top = top + "px";


    }
    //边界检测
    boundary(left, top) {
        // console.log(left, top);

        let min_x = this.main_size.left;
        let max_x = this.main_size.left - this.plane_size.width + this.main_size.width;
        left = left < min_x ? min_x : left;
        left = left > max_x ? max_x : left;

        let min_y = 0;
        let max_y = this.main_size.height - this.plane_size.height;
        top = top < min_y ? min_y : top;
        top = top > max_y ? max_y : top;

        // console.log(left, top);

        return {
            left,
            top
        };

    }
    static left;
    static top;
    // static main_size;
    static plane_size;
}

//创建子弹
class Bullet {

    //用于传值，用于判断
    constructor() {
        this.speed = 10;
        //只能存在一个子弹定时器
        if (Bullet.bullet_timer === undefined) {
            Bullet.bullet_timer = setInterval(
                () => {
                    this.bullet_move();
                }, 50
            )
        }

        //只能存在一个子弹列表
        if (Bullet.bullet_list === undefined) {
            Bullet.bullet_list = [];
        }
        this.init();
    }

    //初始化
    init() {
        let bullet = this.createBullet();
        let bullet_size = {
            width: bullet.offsetWidth,
            height: bullet.offsetHeight
        }
    }

    //创建子弹
    createBullet() {
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);

        Bullet.bullet_size = {
            left: ele.offsetLeft,
            height: ele.offsetHeight,
            width: ele.offsetWidth,
            top: ele.offsetTop
        }

        let left = Plane.left - ele.offsetLeft / 2;
        let top = Plane.top;
        console.log(left,top)
        Bullet.bullet_list.push({
                ele,
                left,
                top
            }

        )
        // let left = this.main_size.left + this.plane_size.left + this.plane.width/2 - this.bullet.offsetWidth / 2 +"px";
        // let top = 
        return ele;
    }

    //子弹运动       
    bullet_move() {
        // let ele = $(".bullet");
        // console.log(ele);
        for (let attr in Bullet.bullet_list) {
            let bullet = Bullet.bullet_list[attr];
            if (bullet.top < 50) {
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
        }, 500);
    }
    static bullet_size
    static bullet_timer;
    static bullet_list;
}


//创建敌机
class Enemy {

    //用于传值，用于判断
    constructor(enemy_type) {
        //敌机策略
        this.enemies = {
            "small": {
                className: "enemy-small",
                hp: 1,
                speed: 15,
                dieClassName: "enemy-small-die"
            },
            "middle": {
                className: "enemy-middle",
                hp: 10,
                speed: 10,
                dieClassName: "enemy-middle-die"
            },
            "large": {
                className: "enemy-large",
                hp: 15,
                speed: 5,
                dieClassName: "enemy-large-die"
            }

        }


        //只能存在一个定时器
        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval(
            ()=>{
                this.enemy_move;
                this.collisionDetection();
            }
            , 50);

        //只能存在一个子弹列表
        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        //判断是否存在敌机选项
        enemy_type = enemy_type ? enemy_type : "small";
        //选中哪一种敌机
        this.enemy_date = this.enemies[enemy_type];
        this.init();
    }

    //初始化
    init() {
        this.creatEnemy();
        this.enemy_move();
        //    this.createEnemy();

        // let Enemy_size = {
        //     width: enemy.offsetWidth,
        //     height: enemy.offsetHeight
        // }
    }
    //创建敌机
    creatEnemy() {
        let main = $(".main");
        this.main_size = {
            left: main.offsetLeft,
            width: main.offsetWidth,
            height: main.offsetHeight
        }

        let ele = document.createElement("div");
        ele.className = this.enemy_date.className;
        document.body.appendChild(ele);

        this.enemy_size = {
            left: ele.offsetLeft,
            width: ele.offsetWidth,
            height: ele.offsetHeight,
            top: ele.offsetTop
        }
        //水平活动范围
        let left = this.main_size.left + Math.round(Math.random() * (this.main_size.width - this.enemy_size.width));
        let top = 0;
        ele.style.left = left + "px";
        ele.style.top = top + "px";

        //存放创建好的飞机数据
        Enemy.enemy_list.push({
            ele,
            left: left,
            top: 0,
            hp: this.enemy_date.hp,
            speed: this.enemy_date.speed,
            // die: this.enemies.dieClassName
        })
        // return ele;
    }

    //飞机运动       
    enemy_move() {
        for (let attr in Enemy.enemy_list) {

            //每架飞机
            let enemy = Enemy.enemy_list[attr];
            if (enemy.top > 500) {
                this.enemyDie(enemy);
                continue;
            }
            enemy.top += enemy.speed;
            // console.log(enemy.top);
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
            enemy = false;
        }, 50);
    }
    collisionDetection() {
        let bullets = Bullet.bullet_list;
        // console.log(bullets);
        let enemies = Enemy.enemy_list;
        // console.log(enemies);

        for (let i = 0,bullet; bullet = bullets[i]; i++) {
            for (let k = 0,enemy; enemy = enemies[k]; k++) {
                // 子弹left >=   敌机left - 子弹 left  &&   子弹left <= 敌机left + 敌机宽度
                if (bullet.left >= enemy.left-bullet.width && bullet.left <= enemy.left+enemy.width) {
                               console.log(11111111111)
                }
            }
        }
    }




    //自动创建敌机
    static createEnemy() {
        let count = 0;
        setInterval(() => {
            count++;
            Math.random() > 0.5 ? new Enemy() : "";
            count % 6 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
            count % 11 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";

        }, 1000)
    }

    static enemy_timer;
    static enemy_list;
    // static createEnemy()
}



new Core();
let plane = new Plane();
new Bullet();
// let enemy = new Enemy();