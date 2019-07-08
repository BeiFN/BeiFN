//游戏处理器,处理游戏的核心业务
class GameProcess {
    constructor() {
        this.menu = $(".options");
        this.domin = $(".main");
        Center.domin = this.domin;
        this.ini();
    }
    ini() {
        this.menu.on("click", this.setGameMode.bind(this), "p");
    }
    setGameMode(ev) {
        let e = ev || window.event;
        let captureE = e.target || e.srcElement;
        let parent = captureE.parentNode;
        let childs = parent.children;
        Array.from(childs).forEach((element, index) => {
            if (element === captureE) {
                Center.GameMode = index;
                this.gameStart();
            }
        });
    }

    gameStart() {
        this.loadingAnimation();
        this.bgMove();

    }

    loadingAnimation() {
        this.menu.remove();
        this.logo = createElement({
            tagName: "div",
            class: "logo"
        }).appendTo(document.body);
        this.planeLoading = createElement({
            tagName: "div",
            class: "plane-loading"
        }).appendTo(document.body);
        let index = 0;
        this.loading = setInterval(() => {
            this.planeLoading.style.backgroundImage = `url(${loadList[++index%3]+1})`;
            if (index >= 5) {
                clearInterval(this.loading);
                this.loading = null;
                this.logo.remove();
                this.planeLoading.remove();
            }
        }, 800)

    }

    bgMove() {
        let positionY = 0;
        let speed = 5;
        console.log(Center.GameMode);
        switch (Center.GameMode) {
            case 0:
                speed = 5;
                break;
            case 1:
                speed = 8;
                break;
            case 2:
                speed = 20;
                break;
            case 3:
                speed = 20;
                break;
        }
        this.bgMovingTimer = setInterval(() => {
            positionY += speed;
            this.domin.style.backgroundPositionY = positionY + "px";
        }, 50);
    }


}


//子弹
class Bullet {
    constructor() {
        this.speed = 20;

        if (Bullet.timer === undefined) {
            Bullet.timer = setInterval(() => {
                this.BulletMoving();
            }, 20);
        }
        this.ini();
    }

    ini() {
        this.BulletBuider();
    }


    BulletBuider() {
        // console.log(Aircraft.x, Center.AirSize.w, Aircraft.y);
        let left = (Aircraft.x + Center.AirSize.w / 2 - 3);
        let top = Aircraft.y;
        this.Bullet = createElement({
            tagName: "div",
            class: "bullet",
            style: "left:" + left + "px; top:" + top + "px;"
        }).appendTo(document.body);
        Center.BulletList ? "" : Center.BulletList = [];
        Center.BulletList.push({
            e: this.Bullet,
            left,
            top,
            die: this.bulletDie.bind(this, this.Bullet)
        });

        return this.Bullet;
    }

    bulletDie(bullet) {
        let index = Center.BulletList.indexOf(bullet);
        console.log("1", index);
        bullet.classAdd("die");
        // 等待动画完成;
        setTimeout(function (bullet, index) {
            console.log(index, bullet);
            bullet.remove();
            // bullet = false; // 清除引用;
            Center.BulletList.splice(index, 1);
        }.bind(this, bullet, index), 50);
    }

    BulletMoving() {
        for (let e in Center.BulletList) {
            let bullet = Center.BulletList[e];
            bullet.top -= this.speed;
            bullet.e.style.top = parseInt(bullet.top) + "px";
            bullet.e.style.left = bullet.left + "px";
            // console.log(bullet.top);
            if (bullet.top <= -20) {
                bullet.die();
                continue;
            }
        }
    }
    static timer;

}


//玩家游戏飞行器
class Aircraft {
    constructor() {
        this.ini();
        return this;
    }
    ini() {
        this.AircraftBuilder();
        document.on("mousemove", this.AircraftMoving.bind(this));
    }
    AircraftBuilder() {
        this.Aircraft = createElement({
            tagName: "div",
            class: "plane",
            style: "cursor:none;"
        }).appendTo(document.body);
        Center.AirSize.w = this.Aircraft.offsetWidth;
        Center.AirSize.h = this.Aircraft.offsetHeight;
        this.Aircraft.style.left = (Center.B.w / 2 - Center.AirSize.w / 2) + "px";
        Aircraft.x = this.Aircraft.offsetLeft;
        Aircraft.y = this.Aircraft.offsetTop;
        return this.Aircraft;
    }

    AircraftMoving(ev) {
        let e = ev || window.event;
        let {
            x,
            y
        } = this.AirBoundary(e.clientX - Center.AirSize.w / 2, e.clientY - Center.AirSize.h / 2);
        Aircraft.x = x;
        Aircraft.y = y;
        this.Aircraft.style.left = x + "px";
        this.Aircraft.style.top = y + "px";
    }

    AirBoundary(x, y) {

        let minX = Center.DominSize().left;
        let maxX = Center.DominSize().left + Center.DominSize().width - Center.AirSize.w;
        x = x < minX ? minX : x;
        x = x > maxX ? maxX : x;
        y = y < 0 ? 0 : y;
        return {
            x,
            y
        }
    }

    fire() {

        let frequency = 100;

        switch (Center.GameMode) {
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
                frequency = 500;
                break;
        }

        setInterval(() => {
            new Bullet();
        }, frequency);


    }
    static x;
    static y;

}


//游戏信息传递和公共实例处理中心
class Center {
    constructor() {
        this.ini();
    }
    ini() {}
    static domin;
    static GameMode;
    static BulletList;
    static AirList;
    static GameTimer;
    static DominSize = function () {
        return {
            left: Center.domin.offsetLeft,
            width: Center.domin.offsetWidth
        }
    }

    static AirSize = {
        w: null,
        h: null
    };
    static B = {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    }

}

// 敌机
class EnemyAircraft {
    constructor(type = "sm") {
        this.EnemyTypes = {
            "sm": {
                className: "enemy-small",
                speed: 10,
                hp: 1,
                dieClassName: "enemy-small-die"
            },
            "mid": {
                className: "enemy-middle",
                speed: 5,
                hp: 10,
                dieClassName: "enemy-middle-die"
            },
            "l": {
                className: "enemy-large",
                speed: 1,
                hp: 50,
                dieClassName: "enemy-large-die"
            }
        }
        Center.AirList ? "" : Center.AirList = [];
       
        this.AirMode = this.EnemyTypes[type];
        this.ini();
    }
    ini() {
        this.EnemyAirBuider();
    }
    EnemyAirBuider() {
        let air = createElement({
            tagName: "div",
            class: this.AirMode.className,

        }).appendTo(document.body);

        Center.AirList.push({
            e:air,
            hp: this.AirMode.hp,
            left: Enemy.randomLeft(this.mainSize.left, this.mainSize.left + this.mainSize.width - ele.offsetWidth),
            top: 0,
            speed: this.AirMode.speed,
            width: air.offsetWidth,
            height: air.offsetHeight,
            die: this.enemyDie.bind(this)
        })
    }
}


new GameProcess();
// new Aircraft().fire();