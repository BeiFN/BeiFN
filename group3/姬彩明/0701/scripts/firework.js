function Firework(selector) {
    this.main = document.getElementById(selector)
    if (this.main == null) return false
    this.init()
}
Firework.prototype.init = function () {
    this.main.addEventListener("click", this.fireClickEvent.bind(this))
}
Firework.prototype.fireClickEvent = function (evt) {
    var e = evt || window.event
    var offsetX = e.offsetX
    var offsetY = e.offsetY
    var fire = this.fireworkInit(offsetX)
    this.fireworkMove(fire, offsetY, this.fireworkBoom.bind(this, offsetX, offsetY))
}
Firework.prototype.fireworkInit = function (offsetX) {
    var fire = this.createFirework()
    fire.style.left = offsetX + "px"
    fire.style.bottom = 0
    this.main.appendChild(fire)
    return fire
}
Firework.prototype.createFirework = function () {
    var fire = document.createElement("div")
    fire.className = "firework"
    fire.style.background = "#" + Math.round(parseInt("ffffff", 16) * Math.random()).toString(16).padStart(6, "0")
    return fire
}
Firework.prototype.fireworkMove = function (fire, offsetY, callback) {
    move(fire, {
        
        top: offsetY
    }, function () {
        fire.remove()
        callback()
    })
}
Firework.prototype.fireworkBoom = function (offsetX, offsetY) {
    var randomFireCount = 15 + Math.round(Math.random() * 10)
    var blank = Math.round(360 / randomFireCount)
    var r = 100 + Math.round(Math.random() * 100)
    var angle = 0

    for (var i = 0; i < randomFireCount; i++) {
        angle += blank

        var fire_targetX = Math.round(Math.cos(Math.PI / 180 * angle) * r + offsetX)
        var fire_targetY = Math.round(Math.sin(Math.PI / 180 * angle) * r + offsetY)

        var fire_boom = this.createFirework()
        fire_boom.style.left = offsetX + "px"
        fire_boom.style.top = offsetY + "px"
        this.main.appendChild(fire_boom)

        move(fire_boom, {
            left: fire_targetX,
            top: fire_targetY,
            opacity: 0
        }, function (fire_boom) {
            fire_boom.remove()
        }.bind(false, fire_boom))
    }

}
new Firework("container")