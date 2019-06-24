function $$(select) {
    var ele = document.querySelectorAll(select);
    return ele.length === 1 ? ele[0] : ele;
}
var ele_pao = $$("#pao");
var ele_pao_text = ele_pao.children[0];

class WordGame {
    constructor() { }
    init(pao) {
        this.box = document.body;
        this.pao = pao;
        this.text = pao.children[0];
        this.getWidth();// 屏幕的宽度;
        // 储存随机字母的数组;
        this.letterArray = [];
        this.bindEvent();
    }
    bindEvent() {
        document.addEventListener("keydown", this.handlerEnterLetter.bind(this));
        document.addEventListener("keydown", this.createBullet.bind(this));
        window.addEventListener("resize", this.getWidth.bind(this));
        setInterval(this.createLetter.bind(this), 1000);
    }
    // 获取屏幕宽度
    getWidth() {
        this.clientWidth = document.documentElement.clientWidth;
    }
    // 创建字母鱼
    createLetter() {
        var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
        var randomLeft = Math.round(Math.random() * (this.clientWidth - 100));
        var ele = document.createElement("div");
        var timer = this.eleMove(ele);
        ele.className = "fish";
        ele.innerHTML = randomLetter;
        ele.style.top = 0;
        ele.style.left = randomLeft + "px";
        this.box.appendChild(ele);
        this.letterArray.push({
            timer: timer,// 定时器
            ele: ele,// 鱼
            letter: randomLetter,// 字母
            left: randomLeft// 位置
        })
        this.eleMove(ele);
    }
    // 鱼的移动
    eleMove(ele) {
        var numTop = 0;
        var timer = null;
        timer = setInterval(function () {
            numTop += 5;
            ele.style.top = numTop + "px";
            if (numTop >= 500) {
                clearInterval(timer);
                // 清空变量，让变量内的数据被垃圾回收机制回收;
                timer = null;
                ele.className += " die";
                // 动画运行结束删除元素;
                setTimeout(function () {
                    this.removeRecord(ele)
                    ele.remove();
                }.bind(this), 1000)
            }
        }.bind(this), 50)
        return timer;
    }
    // 移除
    removeRecord(ele) {
        for (var i = 0, rec; rec = this.letterArray[i++];) {
            if (rec.ele === ele) {
                this.letterArray.splice(i - 1, 1);
                break;
            }
        }
    }
    // 创建子弹
    createBullet(evt) {
        var e = evt || window.event;
        var key = String.fromCharCode(e.keyCode || e.which);
        var ele = document.createElement("div");
        ele.className = "bullet";
        ele.style.left = this.clientWidth / 2 - 15 + "px";
        ele.style.top = this.pao.offsetTop - 30 + "px";
        this.box.appendChild(ele);
        // 判定是否存在相应的字母; 在letter里面判定;
        for (var i = 0, rec; rec = this.letterArray[i++];) {
            // 如果存在页面中的鱼,代表的字母和当前输入的字母相同;
            if (rec.letter === key) {
                this.removeRecord(rec.ele);
                // 给子弹设置一个位置;
                setTimeout(function () {
                    ele.style.left = rec.left + 35 + "px";
                    ele.style.top = rec.ele.offsetTop + 90 + "px";
                }, 5)
                // 删除动画;
                setTimeout(function () {
                    rec.ele.remove();
                    ele.remove();
                }, 550)
                break;
            }
        }
    }
    // 创建字母
    handlerEnterLetter(evt) {
        var e = evt || window.event;
        // console.log(e);
        var keyCode = e.keyCode || e.which;

        if (keyCode >= 65 && keyCode <= 90) {
            keyCode = String.fromCharCode(keyCode);
            ele_pao_text.innerHTML = keyCode;
        }
    }
}
var wordGame = new WordGame();
wordGame.init(ele_pao);