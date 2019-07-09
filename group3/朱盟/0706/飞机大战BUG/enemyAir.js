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

        EnemyAircraft.timer ? "" : EnemyAircraft.timer = setInterval(() => {
            this.airMoving();
            //碰撞检测;
        }, 50);
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
            e: air,
            hp: this.AirMode.hp,
            left: randomNumber(Center.DominSize.left, Center.DominSize.left + Center.DominSize.width - air.offsetWidth),
            top: 0,
            speed: this.AirMode.speed,
            width: air.offsetWidth,
            height: air.offsetHeight,
            die: this.enemyDie.bind(this,air)
        })
    }
    airMoving() {
        for (let air in Center.AirList) {
            let enemy = Center.AirList[air];
            enemy.top += enemy.speed;
            if (enemy.top >= Center.DominSize.height - 50) {
                enemy.die();
                // continue;
            }
            enemy.e.style.top = enemy.top + "px";
            enemy.e.style.left = enemy.left + "px";
        }
    }

    enemyDie(air) {
        air.classAdd("die");
        setTimeout(function (air) {
            air.remove();
            let index = Center.AirList.indexOf(air);
            Center.AirList.splice(index, 1);
        }.bind(this, air), 50);
    }


    static enemyCreater() {
        let count = 0;
        setInterval(() => {
            count++;
            Math.random() > 0.5 ? new EnemyAircraft() : "";
            count % 5 === 0 ? (Math.random() < 0.8 ? new EnemyAircraft("mid") : "") : "";
            count % 10 === 0 ? (Math.random() < 0.9 ? new EnemyAircraft("l") : "") : "";
        }, 1000)
    }

    static timer;

}