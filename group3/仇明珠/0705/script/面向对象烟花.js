class Utils{
    static move(dom, options, callback) {
        clearInterval(dom.timer);
        dom.timer = setInterval(function () {
            for (var attr in options) {
                if (attr === "opacity") {
                    var iNow = parseInt(getComputedStyle(dom)[attr] * 100)
                } else {
                    var iNow = parseInt(getComputedStyle(dom)[attr]);

                }
                var speed = (options[attr] - iNow) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (iNow === options[attr]) {
                    delete options[attr];
                    if (Object.keys(options).length == 0) {
                        clearInterval(dom.timer);
                        typeof callback == "function" ? callback() : "";
                    }
                } else {
                    if (attr === "opacity") {
                        dom.style[attr] = (iNow + speed) / 100;
                    } else {
                        dom.style[attr] = iNow + speed + "px";
                    }
                }
            }
        }, 50)
    }
    static randomColor() {
        var color = "#" + Math.round((Math.random()) * 0xffffff).toString(16);
        if (color.length != 7) {
            for (var i = 0; i < (7 - color.length); i++) {
                color += 0;
            }
        }
        return color;
    }
}
let{move,randomColor}=Utils;
class  FireWork{
    constructor({selector="#box"}={}){
        this.main = document.querySelector(selector);
        this.init();
    }
    init() {
        this.main.addEventListener("click", this.handelClick.bind(this));
    }
    handelClick(evt) {
        var e = evt || window.event;
        var offsetX = e.offsetX;
        var offsetY = e.offsetY;
        var fire = this.fireInit(offsetX);
        this.FireMove(fire, offsetY, this.fireBlast.bind(this, offsetX, offsetY))
    }
    createFire() {
        var fire = document.createElement("div");
        fire.className = "firework";
        return fire;
    }
    fireInit(offsetX) {
        var fire = this.createFire();
        fire.style.bottom = 0;
        fire.style.left = offsetX + "px";
        fire.style.background = randomColor();
        this.main.appendChild(fire);
        return fire;
    }
    FireMove(fire, offsetY, callback) {
        move(fire, {
            top: offsetY
        }, function () {
            fire.remove();
            callback();
        })
    }
    fireBlast(offsetX, offsetY) {
        var fireCount = (15 + Math.round(Math.random() * 10));
        var blank = Math.round(360 / fireCount);
        var r = 50 + Math.round(Math.random() * 100);
        var angle = 0;
        for (var i = 0; i < fireCount; i++) {
            angle += blank;
            var fire = this.createFire();
            var fireX = parseInt(Math.cos(Math.PI / 180 * angle) * r + offsetX);
            var fireY = parseInt(Math.sin(Math.PI / 180 * angle) * r + offsetY);
            fire.style.left = offsetX + "px";
            fire.style.top = offsetY + "px";
            fire.style.background = randomColor();
            this.main.appendChild(fire);
            move(fire, {
                left: fireX,
                top: fireY,
            }, function (fire) {
                fire.remove();
            }.bind(false, fire))
        }
    }
}
var firework = new FireWork();