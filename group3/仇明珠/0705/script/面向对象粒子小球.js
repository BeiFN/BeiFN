class Particle{
    constructor({selector=document}={}){
        this.main = (selector.nodeType == 9 ? selector : document.querySelector(selector));
        this.timer = null;
        this.init();     
    }
    init() {
        this.cWidth  = document.documentElement.clientWidth;
        this.cHeight = document.documentElement.clientHeight;
        this.main.addEventListener("mousedown", this.handelMouseDown.bind(this));
        this.main.addEventListener("mouseup",this.handelMouseUp.bind(this));
        this.main.addEventListener("mousemove",this.handelMouseMove.bind(this));
    }
    handelMouseDown(evt) {
        var e = evt || window.event;
        this.offsetX = e.offsetX;
        this.offsetY = e.offsetY;
        this.timer = setInterval(function () {
            var ball = this.createBall();
            setTimeout(function(){
                this.ballMove(ball,this.randomPosition());
            }.bind(this),100)
        }.bind(this), 50)
    }
    createBall() {
        var ball = document.createElement("div");
        ball.className = "ball";
        ball.style.left = this.offsetX + "px";
        ball.style.top = this.offsetY + "px";
        ball.style.transition  = "all 1s";
        document.body.appendChild(ball);
        return ball;
    }
    randomPosition() {
        var y = this.offsetY + Math.round(Math.random() * (this.cHeight - this.offsetY))-10;
        var x = Math.round(Math.random() * this.cWidth)-10;
        return {
            target_x: x,
            target_y: y
        }
    }
    ballMove(ele,obj){
        ele.style.left=obj.target_x+"px";
        ele.style.top=obj.target_y+"px";
        setTimeout(function(){
            ele.remove();
        },1000)
    }
    handelMouseUp=function(){
        clearInterval(this.timer);
    }
    handelMouseMove(evt){
        var e=evt||window.event;
        this.offsetX = e.clientX ; 
        this.offsetY = e.clientY;
    }
}
let particle = new Particle();