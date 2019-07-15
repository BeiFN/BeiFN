class Utils{
    static $$(selector){
        var ele=null;
        return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
    }
}