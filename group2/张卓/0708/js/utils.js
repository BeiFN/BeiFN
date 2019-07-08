class utils{
    constructor(){

    }
    static $(selector){
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length ==1 ? ele[0]:ele
    }

    static on(dom,eventType,callback){
        if(dom.addEventListener){
            dom.addEventListener(eventType,callback)
        }else if(dom.attachEvent){
            dom.attachEvent("on"+eventType,callback)
        }else{
            dom["on"+eventType] = callback
        }
    }
}