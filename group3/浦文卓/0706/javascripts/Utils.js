class Utils{
    static $(selector){
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }

    static createEle(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }

    static getSize(ele){
        return {
            width : ele.offsetWidth,
            height : ele.offsetHeight
        }
    }

    static getoffset(ele){
        return {
            left : ele.offsetLeft,
            top : ele.offsetTop,
        }
    }

    static level;
}