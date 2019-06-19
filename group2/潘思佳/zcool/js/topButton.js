var topButton = document.getElementById("top_button");

document.addEventListener("scroll", scrollHandler);
topButton.addEventListener("click", clickHandler);
topButton.style.display = "none";

function scrollHandler(e) {
    if (document.documentElement.scrollTop > 500) {
        topButton.style.display = "block";
        if ((document.body.clientHeight - document.documentElement.scrollTop - document.documentElement.clientHeight) < 263) {
            topButton.style.bottom = 263 - (document.body.clientHeight - document.documentElement.scrollTop - document.documentElement.clientHeight) + "px";
        } else topButton.style.bottom = 34 + "px";
    } else if (document.documentElement.scrollTop < 500) {
        topButton.style.display = "none";
    }
}

function clickHandler() {
    document.documentElement.scrollTop = 0;
}