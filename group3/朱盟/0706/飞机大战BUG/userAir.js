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
        this.Aircraft.style.left = (Center.winSize.width / 2 - Center.AirSize.width / 2) + "px";
        Aircraft.x = this.Aircraft.offsetLeft;
        Aircraft.y = this.Aircraft.offsetTop;
        return this.Aircraft;
    }

    AircraftMoving(ev) {
        let e = ev || window.event;
        let {
            x,
            y
        } = this.AirBoundary(e.clientX - Center.AirSize.width / 2, e.clientY - Center.AirSize.height / 2);
        Aircraft.x = x;
        Aircraft.y = y;
        this.Aircraft.style.left = x + "px";
        this.Aircraft.style.top = y + "px";
    }

    AirBoundary(x, y) {

        let minX = Center.DominSize.left;
        let maxX = Center.DominSize.left + Center.DominSize.width - Center.AirSize.width;
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


//子弹
class Bullet {
    constructor() {
        this.speed = 20;

        if (Bullet.timer === undefined) {
            Bullet.timer = setInterval(() => {
                this.BulletMoving()
            }, 50);
        }
        // Center.TimerHandList.push(

        // );
        this.ini();
    }

    ini() {
        this.BulletBuider();
    }


    BulletBuider() {
        let left = (Aircraft.x + Center.AirSize.width / 2 - Center.BulletSize.width);
        let top = Aircraft.y;
        this.Bullet = createElement({
            tagName: "div",
            class: "bullet",
            style: "left:" + left + "px; top:" + top + "px;"
        }).appendTo(document.body);
        Center.BulletList.push({
            e: this.Bullet,
            left,
            top,
            die: this.bulletDie.bind(this, this.Bullet)
        });

        return this.Bullet;
    }

    bulletDie(bullet) {
        bullet.classAdd("die");
        // 等待动画完成;
        setTimeout(function (bullet) {
            bullet.remove();
            let index = Center.BulletList.indexOf(bullet);
            Center.BulletList.splice(index, 1);
            bullet = null; // 清除引用;
        }.bind(this, bullet), 50);
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