function MineClearance() { }
// 初始化
MineClearance.prototype.init = function (box, hard, boomBox, callback) {
    box.innerHTML = "";// 清空页面
    this.box = box;
    this.hard = parseInt(hard);
    this.boomBox = boomBox;
    this.callback = callback;
    this.hardList = [10, 20, 25]; // 不同难度每行数量列表
    this.num = this.hardList[this.hard];// 每行数量
    this.size = box.offsetWidth / this.num;//  每个格子边长
    this.cellNum = this.num * this.num;// 格子数量
    this.mineNum = parseInt(this.cellNum / 10 * (this.hard + 1)); // 地雷数量:百分之10，百分之20，百分之30
    this.flagNum = this.mineNum;// 旗子数量
    flagNum.innerHTML = this.flagNum;
    this.cellList = []; // 格子列表
    this.mineList = []; // 地雷坐标列表
    this.render(); // 生成页面格子
    this.creatMine();// 生成地雷
    this.creatNum();// 生成数字
    this.bindEvent();// 绑定事件
};// 生成页面格子
MineClearance.prototype.render = function () {
    for (var i = 0; i < this.cellNum; i++) {
        var li = document.createElement("li");
        btn = document.createElement("button");
        li.style.width = li.style.height = this.size + "px";// 定义格子尺寸
        li.append(btn);
        this.box.append(li);// 插入格子
        this.cellList.push(li);// 将元素记录于格子数组
    }
};// 生成地雷
MineClearance.prototype.creatMine = function () {
    for (; this.mineList.length < this.mineNum;) {
        var num = parseInt(Math.random() * this.cellNum);// 获取随机数
        this.mineList.indexOf(num) === -1 ? this.mineList.push(num) : "";// 放进雷组
    }
    this.mineList.forEach(item => {
        this.cellList[item].className += " mine";// 埋放地雷
    })
};// 生成数字
MineClearance.prototype.creatNum = function () {
    this.cellList.forEach((item, i) => {
        if (this.mineList.indexOf(i) !== -1) return false;// 如果是雷则直接返回
        var count = 0,// 周围雷数
            indexList = [i - this.num, i + this.num];// 周围格子下标数组:上下
        // 左边边界检测     左 左上 左下
        (i + 1) % this.num === 1 ? "" : indexList.push(i - 1, i - this.num - 1, i + this.num - 1);
        // 右边边界检测     右  右上 右下
        (i + 1) % this.num === 0 ? "" : indexList.push(i + 1, i - this.num + 1, i + this.num + 1);
        for (var i = 0; i < indexList.length; i++) {// 记录周围雷数
            if (indexList[i] >= this.cellList.length || indexList[i] < 0) {
                indexList.splice(i--, 1);// 去除上下越界坐标
                continue;
            }
            this.mineList.indexOf(indexList[i]) === -1 ? "" : count++;
        }
        if (count === 0) {
            item.setAttribute("open", indexList.join(" "));// 标记空格
        } else {
            item.style.backgroundImage = "url(./images/" + count + ".jpg)";// 设置相应背景
        }
    })
};// 绑定事件
MineClearance.prototype.bindEvent = function () {
    this.box.addEventListener("click", this.bind1=this.delegate.bind(this, this.open)); // 鼠标点击 打开
    this.box.addEventListener("contextmenu", this.bind2=this.delegate.bind(this, this.flagInsertion)); // 右键点击 插旗
    // window.addEventListener("resize",)
};// 事件委托 参数处理
MineClearance.prototype.delegate = function (callback, evt) {
    var e = evt || window.event,
        item = e.target || e.srcElement;
    e.preventDefault ? e.preventDefault() : e.retrunValue = false;// 阻止默认事件
    if (item.nodeName.toLowerCase() !== "button") return false;// 事件委托判定
    callback.call(this, item.parentNode);
};// 打开格子
MineClearance.prototype.open = function (item) {
    var btn = item.children[0];// 对应按钮 
    if (!btn) {// 判断对应按钮是否存在
        return false;
    }
    // 判断是否被插旗 防止误点
    if (btn.className.split(" ").indexOf("flagInsertion") !== -1) return false;
    if (item.className.split(" ").indexOf("mine") !== -1) {// 是否为地雷
        this.boom();
    }
    btn.remove();// 移除按钮
    if (item.getAttribute("open")) {// 空格打开周围
        var arr = item.getAttribute("open").split(" ");
        for (var i in arr) {
            this.open(this.cellList[parseInt(arr[i])]);
        }
    };
    --this.cellNum === this.mineNum ? this.success() : "";// 是否排完            
};// 插旗
MineClearance.prototype.flagInsertion = function (item) {
    var btn = item.children[0],
        arr = btn.className.split(" "),
        index = arr.indexOf("flagInsertion");// 判断是否被插旗
    if (index === -1) { // 取消插旗
        btn.className += " flagInsertion";
        this.flagNum--;
    } else {// 插旗
        arr.splice(index, 1);
        btn.className = arr.join(" ");
        this.flagNum++;
    }
    flagNum.innerHTML = this.flagNum;// 更改剩余旗数
};// 胜利
MineClearance.prototype.success = function () {
    this.boomBox.style.display = "block";
    this.boomBox.innerHTML = "<p>YOU WIN</p>";
    var firework = new Firework();
    firework.init(this.boomBox);
    firework.autoFire();
    this.callback();
};// 失败
MineClearance.prototype.boom = function () {
    this.boomBox.style.display = "block";
    this.boomBox.innerHTML = '<img src="./images/boom.gif" alt="">';
    setTimeout(() => {
        this.boomBox.innerHTML = "<p>Maybe you'll be lucky next time!</p>";
    }, 1500);
    this.callback();
};// 结束
MineClearance.prototype.end = function () {
    // console.log(this.box.getEventListener());
    this.box.removeEventListener("click", this.bind1);
    this.box.removeEventListener("contextmenu", this.bind2);
};