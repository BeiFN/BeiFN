
// 1.获取元素
function Magnifier(){
  this.main = document.querySelector(".container")
  this.init()
}

// 2.初始化：监听事件
Magnifier.prototype.init = function(){
  console.log(12)
}

new Magnifier()