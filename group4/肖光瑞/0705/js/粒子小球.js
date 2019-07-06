let { on, $, randomColor } = MyLibs;

class Particle {
    constructor(ele) {
        this.main = ele.nodeType === 9 ? ele : document.querySelector(ele);
        this.init();
    }
    init() {
        this.timer = null;
        this.cWidth = document.documentElement.clientWidth;
        this.cHeight = document.documentElement.clientHeight;
        on(this.main, "mousedown", this.handlerMousedown.bind(this))
        on(this.main, "mouseup", this.stopCreateBall.bind(this))
        on(this.main, "mousemove", this.changePlace.bind(this))
    }
    handlerMousedown(evt) {
        let e = evt || window.event;
        this.offsetX = e.offsetX;
        this.offsetY = e.offsetY;
        this.timer = setInterval(function () {
            let ball = this.createBall();
            setTimeout(function () {
                this.ballMove(ball, this.offsetY)
            }.bind(this), 100)
        }.bind(this), 50)
    }
    createBall() {
        let ele = document.createElement("div");
        let backgroundColor = randomColor();
        ele.className = "ball";
        ele.style.left = this.offsetX + "px";
        ele.style.top = this.offsetY + "px";
        ele.style.transition = "all 1s";
        ele.style.background = backgroundColor;
        document.body.appendChild(ele);
        return ele;
    }
    stopCreateBall() {
        clearInterval(this.timer)
    }
    ballMove(ball, minTop) {
        let randomL = Math.round(Math.random() * this.cWidth);
        let randomT = minTop + Math.round(Math.random() * (this.cHeight - minTop));
        ball.style.left = randomL + "px";
        ball.style.top = randomT + "px";
        ball.style.opacity = 0.1;
        setTimeout(function () {
            ball.remove();
        }, 1000)
    }
    changePlace(evt) {
        let e = evt || window.event;
        this.offsetX = e.clientX;
        this.offsetY = e.clientY;
    }
}
new Particle(document)



// function Particle(ele) {
//     this.main = ele.nodeType === 9 ? ele : document.querySelector(ele);
//     this.init();
// }
// //初始化
// Particle.prototype.init = function () {
//     this.timer = null;
//     this.cWidth = document.documentElement.clientWidth;
//     this.cHeight = document.documentElement.clientHeight;
//     this.main.addEventListener("mousedown", this.handlerMousedown.bind(this));
//     this.main.addEventListener("mouseup", this.stopCreateBall.bind(this));
//     this.main.addEventListener("mousemove", this.changePlace.bind(this))
// }

// Particle.prototype.handlerMousedown = function (evt) {
//     var e = evt || window.event;
//     this.offsetX = e.offsetX;
//     this.offsetY = e.offsetY;
//     this.timer = setInterval(function () {
//         var ball = this.createBall();
//         setTimeout(function () {
//             this.ballMove(ball, this.offsetY)
//         }.bind(this), 100)
//     }.bind(this), 50)
// }

// //创建小球
// Particle.prototype.createBall = function () {
//     var ele = document.createElement("div");
//     var backgroundColor = "#" + Math.round(parseInt("ffffff", 16) * Math.random()).toString(16).padStart(6, "0");
//     ele.className = "ball";
//     ele.style.left = this.offsetX + "px";
//     ele.style.top = this.offsetY + "px";
//     ele.style.transition = "all 1s";
//     ele.style.background = backgroundColor;
//     document.body.appendChild(ele);
//     return ele;
// }

// //停止创建
// Particle.prototype.stopCreateBall = function () {
//     clearInterval(this.timer)
// }

// //粒子小球移动
// Particle.prototype.ballMove = function (ball, minTop) {
//     var randomL = Math.round(Math.random() * this.cWidth);
//     var randomT = minTop + Math.round(Math.random() * (this.cHeight - minTop));
//     ball.style.left = randomL + "px";
//     ball.style.top = randomT + "px";
//     ball.style.opacity = 0.1;
//     setTimeout(function () {
//         ball.remove();
//     }, 1000)
// }

// //改变小球的创建地址
// Particle.prototype.changePlace = function (evt) {
//     var e = evt || window.event;
//     this.offsetX = e.clientX;
//     this.offsetY = e.clientY;
// }




