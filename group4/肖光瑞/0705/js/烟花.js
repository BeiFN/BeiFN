let { on, randomColor, move } = MyLibs;
class Firework {
    constructor(selector) {
        this.main = document.querySelector(selector);
        this.init();
    }

    init() {
        on(this.main, "click", this.hanlderFireClick.bind(this))
        this.autoPlay(3000);
    }
    hanlderFireClick(evt) {
        let e = evt || window.event,
            [offsetX, offsetY] = [e.offsetX, e.offsetY],
            fire = this.fireworkInit(offsetX);
        this.fireworkMove(fire, offsetY, this.fireworkBoom.bind(this, offsetX, offsetY))
    }
    //创造烟花
    createFirework() {
        let fire = document.createElement("div");
        fire.className = "firework";
        fire.style.background = randomColor();
        return fire;
    }
    //初始化烟花
    fireworkInit(offsetX) {
        let fire = this.createFirework();
        fire.style.left = offsetX + "px";
        fire.style.bottom = 0;
        this.main.appendChild(fire)
        return fire;
    }
    //烟花移动
    fireworkMove(fire, offsetY, callback) {
        move(fire, {
            top: offsetY
        }, function () {
            fire.remove()
            callback()
        })
    }
    //烟花爆炸
    fireworkBoom(offsetX, offsetY) {
        var [count, r, angle] = [40, 5 + Math.round(Math.random() * 5), 0]
        for (var i = 0; i++ < count;) {
            angle = Math.round(360 / count * i);
            let [x, y] = [Math.round(r * (16 * Math.pow(Math.sin(angle), 3)) + offsetX),
            Math.round(-r * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) + offsetY)];
            let fire_boom = this.createFirework();
            fire_boom.style.left = offsetX + "px";
            fire_boom.style.top = offsetY + "px";
            this.main.appendChild(fire_boom);
            move(fire_boom, {
                left: x,
                top: y,
                opacity: 0
            }, function (fire_boom) {
                fire_boom.remove();
            }.bind(null, fire_boom))
        }
    }
    //自动播放
    autoPlay(delay) {
        this.delay = delay ? delay : 2000;
        let position = {
            offsetX: Math.round(Math.random() * 800),
            offsetY: Math.round(Math.random() * 600)
        }
        let fire = this.fireworkInit(position.offsetX);
        this.fireworkMove(fire, position.offsetY, this.fireworkBoom.bind(this, position.offsetX, position.offsetY))
        setTimeout(this.autoPlay.bind(this), this.delay)
    }
}
new Firework("#container")