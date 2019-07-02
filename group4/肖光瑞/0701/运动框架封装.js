function move(dom, options, callback) {
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
        for (var attr in options) {
            if (attr === "opacity") {
                var iNow = parseInt(getComputedStyle(dom)[attr] * 100)
            } else {
                var iNow = parseInt(getComputedStyle(dom)[attr])
            }
            var speed = (options[attr] - iNow) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (options[attr] === iNow) {
                delete options[attr];
                if (Object.keys(options).length === 0) {
                    clearInterval(dom.timer);
                    typeof callback === "function" ? callback() : "";
                }
            } else {
                if (attr === "opacity") {
                    dom.style[attr] = (iNow + speed) / 100;
                } else {
                    dom.style[attr] = iNow + speed + "px";
                }
            }
        }
    }, 50)
}