//游戏信息传递和公共实例处理中心
class Center {
    constructor() {
        Center.domin = $(".main");
        Center.menu = $(".options");
        Center.AirList ? "" : Center.AirList = [];
        Center.BulletList ? "" : Center.BulletList = [];
        this.ini();
        return this;
    }
    ini() {
        this.AirPlayer = Center.builder("plane");
        this.Bullet = Center.builder("bullet");
        Center.BulletSize = {
            width: this.Bullet.offsetWidth,
            height: this.Bullet.offsetHeight
        }
        Center.AirSize = {
            width: this.AirPlayer.offsetWidth,
            height: this.AirPlayer.offsetHeight
        }
        Center.DominSize = {
            left: Center.domin.offsetLeft,
            width: Center.domin.offsetWidth,
            height: Center.domin.offsetHeight,
        }
        Center.winSize = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
        Center.TimerHandList ? "" : Center.TimerHandList = [];
        this.AirPlayer.remove();
        this.Bullet.remove();
        this.AirPlayer = null;
        this.Bullet = null;

    }


    GameStart = function () {
        Center.GameTimer = setInterval(
            function () {
                Center.TimerHandList.forEach(fn => {
                    fn();
                });
            }, 40);

        Center.TimerHandList.push(Center.CollisionDetection);
    }
    // bullet
    static builder = function (className) {
        return createElement({
            tagName: "div",
            class: className
        }).appendTo(document.body);
    }
    static CollisionDetection = function () {
        // 碰撞检测;
        // 双层循环比对;
        function collisionLeft(enemy, bullet) {
            return bullet.left > enemy.left - Center.BulletSize.width && bullet.left < enemy.left + enemy.width
        }

        function collisionTop(enemy, bullet) {
            return bullet.top > enemy.top - Center.BulletSize.height && bullet.top < enemy.top + enemy.height;
        }
        Center.AirList.forEach(air => {
            Center.BulletList.forEach(bullet => {
                if (collisionLeft(air, bullet)) {
                    if (collisionTop(air, bullet)) {
                        bullet.die();
                        air.hp--
                        if (air.hp <= 0) {
                            air.die();
                        }
                    }
                };

            });
        });



    }
    static domin;
    static menu;
    static GameMode;
    static BulletList;
    static AirList;
    static GameTimer;
    static DominSize;
    static AirSize;
    static winSize;
    static TimerHandList;
}