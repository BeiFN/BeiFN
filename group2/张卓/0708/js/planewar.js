//属性赋值的
let { $, on } = utils
//核心类
class Core {
    constructor() {
        this.options = $(".options")
        this.main = $(".main")
        this.gameLevel = 0;
        this.penqiPlanImg = [
            { url: "https://upload-images.jianshu.io/upload_images/18316734-2ef7f858343f05c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" },
            { url: "https://upload-images.jianshu.io/upload_images/18316734-9f2673fb68710d32.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" },
            { url: "https://upload-images.jianshu.io/upload_images/18316734-778655a09f0473b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" }

        ]
        this.init();
    }
    init() {
        on(this.options, "click", this.handlerOptClick.bind(this))
    }
    //当鼠标点击选择游戏等级
    handlerOptClick(evt) {

        let e = evt || event
        let target = e.target || e.srcElement
        if (target.nodeName !== "P") return false;
        // console.log(target)
        //获取游戏等级
        this.gameLevel = Array.from(target.parentNode.children).indexOf(target)
        Core.game_level = this.gameLevel;
        //清除
        this.clearAll(); //这里直接就是this 所以方法里面的this也指向实例
        //添加动画
        this.animationShow();
        this.backgroundMove();
        //设置指定时间后清除这些内容
        setTimeout(function () {
            // console.log(this) 如果不bind这里指向的是window 
            this.clearAll()
            new Plane();
        }.bind(this), 1500)
    }
    //清除页面的素有内容
    clearAll() {
        this.options.remove();
        this.logoEle ? this.logoEle.remove() : ""
        this.loadPlane ? this.loadPlane.remove() : ""
        this.loadTimer == "undefined" ? "" : clearInterval(this.loadTimer)
    }
    //展示开局动画
    animationShow() {
        //显示logo
        this.logoEle = Core.createEle("logo")
        this.loadPlane = Core.createEle("plane-loading")
        //显示加载的喷气机
        let count = 0;
        this.loadTimer = setInterval(function () {
            count = (++count % 3);
            this.loadPlane.style.backgroundImage = "url(" + this.penqiPlanImg[count].url + ")"
        }.bind(this), 500)
    }
    backgroundMove() {
        //背景移动
        let bk_speed = 0;
        let g_speed = 1
        switch (this.gameLevel) {
            case 0: g_speed = 4; break;
            case 1: g_speed = 2; break;
            case 2: g_speed = 1; break;
            case 3: g_speed = 2; break;
        }
        this.bgiMove = setInterval(function () {
            bk_speed += g_speed
            this.main.style.backgroundPositionY = bk_speed + "px"
        }.bind(this), 10)

    }
    //创建元素的静态方法
    static createEle(className) {
        var ele = document.createElement("div")
        ele.className = className
        document.documentElement.appendChild(ele)
        return ele
    }
    static game_level;
}
//创建飞机
class Plane {
    constructor() {
        // console.log("该打印")

        this.init()
        this.main = $(".main")
        this.mainSize = {
            width: this.main.offsetWidth,
            height: this.main.offsetHeight,
            left: this.main.offsetLeft
        }
    }
    init() {
        this.frequency = 200;
        switch (Core.game_level) {
            case 0: this.frequency = 400; break;
            case 1: this.frequency = 300; break;
            case 2: this.frequency = 200; break;
            case 3: this.frequency = 100; break;
        }
        this.createPlane();
        on(document, "mousemove", this.myPlaneMove.bind(this))
        Enemy.enemyCreater();
    }
    //创建飞机
    createPlane() {
        this.ele = Core.createEle("plane")
        //给飞机设置一个默认的初始位置
        this.ele.style.left = (document.documentElement.offsetWidth - this.ele.offsetWidth) / 2 + "px"
        this.ele.style.cursor = "none"
        this.planeSize = {
            width: this.ele.offsetWidth,
            height: this.ele.offsetHeight,
            left: this.ele.offsetLeft
        }
        Plane.planeSize = this.planeSize
        setInterval(function () {
            new Bullet();
        }, this.frequency)
    }
    //飞机移动
    myPlaneMove(evt) {
        var e = evt || event;
        this.x = e.clientX - this.planeSize.width / 2
        this.y = e.clientY - this.planeSize.height / 2
        this.boundary();
        // console.log(position)
        this.ele.style.left = this.x + "px"
        this.ele.style.top = this.y + "px"
        //让外面的子弹可以获取到飞机的位置
        Plane.x = this.x;
        Plane.y = this.y;
    }
    //边界检测
    boundary() {
        this.x = (this.x <= this.mainSize.left ? this.mainSize.left : this.x);
        let maxX = this.mainSize.left + this.mainSize.width - this.planeSize.width
        this.x = (this.x >= maxX ? maxX : this.x);
        this.y = (this.y <= 0 ? 0 : this.y)
    }
    static planeSize;
    static x;
    static y;
}
class Bullet {
    constructor() {
        //只创建一个bullet_list
        Bullet.bullet_list == undefined ? Bullet.bullet_list = [] : ""
        if (Bullet.bullet_timer == undefined) {
            Bullet.bullet_timer = setInterval(function () {
                //子弹移动
                this.bulletMove()
            }.bind(this), 100)
        }
        this.speed = 50;
        this.init();
    }
    //创建炮弹
    init() {
        this.createBullet()
    }
    //创建子弹
    createBullet() {
        let bullet = Core.createEle("bullet")
        //设置子弹的初始位置  飞机的offsetLeft+飞机的宽度的一半-子弹宽度的一半
        let left = Plane.x + Plane.planeSize.width / 2 - bullet.offsetWidth / 2
        let top = Plane.y
        bullet.style.left = left + "px"
        bullet.style.top = top + "px"
        // console.log(top+"-------------",left+"++++++++++++")
        Bullet.bullet_list.push({
            bullet,
            width: bullet.offsetWidth,
            height: bullet.offsetHeight,
            top: top,
            left: left,
            die: this.bulletDie.bind(this)
        })
    }
    //炮弹移动
    bulletMove() {
        for (var attr in Bullet.bullet_list) {
            let bullet = Bullet.bullet_list[attr]
            bullet.top -= this.speed
            // console.log(bullet.top+"--------------")
            if (bullet.top <= 0) {
                this.bulletDie(bullet);
                continue;
            }
            bullet.bullet.style.top = bullet.top + "px"
        }
    }
    //炮弹炸毁
    bulletDie(bullet) {
        bullet.bullet.className += " die"
        //slice两个参数就是删除
        Bullet.bullet_list.slice(Bullet.bullet_list.indexOf(bullet), 1)
        setTimeout(function () {
            bullet.bullet.remove();
            bullet = false;
        }, 500)
    }
    static bullet_list;
    static bullet_timer;
}
//敌机
class Enemy {
    constructor(enemy_type) {
        this.main = $(".main")
        this.mainSize = {
            width: this.main.offsetWidth,
            height: this.main.offsetHeight,
            left: this.main.offsetLeft
        }
        Enemy.enemy_list === undefined ? Enemy.enemy_list = [] : "";
        if (Enemy.enemy_timer === undefined) {
            Enemy.enemy_timer = setInterval(function () {
                this.EnemyMove()
                //检测有没有打到飞机 碰撞检测;
                this.collisionDetection();
            }.bind(this), 50)
        }
        this.enemys = {
            "small": {
                hp: 1,
                className: "enemy-small",
                speed: 8
            },
            "middle": {
                hp: 15,
                className: "enemy-middle",
                speed: 3
            },
            "large": {
                hp: 30,
                className: "enemy-large",
                speed: 1
            }
        }
        this.enemy_type = (enemy_type ? enemy_type : "small")
        //获取当前数据
        this.enemy_data = (this.enemys[this.enemy_type])
        this.init();
    }
    init() {
        this.createEnemy() //this直接调用不用bind
    }
    //创建敌机
    createEnemy() {
        let ele = Core.createEle(this.enemy_data.className)
        let width = ele.offsetWidth
        Enemy.enemy_list.push({
            //敌机
            ele,
            //获取left的值
            //随机的位置  main的左边 - (main的左边+main的宽度-飞机的宽度)
            left: Enemy.randomLeft(this.mainSize.left, (this.mainSize.left + this.mainSize.width - width)),
            top: 0,
            //速度
            speed: this.enemy_data.speed,
            //血量
            hp: this.enemy_data.hp,
            //飞机高宽
            width: width,
            height: ele.offsetHeight,
            die: this.EnemyDie.bind(this)
        })
    }

