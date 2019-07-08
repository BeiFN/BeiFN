/****EMB 移动核心
 *  Author:EMB
 *  Date:2019.7   
 *  Now Version:V:D-0.0.1
 * 
 *  Description:
 * ----------------------------↓
 *      Function:
 *      -------------------↓
 *      move (e [移动元素], eAttributeName[移动元素的属性], eToVal[属性目标值], callBack[执行回调]) 单属性改变 
 *      moves(e[移动元素], moveAttr[
 *      {
 *       移动元素的属性:属性目标值,
 *       移动元素的属性:属性目标值,...
 *      }
 *      ], callBack[执行回调])
 *      -------------------↑
 * 
 *      Update Description:
 *      ------------------↓
 *      v 0.0.1 基础移动核心，多属性改变
 * 
 *      -------------------↑
 * 
 *      Version Initials:
 *      ------------------↓
 *      V:D->Developer
 *      V:B->Bate   
 *      V:R->Release   
 *      ------------------↑
 * ---------------------------↑
 */





function move(e, eAttributeName, eToVal, callBack) {
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
            typeof callBack === "function" ? callBack() : "";
        } else {
            isOpacity ? e.style.opacity = (eNowVal + speed) / 100 : e.style[eAttributeName] = eNowVal + speed + "px";
        }
    }, 50);
}


function moves(e, moveAttr, callBack) { // move 核心更新
    clearInterval(e.timer);
    e.timer = setInterval(() => {
        for (const attName in moveAttr) {
            var isOpacity = (attName === "opacity" ? true : false); //是否透明
            var eNowVal = getComputedStyle(e)[attName]; // 1. 获取属性的初始值
            isOpacity ? eNowVal = parseInt(eNowVal * 100) : eNowVal = parseInt(eNowVal);
            var speed = ((isOpacity ? moveAttr[attName] * 100 : moveAttr[attName]) -
                eNowVal) / 10;
            speed = (speed >= 0 ? Math.ceil(speed) : Math.floor(speed));
            if ((isOpacity ? moveAttr[attName] * 100 : moveAttr[attName]) === eNowVal) {
                delete moveAttr[attName];
                Object.keys(moveAttr).length === 0 ? (clearInterval(e.timer)) || (typeof callBack === "function" ? callBack() : "") || (e
                    .timer = null) : "";
            } else {
                isOpacity ? e.style.opacity = (eNowVal + speed) / 100 : e.style[
                    attName] = eNowVal + speed + "px";
            }
        }
    }, 40);
}