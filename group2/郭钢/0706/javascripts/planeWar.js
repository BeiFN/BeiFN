class PlaneWar {
    constructor() {
        this.option = $(".hardLevel");
        this.bg = $(".bg");
        this.init();
    }

    // 初始化
    init() {
        this.option.addEventListener("click", this.handlerClick.bind(this))//给难度列表添加点击事件
    }


    // 点击时的准备条件
    handlerClick(evt) {
        let e = evt || event;
        let target = e.target || e.srcElement;

        // 判断点击的目标是否是难度等级
        if (target.nodeName !== "P") {
            return false;
        }

        // 根据点击的难度等级进入难度等级设置
        this.setLevel(target);

        // 清除多余元素
        this.clearAll();


        // 显示触发元素
        this.showAll();
        // 加载动画效果
        this.animate();

        // 加载动画结束后，再清除元素，游戏开始
        setTimeout(() => {
            this.clearAll();
            this.gameStart();
        }, 1000)
    }
    setLevel(target) {
        // 根据点击的目标等级的下标确定难度的等级
        PlaneWar.nowLevel = Array.from(this.option.children).indexOf(target);
    }
    clearAll() {
        this.option ? this.option.remove() : "";  //如果难度列表还存在，移除难度列表
        this.logo ? this.logo.remove() : "";      //移除logo
        this.loading_move ? clearInterval(this.loading_move) : ""; //移除加载动画
        this.loading ? this.loading.remove() : ""
    }
    showAll() {
        this.logo = creatEle("logo"); //显示logo
        this.loading = creatEle("loading"); //显示加载时的图片
    }
    // 加载动画
    animate() {
        let i = 0;
        this.loading_move = setInterval(() => {
            this.loading.style.backgroundImage = `url(./images/loading${++i % 3 + 1}.png)` //这个i用字符串拼接为什么不行呢?
        }, 500)

        let speed = 0;
        // 根据难度等级设置速度
        switch (PlaneWar.nowLevel) {
            case 0:
                speed = 20;
                break;
            case 1:
                speed = 15;
                break;
            case 2:
                speed = 10;
                break;
            case 3:
                speed = 5;
                break;
        }
        let positionY = 0;
        // 让背景图根据当前的速度移动
        this.bg_move = setInterval(() => {
            positionY += speed;
            this.bg.style.backgroundPositionY = positionY + "px";
        }, 50)
    }

    // 游戏开始
    gameStart() {
        plane.init(); //自己的飞机初始化
        plane.fire(); // 根据当前难度等级，判断子弹的生成速度
        Enemy.enemyChoose(); //要生成的敌机样式
    }


    //选择器
    static $(selector) {
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }

    //创建元素
    static creatEle(className) {
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
}



// 自己的飞机
class Plane {
    constructor() {

    }
    init() {
        this.myPlane = creatEle("myplane");//创建自己的飞机
        //飞机生成时的位置
        Plane.myPlanePosition = {
            X: document.documentElement.clientWidth / 2 - this.myPlane.offsetWidth / 2,
            Y: this.myPlane.offsetTop,
        }
        this.myPlane.style.left = Plane.myPlanePosition.X + "px";
        this.myPlane.style.cursor = "none";
        this.bg = $(".bg");
        // 添加鼠标移动事件
        document.addEventListener("mousemove", this.handlerMove.bind(this));
        
        
        // 我的飞机的宽高，设置成全局，因为下面会用到
        Plane.myPlanSize = {
            width: this.myPlane.offsetWidth,
            height: this.myPlane.offsetHeight,
        }
        this.bgSize = {
            width: this.bg.offsetWidth,
            height: this.bg.offsetHeight
        }
        this.bgPosition = {
            left: this.bg.offsetLeft,
        }
    }


    // 鼠标移动时的准备条件
    handlerMove(evt) {
        let e = evt || event
        let {
            X,
            Y
        } = {
            X: e.pageX,
            Y: e.pageY - Plane.myPlanSize.height / 2
        }
        // 经过边界检测后返回飞机在鼠标移动时的位置
        Plane.myPlanePosition = this.boundary({
            X,
            Y
        });
        this.myPlaneMove();
    }

    // 边界检测
    boundary({
        X,
        Y
    }) {
        let positionLeft = X - this.bgPosition.left - Plane.myPlanSize.width / 2;
        let positionTop = Y;
        positionLeft = positionLeft < 0 ? 0 : positionLeft;
        positionLeft = positionLeft > this.bgSize.width - Plane.myPlanSize.width ? this.bgSize.width - Plane.myPlanSize.width : positionLeft;
        let top = positionTop < 0 ? 0 : positionTop;
        return {
            X: positionLeft + this.bgPosition.left,
            Y: top,
        }
    }


    // 飞机移动
    myPlaneMove() {
        this.myPlane.style.left = Plane.myPlanePosition.X + "px";
        this.myPlane.style.top = Plane.myPlanePosition.Y + "px";
    }


    // 子弹生成速率
    fire() {
        let freBullet = 200;
        switch (PlaneWar.nowLevel) {
            case 0:
                freBullet = 200;
                break;
            case 1:
                freBullet = 300;
                break;
            case 2:
                freBullet = 500;
                break;
            case 3:
                freBullet = 900;
                break;
        }
        // 调用子弹生成
        setInterval(() => {
            new Bullet;
        }, freBullet)
    }

}

class Bullet {
    constructor() {
        // 设置子弹的速度
        this.speed = 20;


        // 确保只开一个定时器
        if (Bullet.bulletMoveTimer === undefined) { //为什么用this.bulletMoveTimer不行呢?
            Bullet.bulletMoveTimer = setInterval(() => {
                this.bulletMove();
            }, 50)
        }


        // 确保只生成一个子弹列表数组
        if (Bullet.bulletList === undefined) {
            Bullet.bulletList = [];
        }

        this.init();
    }


    init() {
        // 调用创建子弹方法
        this.creatBullet();
    }

    creatBullet() {
        // 添加元素
        this.ele = document.createElement("div");
        this.ele.className = "bullet";
        document.body.appendChild(this.ele);
        // 几率子弹的宽高
        Bullet.bulletSize = {
            width: this.ele.offsetWidth,
            height: this.ele.offsetHeight,
        }
        // 给子弹设置初始的位置
        let left = Plane.myPlanePosition.X + Plane.myPlanSize.width / 2 - Bullet.bulletSize.width / 2;
        let top = Plane.myPlanePosition.Y - Bullet.bulletSize.height;


        // 把生成的子弹放入子弹列表中
        Bullet.bulletList.push({
            ele: this.ele,
            left,
            top,
            die: this.bulletDie.bind(this) //当碰撞检测成功时，要把当前子弹给移除
        })
    }


    // 子弹移动
    bulletMove() {
        for (let index in Bullet.bulletList) {
            let bullet = Bullet.bulletList[index];
            // 子弹距离顶部小于20时移除
            if (bullet.top < 20) {
                this.bulletDie(bullet);
            }
            bullet.top -= this.speed;
            bullet.ele.style.top = bullet.top + "px";
            bullet.ele.style.left = bullet.left + "px";
        }
    }

    // 移除子弹
    bulletDie(bullet) {
        let index = Bullet.bulletList.indexOf(bullet);
        Bullet.bulletList.splice(index, 1);
        bullet.ele.className += " die";
        // 动画结束后移除子弹
        setTimeout(() => {
            bullet.ele.remove();
        }, 1000)
    }
}

// 操作敌机
class Enemy {
    constructor(enemyType) {
        this.bg = $(".bg");
        this.bgSize = {
            width: this.bg.offsetWidth,
            height: this.bg.offsetHeight,
            left: this.bg.offsetLeft
        }
        this.init(enemyType);
    }

    init(enemyType) {
        // 确保只生成一个敌机列表
        if (Enemy.enemyList === undefined) {
            Enemy.enemyList = [];
        }
        // 记录三种敌机的属性
        this.enemies = {
            "small": {
                speed: 10,
                hp: 1,
                dieClassName: "enemy-small-die",
            },
            "middle": {
                speed: 5,
                hp: 10,
                dieClassName: "enemy-middle-die",
            },
            "large": {
                speed: 2,
                hp: 20,
                dieClassName: "enemy-large-die",
            }
        }
        // 根据传入的类名,创建敌机
        this.creatEnemy(enemyType);

        // 确保只开成一个计时器
        if (Enemy.enemyMoveTimer === undefined) {
            Enemy.enemyMoveTimer = setInterval(() => {
                this.enemyMove();//敌机移动
                this.detection();//碰撞检测
            }, 50)
        }
    }


    // 创建敌机
    creatEnemy(enemyType) {
        let ele = document.createElement("div");
        ele.className = enemyType;
        document.body.appendChild(ele);
        // 把当前敌机的属性存入敌机属性列表中
        Enemy.enemyList.push({
            ele,
            width: ele.offsetWidth,
            height: ele.offsetHeight,
            left: this.bgSize.left + Math.round(Math.random() * (this.bgSize.width - ele.offsetWidth)),
            top: 0,
            speed: this.enemies[enemyType].speed,
            hp: this.enemies[enemyType].hp,
            die: this.enemyDie.bind(this),
        });
    }

    // 敌机移动
    enemyMove() {
        for (let index in Enemy.enemyList) {
            let ele = Enemy.enemyList[index];
            ele.top += ele.speed;
            if (ele.top > this.bgSize.height - 50) {
                this.enemyDie(ele);
            }
            ele.ele.style.left = ele.left + "px";
            ele.ele.style.top = ele.top + "px"
        }
    }

    // 移除敌机
    enemyDie(ele) {
        let index = Enemy.enemyList.indexOf(ele);
        Enemy.enemyList.splice(index, 1);
        ele.ele.className += " die";
        setTimeout(() => {
            ele.ele.remove();
        }, 1000)
    }

    // 碰撞检测
    detection() {
        let bullets = Bullet.bulletList;
        let enemies = Enemy.enemyList;
        for (let k = 0, bullet; bullet = bullets[k]; k++) {
            for (let i = 0, enemy; enemy = enemies[i]; i++) {
                if (this.collisionLeft(enemy, bullet)) {
                    if (this.collisionTop(enemy, bullet)) {
                        bullet.die(bullet); //检测成功后移除子弹
                        enemy.hp--;
                        if (enemy.hp <= 0) {
                            enemy.die(enemy);//敌机血量降为0后移除敌机
                        }
                    }
                }
            }
        }
    }
    collisionLeft(enemy, bullet) {
        return bullet.left > enemy.left - Bullet.bulletSize.width && bullet.left < enemy.left + enemy.width
    }
    collisionTop(enemy, bullet) {
        return bullet.top > enemy.top - Bullet.bulletSize.height && bullet.top < enemy.top + enemy.height;
    }


    // 敌机类型选择
    static enemyChoose() {
        let count = 0;
        setInterval(() => {
            count++;
            Math.random() < 0.5 ? new Enemy("small") : "";
            count % 5 === 0 ? (Math.random() < 0.7 ? new Enemy("middle") : "") : "";
            count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";
        }, 500)
    }
}