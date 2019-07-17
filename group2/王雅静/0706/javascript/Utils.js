class Utils{
    static $(selector){
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length ===1 ?ele[0]: ele; 
    }
    static on(dom,eventType,handlerEvent){
//把事件进行绑定
        dom.addEventListener(eventType,handlerEvent);
    }
}