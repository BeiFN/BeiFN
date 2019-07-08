class Table {
    constructor(dom1, dom2) {
        this.btns = document.getElementById(dom1).children;
        this.lis = document.getElementById(dom2).children;
        this.init();
    }
    //初始化
    init() {
        for (let i = 0, btn; btn = this.btns[i++];) {
            btn.addEventListener("click", this.changeLi.bind(this, i - 1));
            btn.addEventListener("click", this.addBtnColor.bind(this, i - 1))
        }
    }
    //移除和添加class名
    changeLi(index) {
        console.log(index)
        for (let i = 0, li; li = this.lis[i++];) {
            Table.removeClassName(li, "active")
        }
        this.lis[index].className += " active"
    }
    //按钮按下时增加颜色
    addBtnColor(index) {
        this.lis[index].style.background = "#" + Math.round(parseInt("ffffff", 16) * Math.random()).toString(16).padStart(6, "0")
    }

    //封装移除class名方法
    static removeClassName(dom, className) {
        return dom.className = dom.className.replace(new RegExp("\\s?" + className), "")
    }

}

new Table("btn-list", "content-list")