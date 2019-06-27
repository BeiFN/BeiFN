function $(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector))===1?ele[0]:ele;
}