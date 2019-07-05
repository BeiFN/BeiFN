function move( dom , options , callback){
    clearInterval(dom.timer)
    dom.timer = setInterval(()=>{
        for (var attr in options){
            var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr]*100) :parseInt(getComputedStyle(dom)[attr])
            var speed = (options[attr] - iNow)/10 
            speed = speed >0 ? Math.ceil(speed):Math.floor(speed)
            if(options[attr] === iNow){
                delete options[attr] 
                if(Object.keys(options).length === 0 ){
                    clearInterval(dom.timer)
                    typeof callback === "function" ? callback():""
                }
            }
            else{
                dom.style[attr] = attr === "opacity"? (iNow+speed)/100:(iNow+speed)+"px"
            }
        }
    },50)
}