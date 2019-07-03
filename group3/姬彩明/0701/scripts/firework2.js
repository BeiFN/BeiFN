function Firework(selector){
    this.main = document.getElementById(selector)
    if(this.main == null) return false
    this.init()
}