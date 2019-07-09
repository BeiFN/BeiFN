class LittleBal {

    constructor(ele) {
        this.main_ele = ele.nodeType === 9 ? ele : document.querySelector(ele);
        this.init();
    }

    init() {
        this.timer = null;// 小球运动定时器;
        this.cWidth = document.documentElement.clientWidth;
        this.cHeight = document.documentElement.clientHeight;
        // 绑定事件;
        this.main_ele.addEventListener("mousedown", this.handlerMousedown.bind(this));
        this.main_ele.addEventListener("mouseup", this.stopCreateBall.bind(this));
        this.main_ele.addEventListener("mousemove", this.changeOffset.bind(this));
    }
    changeOffset(evt) {
        var e = evt || window.event;

        this.offsetX = e.clientX;
        this.offsetY = e.clientY;
    }
    handlerMousedown(evt) {
        var e = evt || window.event;
        this.offsetX = e.offsetX;
        this.offsetY = e.offsetY;
        this.timer = setInterval(function () {
            var ball = this.createBall();

            setTimeout(function () {
                this.ballMove(ball, e.offsetY);
            }.bind(this), 100);

        }.bind(this), 50)
    }
    createBall() {
        // console.log("创造小球")
        var ele = document.createElement("div");
        ele.className = "ball";

        ele.style.left = this.offsetX + "px";
        ele.style.top = this.offsetY + "px";
        ele.style.transition = "all 1s";

        document.body.appendChild(ele);
        // console.log(ele);
        return ele;
    }
    ballMove(ball, minTop) {

        var randomL = Math.round(Math.random() * this.cWidth);
        var randomT = minTop + Math.round(Math.random() * (this.cHeight - minTop));

        ball.style.left = randomL + "px";
        ball.style.top = randomT + "px";
        ball.style.opacity = 0.1;

        setTimeout(function () {
            ball.remove();
        }, 1000)
    }
    stopCreateBall = function () {
        clearInterval(this.timer);
    }
}

new LittleBal(document);