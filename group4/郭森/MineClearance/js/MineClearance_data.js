/** 
 * @MineClearance (box,callback)  扫雷     
 * 参数：
 *      盒子(高大于宽)
 *      回调函数对象{
 *          " @cell    ": fn(ele,type){} ,    格子背景设置    参数：格子元素 ,类型——数字1~8、地雷9
 *          " @open    ": fn(ele,type){} ,    打开格子效果    参数：格子元素 ,类型——数字1~8、地雷9、空格0
 *          " @time    ": fn(num){} ,         已用时间        参数：时间
 *          " @flagNum ": fn(num){} ,         剩余旗子数量    参数：数量
 *          " @end     ": fn(bool){}          结束效果       参数：ture/false——胜利/失败
 *      }
 * 函数：
 *      开始函数         @init  (hard)          难度，初中高：0~2,diy：3        返回值：bool——(true/false)——(有/没有) 本地数据
 *      diy函数          @diyGame (longN,mineN) 行、列数5-50，地雷数量1-2500
 *      
 * class样式名：
 *      @flagInsertion  旗子样式,
 *      @mineBoom       爆炸地雷,
 *      @mineDie        排除地雷,
 * 
 * 页面缩放节流去抖最大延时：200;
 *  
*/
class MineClearance {
    constructor(box, callbackList) {
        // 本地数据设置
        this.localData = this.getData();
        this.box = box;
        // 回调函数设置
        if (!callbackList || typeof callbackList !== "object") callbackList = {};
        this.cellBack = callbackList.cell ? callbackList.cell : () => { };
        this.openBack = callbackList.open ? callbackList.open : () => { };
        this.timeBack = callbackList.time ? callbackList.time : () => { };
        this.flagNumBack = callbackList.flagNum ? callbackList.flagNum : () => { };
        this.endBack = callbackList.end ? callbackList.end : () => { };
    }
    // 获取数据
    getData() {
        if (localStorage.getItem("MineClearance")) {
            return JSON.parse(localStorage.getItem("MineClearance"))
        } else {
            return {};
        }
    }
    // 设置数据
    setData() {
        localStorage.setItem("MineClearance", JSON.stringify(this.localData));
    }
    // 默认数据
    defaultData() {
        // 内置难度默认参数
        this.hardList = {
            "0": {
                "longN": 10,
                "total": 100,
                "mineN": 10
            },
            "1": {
                "longN": 20,
                "total": 400,
                "mineN": 80
            },
            "2": {
                "longN": 25,
                "total": 625,
                "mineN": 155
            },
        }
        // 内置默认数据结构
        this.dataRule = {
            "longN": 0,         // 行列数
            "total": 0,         // 格子总数
            "mineN": 0,         // 地雷数量
            "cellState": [],    // 格子状态数组，0为已打开，1为未点击，2为插旗
            "cellType": [],     // 格子类型数组 0~8为数字,9为地雷
            "time": 0,          // 时间
        }
    }
    // 初始化
    init(hard) {
        this.defaultData();
        if (this.bind1) this.close();// 清空事件监听
        if (hard === this.hard) {
            this.localData[this.hard] = null;
            this.setData();// 双击清除数据
        }
        // 参数定义
        this.hard = hard;// 难度
        this.timer = null;// 定时器
        this.pageState = null;// 去抖参数
        this.size = null;// 格子尺寸
        this.num = null;// 剩余格子数量
        this.flagNum = 0;// 剩余旗数
        // 是否存在本地数据
        if (!(this.data = this.localData[this.hard])) {
            if (hard === 3) {// 自定义模式
                this.flagNumBack(0);// 渲染旗数
                this.timeBack(0);// 渲染时间
                return false;
            }
            // 计算数据
            this.countData();
        }
        // 开始游戏
        this.startGame();
        return true;
    }
    // 自定义模式
    diyGame(longN, mineN) {
        // 参数判断处理
        longN = longN ? parseInt(longN) : 10;
        mineN = mineN ? parseInt(mineN) : 10;
        if (longN < 5) longN = 5;
        if (longN > 50) longN = 50;
        if (mineN < 2) mineN = 2;
        if (mineN >= longN * longN) mineN = longN * longN - 1;
        this.hardList["3"] = {
            "longN": longN,
            "total": longN * longN,
            "mineN": mineN
        };
        this.countData();
        this.startGame();
    }
    // 计算数据
    countData() {
        this.data = this.localData[this.hard] = this.dataRule;  // 设置默认参数结构
        this.data.longN = this.hardList[this.hard].longN;       // 行列数
        this.data.total = this.hardList[this.hard].total;       // 格子总数
        this.data.mineN = this.hardList[this.hard].mineN;       // 地雷总数
        this.creatMine();
        this.creatNum();
        this.setData();
    }
    // 生成地雷
    creatMine() {
        for (var i = 0; i < this.data.mineN;) {
            var num = parseInt(Math.random() * this.data.total);// 获取随机数
            if (this.data.cellType[num] !== 9) {// 去重
                this.data.cellType[num] = 9;
                i++;
            }
        }
    }
    // 生成数字
    creatNum() {
        for (var i = 0; i < this.data.total; i++) {
            this.data.cellState[i] = 1;// 重置状态数组  // 如果不是雷则查找周围雷数放入类型数组
            if (this.data.cellType[i] !== 9) this.data.cellType[i] = this.findMine(this.aroundCell(i));
        }
    }
    // 九宫格
    aroundCell(i) {
        var l = this.data.longN,
            arr = [i - l, i + l];// 周围格子下标数组:上下
        // 左边边界检测     左 左上 左下
        (i + 1) % l === 1 ? "" : arr.push(i - 1, i - l - 1, i + l - 1);
        // 右边边界检测     右  右上 右下
        (i + 1) % l === 0 ? "" : arr.push(i + 1, i - l + 1, i + l + 1);
        for (var k = 0; k < arr.length; k++) {// 去除上下越界坐标
            if (arr[k] >= this.data.total || arr[k] < 0) arr.splice(k--, 1);
        }
        return arr;
    }
    // 查找周围地雷数量
    findMine(arr) {
        var count = 0;
        for (var k in arr) {// 记录周围雷数
            if (this.data.cellType[arr[k]] === 9) count++;
        }
        return count;
    }
    // 开始游戏
    startGame() {
        this.size = this.box.offsetWidth / this.data.longN; // 格子尺寸
        this.num = this.data.total - this.data.mineN;       // 剩余格子数量
        this.flagNum = this.data.mineN;                     // 旗子数量
        this.render();      // 渲染页面
        this.recordTime();  // 计时
        this.bindEvent();   // 绑定事件
    }
    // 渲染页面
    render() {
        this.box.innerHTML = "";// 清空页面
        this.data.cellType.forEach((type, index) => {
            var state = this.data.cellState[index],
                li = document.createElement("li");
            li.style.width = li.style.height = this.size + "px";// 定义格子尺寸
            li.setAttribute("data-id", index)
            this.box.append(li);// 插入格子
            if (type !== 0) this.cellBack(li, type);// 渲染格子样式
            if (state === 0) {
                this.num--;// 计算剩余格子数量
            } else {
                var btn = document.createElement("button");
                li.append(btn);
                if (state === 2) {
                    btn.className = "flagInsertion";// 渲染旗子样式
                    this.flagNum--;// 更改剩余旗数
                }
            }
        })
        this.flagNumBack(this.flagNum);// 渲染旗数
        this.timeBack(this.data.time);// 渲染时间
    }
    // 计时
    recordTime() {
        this.timer = setInterval(() => {
            this.timeBack(++this.data.time);
            this.setData();
        }, 1000);
    }
    // 绑定事件
    bindEvent() {
        this.box.addEventListener("click", this.bind1 = this.delegate.bind(this, this.open)); // 鼠标点击 打开
        this.box.addEventListener("contextmenu", this.bind2 = this.delegate.bind(this, this.flagInsertion)); // 右键点击 插旗
        window.addEventListener("resize", this.bind3 = this.pageZoom.bind(this));
    }
    // 页面缩放
    pageZoom() {
        clearTimeout(this.pageState);
        this.pageState = setTimeout(() => {
            this.size = this.box.offsetWidth / this.data.longN;
            this.render();
        }, 200)
    }
    // 事件委托 参数处理
    delegate(callback, evt) {
        var e = evt || window.event,
            btn = e.target || e.srcElement;
        e.preventDefault ? e.preventDefault() : e.retrunValue = false;// 阻止默认事件
        if (btn.nodeName.toLowerCase() !== "button") return false;// 事件委托判定
        callback.call(this, btn.parentNode);
    }
    // 打开格子
    open(item) {
        var index = parseInt(item.getAttribute("data-id")),
            type = this.data.cellType[index];
        if (this.data.cellState[index] !== 1) return false;// 判断格子状态，
        item.children[0].remove();// 移除按钮
        this.openBack(item, type);
        this.data.cellState[index] = 0;//更新数据
        this.setData();// 保存数据
        if (type === 0) {// 空格打开周围
            var arr = this.aroundCell(index);
            for (var i in arr) {
                this.open(this.box.children[arr[i]]);
            }
        }
        if (type === 9) {// 是否为地雷
            item.className += " mineBoom";
            this.end(false);
            return false;
        }
        if (--this.num === 0) {// 是否胜利
            this.end(true);
        }
    }
    // 插旗
    flagInsertion(item) {
        var index = item.getAttribute("data-id"),
            btn = item.children[0];
        if (this.data.cellState[index] === 1) { // 插旗
            if (this.flagNum < 1) return false;
            btn.className = "flagInsertion";// 渲染旗子样式
            this.data.cellState[index] = 2;// 更新数据
            this.flagNum--;// 剩余旗数
        } else {// 取消插旗
            btn.className = "";
            btn.style.backgroundImage = null;
            this.data.cellState[index] = 1;
            this.flagNum++;
        }
        this.setData();// 保存数据
        this.flagNumBack(this.flagNum);// 渲染旗数
    }
    // 清除事件
    close() {
        this.box.removeEventListener("click", this.bind1);
        this.box.removeEventListener("contextmenu", this.bind2);
        window.removeEventListener("resize", this.bind3);
        clearInterval(this.timer);
    }
    // 结束
    end(bool) {
        [].slice.call(this.box.children).forEach((item, index) => {
            if (this.data.cellState[index] === 2 && this.data.cellType[index] === 9) {
                item.className += " mineDie";
            }
            item.innerHTML = "";
        })
        this.localData[this.hard] = null;
        this.setData();// 保存数据
        this.close();
        this.endBack(bool);
    }
}
