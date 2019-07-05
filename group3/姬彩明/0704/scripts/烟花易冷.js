// function Firework(selector){
//     this.main = document.getElementById(selector)
//     if(this.main == null) return false
//     this.init();
// }
// Firework.prototype.init = function (){
//     this.main.addEventListener("click" , this.handleFirework.bind(this))
// }
// Firework.prototype.handleFirework = function (evt){
//     var e = evt || window.event,     
//         offsetX = e.offsetX, 
//         offsetY = e.offsetY,
//         fire = this.createFirework(offsetX)
//     this.moveFirework(fire,offsetY,this.boomFirework.bind(this,offsetX,offsetY))
// }
// Firework.prototype.createFirework = function(x){
//     var fire = document.createElement("div")
//     fire.className = "firework"
//     fire.style.background= getRandomColor()
//     fire.style.left = x + "px"
//     fire.style.bottom = 0 
//     this.main.appendChild(fire)
//     return fire 
// }
// Firework.prototype.createBoomFirework =function(x,y){
//     var boom_fire = document.createElement("div")
//     boom_fire.className = "boomFirework" 
//     boom_fire.style.background = getRandomColor()
//     boom_fire.style.left = x + "px"
//     boom_fire.style.top = y + "px"
//     this.main.appendChild(boom_fire)
//     return boom_fire
// }
// Firework.prototype.moveFirework = function(dom,y,callback){
//     move(dom,{
//         width:7 ,
//         height:7 ,
//         // opacity : 0.9,
//         top :y
//     },
//     function(){
//         dom.remove()
//         callback()
//     })
// }
// Firework.prototype.boomFirework = function(offsetX,offsetY){
//     var fireworkCount  = 15 +　Math.round(Math.random()*10) ,
//         angleDistance = Math.round(360/fireworkCount),
//         r = 100 + Math.round(Math.random()*100),
//         angle = 0 
//     for( var i = 0 ; i <fireworkCount ; i++ ){
//         angle += angleDistance
//         var 
//             // x_target  = Math.round(Math.cos(angle)*r+offsetX),
//             // y_target  = Math.round(Math.sin(angle)*r+offsetY),
//             x_target = Math.round(Math.cos(Math.PI / 180 * angle) * r + offsetX),
//             y_target = Math.round(Math.sin(Math.PI / 180 * angle) * r + offsetY),
//             boom_fire  = this.createBoomFirework(offsetX,offsetY)
//         move(boom_fire,{
//             top:y_target,
//             left:x_target,
//             opacity:0
//         },
//         function(){
//             boom_fire.remove()

//         })

//     }   
// }
// var firework = new Firework("container")
// firework.init()

function Firework(selector){
    this.main = document.getElementById(selector)
    if(this.main == null ) return false
    this.init()
}
Firework.prototype.init = function(){
    this.main.addEventListener("click" ,this.fireClickEvent.bind(this))
}
Firework.prototype.fireClickEvent = function(evt){
    var e = evt||window.event ,
        x = e.offsetX,
        y = e.offsetY,
        fire = this.fireworkInit(x)
    this.fireworkMove(fire,y,this.fireworkBoom.bind(this,x,y))
}
Firework.prototype.fireworkInit = function (x){
    var fire = this.fireworkCreate()
    fire.style.left = x + "px"
    fire.style.bottom = 0
    return fire
}
Firework.prototype.fireworkCreate = function(){
    var fire = document.createElement("div") 
    fire.className = "firework"
    fire.style.background = getRandomColor()
    this.main.appendChild(fire)
    return fire
}
Firework.prototype.fireworkMove = function(dom,y,callback){
    move(dom , {
        width:8,
        height:8,
        top:y
    },
    function(){
        dom.remove()
        callback()
    }
    )
}
Firework.prototype.fireworkBoom = function(x,y){
    var boom_fire_count = 15+Math.round(Math.random()*10),
        angleDistance = Math.round(360/boom_fire_count),
        r = 100+ Math.round(Math.random()*100),
        angle = 0 
    for(var i = 0 ; i < boom_fire_count ; i ++){
        angle += angleDistance
        var 
            x_target = Math.round(Math.cos(Math.PI/180*angle)*r)+x,
            y_target = Math.round(Math.sin(Math.PI/180*angle)*r)+y,
            boom_fire = this.fireworkCreate()
        boom_fire.style.left = x + "px"
        boom_fire.style.top = y + "px"
        boom_fire.style.width =  8+"px"
        boom_fire.style.height = 8 +"px"
        move(boom_fire,{
            height:14,
            width:14,
            top:y_target,
            left:x_target,
            opacity:0
        },
        function(){
            boom_fire.remove()
        })
    }
}
var firework = new Firework("container")