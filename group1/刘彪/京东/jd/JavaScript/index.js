var cancelBtn = $(".cancelBtn");
var topAd = $(".topAd");
function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}
cancelBtn.onclick = function(){
    topAd.remove();
}