    EnemyMove() {
        //遍历获取每一个敌机 并赋值 移动
        for (var attr in Enemy.enemy_list) {
            let enemy = Enemy.enemy_list[attr]
            enemy.top += enemy.speed
            if (enemy.top > (this.mainSize.height - 50)) {
                this.EnemyDie(enemy)
                continue;
            }
            enemy.ele.style.top = enemy.top + "px"
            enemy.ele.style.left = enemy.left + "px"
        }
    }
    EnemyDie(enemy) {
        Enemy.enemy_list.slice(Enemy.enemy_list.indexOf(enemy), 1)
        enemy.ele.className += " die"
        setTimeout(function () {
            enemy.ele.remove();
        }, 1000)
    }
    //检测有没有打到飞机
    collisionDetection() {
        //遍历子弹列表
        for (var i = 0, bullet; bullet = Bullet.bullet_list[i]; i++) {
            //遍历敌机列表
            for (var j = 0, enemy; enemy = Enemy.enemy_list[j]; j++) {
                //left在一条线上
                if (bullet.left >= (enemy.left - bullet.width) && bullet.left <= (enemy.left + enemy.width)) {
                    console.log("1111")
                    if (bullet.top >= enemy.top && bullet.top <= (enemy.top + enemy.height)) {
                        console.log("2222")
                        bullet.die(bullet)
                        enemy.hp--;
                        if (enemy.hp <= 0) {
                            enemy.die(enemy)
                        }
                    }
                }
            }
        }
    }

    static randomLeft(min, max) {
        var l = Math.round(min + Math.random() * (max - min))
        return l
    }

    static enemy_list;
    static enemy_timer;
    static enemyCreater() {
        let count = 0;
        //定时创建敌机
        setInterval(function () {
            Math.random() > 0.5 ? new Enemy("small") : ""
            if (count % 7 == 0) {
                Math.random() < 0.8 ? new Enemy("middle") : ""
            }
            if (count % 15 == 0) {
                Math.random() < 0.9 ? new Enemy("large") : ""
            }
            count++
        }, 1000)
    }

}
new Core()
