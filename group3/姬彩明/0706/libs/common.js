class Utils{
    constructor(){

    }
    //选择器封装
    static $(selector){
        let ele = null 
        return (ele = document.querySelectorAll(selector)).length === 1?ele:ele[0]
    }
    //事件绑定封装
    static on(dom , event_type ,callback,selector){
        if(dom.addEventListener){
            if(arguments.length ===4&&typeof arguments[3] ==="string"){
                dom.addEventListener(event_type,Utils.delegation(callback,selector))
            }
            else{
                dom.addEventListener(event_type,callback)
            }
        }
        else if(dom.attachEvent){
            dom.attachEvent("on"+event_type,callback)
        }
        else{
            dom["on"+event_type] = callback
        }
    }
    //事件委托封装
    static delegation(callback,selector){
        return function(evt){
            let e = evt||window.event,
                target = e.target || e.srcElement,
                eleList = this.querySelectorAll(selector)
        }
    }
    //删除类名
    static classNameRemove(dom ,className){
        return dom.className = dom.className.replace(new RegExp("\S"+className),"")
    }
    //获取元素绝对位置
    static getAbsPosition(dom){
        let position = {
            left:dom.offsetLeft,
            top : dom.offsetTop
        }
        if(dom.offsetParent === document.body){
            return position
        }
        else{
            let pos = getAbsPosition
        }
    }
}