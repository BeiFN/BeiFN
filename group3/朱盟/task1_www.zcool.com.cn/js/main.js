function goTopHandler(ev) {
    var ele_top = $("#goTop");
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop >= 800 && scrollTop < 3000) {
        goTop.style.cssText = "position: fixed; right: 9%; top: 600px;";
        ele_top.show();
    } else if (scrollTop > 3000) {
        goTop.style.position = "absolute";
        goTop.style.top = 3683 + "px";
        goTop.style.display = "block";
    } else if (scrollTop < 800) {
        goTop.style.cssText = "position: fixed; right: 9%; top: 600px;";
        ele_top.hide();
    }
}
window.addEventListener("scroll", goTopHandler);
