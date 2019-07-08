class Utils{
    static $(selector){
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0]:ele;
    }
    static on(ele, event, f){
       ele.addEventListener(event, f);
    }
}