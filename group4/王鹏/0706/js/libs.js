class MyLibs {
    constructor() {

    }
    /**
     * 封装运动函数
     * @param {必选参数，运动元素} dom 
     * @param {必选参数，运动属性} options 
     * @param {可选参数，回调函数} callback 
     */
    static move(dom, options, callback) {
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

    /**
     * 封装随机颜色
     * @param {可选参数，返回颜色类型} type 
     */
    static randomColor(type) {
        if (type === "rgb") {
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            return `rgb(${r},${g},${b})`
        }
        return "#" + Math.round(Math.random() * parseInt("ffffff", 16)).toString(16).padStart(6, "0");
    }

    //选择器;
    static $(selector) {
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }

    // 删除类名
    static removeClassName(dom, className) {
        return dom.className = dom.className.replace(new RegExp("\S?" + className), "");
    }
    //事件绑定函数
    static on(dom, eventType, callback) {
        return dom.addEventListener(eventType, callback)
    }
    //封装获得物体尺寸函数
    static getSize(dom) {
        return {
            width: parseInt(getComputedStyle(dom)["width"]),
            height: parseInt(getComputedStyle(dom)["height"])
        }
    }
    //封装获得元素距离html的offsetxx的距离
    static getAbsPosition(dom) {
        let position = {
            left: 0,
            top: 0
        }
        while (dom) {
            position.left += dom.offsetLeft;
            position.top += dom.offsetTop;
            dom = dom.offsetParent;
        }
        return position;
    }
}