
// 一个工具库类Utils
class Utils{
    constructor(){

    }
    // 选择器 $ 
    static $(selector){
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }
    // on
    static on(dom,eventType,handlerEvent){
        dom.addEventListener(eventType,handlerEvent);
    }
    
}