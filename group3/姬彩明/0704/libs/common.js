/**
 * 多属性运动插件
 */

 function move (dom , options,callback){
    clearInterval(dom.timer)
    dom.timer = setInterval(() => {
        for(var attr in options){
            var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr]*100):parseInt(getComputedStyle(dom)[attr]),
                speed = (options[attr] - iNow)/10
            speed  = speed > 0? Math.ceil(speed):Math.floor(speed)
            if(options[attr] === iNow) {
                delete options[attr]
                if(Object.keys(options).length === 0){
                    clearInterval(dom.timer)
                    typeof callback === "function" ? callback() : ""
                }
            }
            else {
                dom.style[attr] = attr === "opacity" ? (iNow+speed)/100:(iNow+speed)+"px"
            }
        }
    }, 50);
 }

 /**
  * 随机颜色插件封装
  */
//  function getRandomColor(){
//     var r = Math.round(Math.random()*255),
//         g = Math.round(Math.random()*255),
//         b = Math.round(Math.random()*255)
//     return "rgb("+r+","+g+","+b+")"
//  }
function getRandomColor(){
    var r = Math.round(255*Math.random()),
        g = Math.round(255*Math.random()),
        b = Math.round(255*Math.random())

    return "rgb("+r+","+g+","+b+")"
}