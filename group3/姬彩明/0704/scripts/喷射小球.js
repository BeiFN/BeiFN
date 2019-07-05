function ShootBall(selector){
    this.main = document.getElementById(selector)
    if(this.main == null) return false
    this.init()
}
ShootBall.prototype.init = function(){
    this.timer = null 
    this.cHeigth =this.main.offsetHeight
    this.cWidth=this.main.offsetWidth
    this.main.addEventListener("mousedown",this.initShootBall.bind(this)) 
    this.main.addEventListener("mouseup",this.stopCreateBall.bind(this))
    this.main.addEventListener("mousemove",this.changePosition.bind(this))
}
ShootBall.prototype.initShootBall = function(evt){
    var 
        e = evt || window.event
    this.offsetX = e.offsetX
    this.offsetY = e.offsetY
    this.timer =setInterval(()=>{
        var ball = this.createBall(this.offsetX,this.offsetY)
        console.log(1)
        setTimeout(() => {
            this.ballMove(ball,this.offsetY)
        }, 100);
    },50)
}
ShootBall.prototype.changePosition = function(evt){
    var e = evt || window.event
    this.offsetX = e.offsetX
    this.offsetY = e.offsetY
}
ShootBall.prototype.createBall = function(){
    
    var ball = document.createElement("div")
    ball.className = "ball"
    ball.style.left = this.offsetX + "px"
    ball.style.top = this.offsetY + "px"
    ball.style.transition = "all 1s"
    this.main.appendChild(ball)
    return ball
}
ShootBall.prototype.ballMove = function (dom,mintop){
    var random_x = Math.round(Math.random()*this.cWidth),
        random_y = mintop+Math.round(Math.random()*(this.cHeigth-mintop))
    dom.style.left = random_x + "px"
    dom.style.top = random_y+"px"
    dom.style.opacity = 0.3
    setTimeout(() => {
        dom.remove()
    }, 1000);
}
ShootBall.prototype.stopCreateBall = function(){
    clearInterval(this.timer)
}
var shootBall = new ShootBall("container")