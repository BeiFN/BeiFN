function Firework(selector) {
    this.container = document.querySelector(selector);
    if (this.container === null) return false;
    this.init();
}
// 1. 创造随机颜色的div的功能;
// 2. 上升功能;
// 3. 爆炸功能;

Firework.prototype.init = function () {
    this.container.addEventListener("click", this.handerClick.bind(this));   //绑定点击事件
}

Firework.prototype.handerClick = function (evt) {   //处理点击事件
    var e = evt || window.event;
    var offsetX = e.offsetX;
    var offsetY = e.offsetY;
    var fire = this.createFirework();               //创建随机颜色的烟花
    fire = this.setFireworkPosition(fire, offsetX);    //为烟花设置初始位置
    var moveArray = this.fireworkBoom(offsetX, offsetY);   //获取烟花爆炸后移动目标点数组
    var fireworkArray = [];                               //创建烟花爆炸后溅射物的数组
    for (var i = 0; i < moveArray.length; i++) {
        var moveFire = this.createFirework();
        moveFire.style.left = offsetX + "px";
        moveFire.style.top = offsetY + "px";
        moveFire.style.display = "none";
        this.container.appendChild(moveFire);
        fireworkArray.push(moveFire);
    }
    console.log(moveArray, fireworkArray);
    this.fireworkMove(fire, offsetY, this.fireworkBoomMove.bind(this, moveArray, fireworkArray));   //烟花移动并爆炸
}

Firework.prototype.createFirework = function () {   //创建烟花函数
    var fire = document.createElement("div");
    fire.className = "firework";
    fire.style.backgroundColor = getRandomColor();
    return fire;
}

Firework.prototype.setFireworkPosition = function (fire, offsetX) { //设置烟花初始位置函数
    fire.style.left = offsetX + "px";
    fire.style.bottom = 0;
    this.container.appendChild(fire);
    return fire;
}

Firework.prototype.fireworkMove = function (fire, offsetY, boomCallback) {    //烟花移动到鼠标点击处被移除，然后发生爆炸
    move(fire, {
        top: offsetY
    }, function () {
        fire.remove();
        boomCallback()
    });
}

Firework.prototype.fireworkBoom = function (offsetX, offsetY) {     //计算烟花爆炸后溅射物移动的目标点
    var randomFireworkCount = 18 + Math.round(Math.random() * 18);
    var blank = Math.round(360 / randomFireworkCount);
    var r = 100 + Math.round(Math.random() * 100);
    var angle = 0;
    var moveArray = [];
    for (var i = 0; i < randomFireworkCount; i++) {
        angle += blank;
        var oneFireworkTarget = {};
        oneFireworkTarget.firework_targetX = Math.round(Math.cos(Math.PI / 180 * angle) * r + offsetX);
        oneFireworkTarget.firework_targetY = Math.round(Math.sin(Math.PI / 180 * angle) * r + offsetY);
        // console.log(oneFireworkTarget.firework_targetX,oneFireworkTarget.firework_targetY);
        moveArray.push(oneFireworkTarget);
    }
    // console.log(moveArray);
    return moveArray;
}
Firework.prototype.fireworkBoomMove = function (moveArray, moveFire) {       //溅射物移动到目标点并被移除
    for (var i = 0; i < moveArray.length; i++) {
        moveFire[i].style.display = "block";
        move(moveFire[i], {
            left: moveArray[i].firework_targetX,
            top: moveArray[i].firework_targetY,
            opacity: 0
        }, function (fire_boom) {
            fire_boom.remove();
        }.bind(false, moveFire[i]));
    }
}



function getRandomColor() {     //获取随机颜色
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function move(dom, options, callback) {     //移动框架
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
        for (var attr in options) {
            if (attr === "opacity") {
                var iNow = parseInt(getComputedStyle(dom)[attr] * 100)
            } else {
                var iNow = parseInt(getComputedStyle(dom)[attr])
            }
            var speed = (options[attr] - iNow) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (options[attr] === iNow) {
                // 所有属性运动结束之后再去关闭定时器;
                delete options[attr];
                if (Object.keys(options).length === 0) {
                    clearInterval(dom.timer);
                    typeof callback === "function" ? callback() : "";
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

new Firework("#container");