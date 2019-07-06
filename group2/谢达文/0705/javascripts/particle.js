
        
class Particle{
    constructor({selector = document} =  {}){
        this.main_ele = selector.nodeType === 9 ? selector : document.querySelector(selector);
        this.init();
    }
    init(){
        this.timer = null;
        this.main_ele.addEventListener("mousedown",this.handlerMouseDown.bind(this));
        this.main_ele.addEventListener("mouseup",this.stopCreateBall.bind(this));
        this.main_ele.addEventListener("mousemove",this.changePosition.bind(this));
    }
    changePosition(evt){
        var e = evt || event;
        this.ball_left = e.offsetX;
        this.ball_top  = e.offsetY;
    }
    handlerMouseDown(evt){
        var e = evt || event ;
            this.ball_left = e.offsetX;
            this.ball_top  = e.offsetY;
            this.cWideth   = document.documentElement.clientWidth;
            this.cHeight   = document.documentElement.clientHeight; 
            

            this.timer = setInterval(function(){
                 var ball = this.createBall();
                setTimeout(function(){
                    this.makeBallMove(ball);
                }.bind(this),50)
               
            }.bind(this),50)

    }
    createBall(){
        var ball = document.createElement("div");
            ball.className = "ball";
            
            ball.style.left = this.ball_left + "px";
            ball.style.top = this.ball_top + "px"; 
            ball.style.borderRadius = Math.round(Math.random()*100) +"%";
            ball.style.background =  getRandomColor();
            ball.style.transition = "all 1s";
            document.body.appendChild(ball);
            return ball;
    }
    stopCreateBall(){
        clearInterval(this.timer);
        console.log("结束运动");
    }
    makeBallMove(ball){
        ball.style.left = Math.round(Math.random() * this.cWideth) +"px";
        ball.style.top = this.ball_top + Math.round(Math.random()* (this.cHeight-this.ball_top)) + "px";
        ball.style.opacity = 0.1;
        setTimeout(function(){
            ball.remove();
        },1000)
    }
}
new Particle({selector : document});