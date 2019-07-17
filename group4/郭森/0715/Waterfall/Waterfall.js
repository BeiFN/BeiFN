// 瀑布流排列
class Waterfall {
    constructor(box, {
        fixedWidth = 200,
        marginLeft = 0,
        marginBottom = 0,
    } = {}) {
        this.box = $$(box);
        this.fixedWidth = fixedWidth;         // 固定宽度 
        this.marginBottom = marginBottom;     // 下边距
        this.marginLeft = marginLeft;        // 左边距
        this.init();
    }
    // 初始化数据
    init() {
        this.index = 0;          // 当前下标
        this.heightArray = [];   // 高度数组
        this.sort();
    }
    // 排列
    sort() {
        let [list,count] = [
            this.box.children,                              // 每一排的数量
            parseInt(this.box.offsetWidth / this.fixedWidth)// 子元素列表
        ];                                   
        for (let box; box = list[this.index]; this.index++) {
            box.style.transition = "all 1s";
            box.style.position = "absolute";
            if (this.index < count) {
                this.sortOne(box);
            } else {
                this.sortnext(box);
            }
        }
        let minHeight = Math.min.apply(false, this.heightArray);
        let maxHeight = Math.max.apply(false, this.heightArray);
        this.box.style.height = minHeight + "px";
        this.box.parentNode.style.height=maxHeight+"px";
    }
    // 排列第一行
    sortOne(box) {
        box.style.left = this.index * (this.fixedWidth + this.marginLeft) + "px";
        box.style.top = 0;
        this.heightArray.push(box.offsetHeight);
    }
    // 向下排列
    sortnext(box) {
        let min = Math.min.apply(false, this.heightArray);
        let minIndex = this.heightArray.indexOf(min);
        box.style.left = minIndex * (this.fixedWidth + this.marginLeft) + "px";
        box.style.top = min + this.marginBottom + "px";
        this.heightArray[minIndex] += box.offsetHeight + this.marginBottom;
    }
}

