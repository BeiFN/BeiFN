function Firework(selector){
    this.main = document.addEventListener(selector)
    if(this.main == null ) return false
    this.init()
}
Firework.prototype.init = function(){
    this.main.addEventListener("click",this.fireClickEvent.bind(this))
}
Firework.prototype.fireClickEvent = function (evt){
    var e = evt || window.event
    var offsetX = e.offsetX
    var offsetY = e.offsetY
    this.fireworkInit(offsetX)
    this.fireworkMove(fire,offsetY,this.fireworkBoom.bind(this,offsetX,offsetY))
}
Firework.prototype.fireworkInit = function(offsetX){
    var fire = this.createFirework()
    fire.style.left= offsetX+"px"
    fire.style.bottom = 0 
    this.main.appendChild(fire)
    return fire
}
Firework.prototype.createFirework = function(){
    var fire = document.createElement("div")
    fire.className = "firework"
    fire.style.background = "#"+Math.round(parseInt("ffffff",16)*Math.random()).toString(16).padStart(6,"0")
    
}