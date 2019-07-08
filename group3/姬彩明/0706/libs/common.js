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
}