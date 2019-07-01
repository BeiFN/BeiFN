function move(e, eAttributeName, eToVal) {
    clearInterval(e.timer);
    var isOpacity = (eAttributeName === "opacity" ? true : false);
      // 调整目标值 要重新赋值的 ;如果是透明的话就是 属性值*100
    eToVal = (isOpacity ? eToVal * 100 : eToVal); 
    e.timer = setInterval(() => {
        var eNowVal = getComputedStyle(e)[eAttributeName]; // 1. 获取属性的初始值
        if (isOpacity) {
            eNowVal = parseInt(eNowVal * 100);
        } else {
            eNowVal = parseInt(eNowVal);
        }
        // 2.调整 缓冲 速度 
        var speed = (eToVal - eNowVal) / 10;
        speed = (speed > 0 ? Math.ceil(speed) : Math.floor(speed));
        if (eToVal === eNowVal) {
            clearInterval(e.timer);
            e.timer = null;
        } else {
            isOpacity ? e.style.opacity = (eNowVal + speed) / 100 : e.style[eAttributeName] = eNowVal + speed + "px";
        }
    }, 50);
}

function moveG(e, eAttributeName, eToVal) {
    clearInterval(e.timer);
    var isOpacity = (eAttributeName === "opacity" ? true : false);
      // 调整目标值 要重新赋值的 ;如果是透明的话就是 属性值*100
    eToVal = (isOpacity ? eToVal * 100 : eToVal); 
    e.timer = setInterval(() => {
        var eNowVal = getComputedStyle(e)[eAttributeName]; // 1. 获取属性的初始值
        if (isOpacity) {
            eNowVal = parseInt(eNowVal * 100);
        } else {
            eNowVal = parseInt(eNowVal);
        }
        // 2.调整 缓冲 速度 
        var speed = (eToVal - eNowVal) / 10;
        speed = (speed > 0 ? Math.ceil(speed) : Math.floor(speed));
        if (eToVal === eNowVal) {
            clearInterval(e.timer);
            e.timer = null;
        } else {
            isOpacity ? e.style.opacity = (eNowVal + speed) / 100 : e.style[eAttributeName] = eNowVal + speed + "px";
        }
    }, 50);
}