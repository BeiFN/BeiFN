/****
 * 点击难度
 * 删除ul，加入logo，加入loding，开启loding动画，开启背景动画
 * 开始游戏
 * 创造myplane，myplane鼠标跟随，鼠标隐藏，边界检测
 * 创造子弹 子弹运动 碰撞检测 die
 * 创造敌机 敌机运动 敌机碰撞检测 die 消失
 * 
 */
class PlaneWar {
    constructor() {
        this.init();
        this.bindEvent();
    }
    init() {
        PlaneWar.box = $$("#main");
        this.options = $$("#options");
        PlaneWar.boxSize = {
            left: PlaneWar.box.offsetLeft,
            width: PlaneWar.box.offsetWidth,
            height: PlaneWar.box.offsetHeight,
        }
    }
    bindEvent() {
        on(this.options, "click", this.getHard.bind(this));
        on(this.options, "click", this.startLoading.bind(this));
        on(this.options, "click", this.bgMove.bind(this));
    }
    // 获取难度
    getHard(evt) {
        let e = evt || window.event,
            target = e.target || e.srcElement;
        if (target === this.options) return false;
        PlaneWar.hard = Array.from(target.parentNode.children).indexOf(target);
    }
    // 开场动画
    startLoading() {
        this.options.remove();
        this.logo = PlaneWar.createEle("logo");
        this.loading = PlaneWar.createEle("loading");
        setTimeout(() => {
            this.loading.remove();
            this.logo.remove();
            myplane.init();
            blute.init();
        }, 1600);
    }
    // 背景动画
    bgMove() {
        let spd = 0;
        setInterval(() => {
            spd += (this.hard + 5) * 2;
            PlaneWar.box.style.backgroundPositionY = spd + "px"
        }, 50)
    }
    // 创造元素插入box
    static createEle(selector) {
        let div = document.createElement("div");
        div.className = selector;
        PlaneWar.box.appendChild(div);
        return div;
    }
    static box;
    static hard;
    static boxSize;
}
// 我的飞机
class MyPlane {
    constructor() { }
    init() {
        this.myWarPlan = PlaneWar.createEle("myWarPlan");
        MyPlane.size = {
            width: this.myWarPlan.offsetWidth,
            height: this.myWarPlan.offsetHeight,
            left: PlaneWar.boxSize.width / 2 - this.myWarPlan.offsetWidth / 2,
            top: PlaneWar.boxSize.height - this.myWarPlan.offsetHeight,
        }
        this.myWarPlanInit();
        this.bindEvent();
    }
    bindEvent() {
        on(document, "mousemove", this.myPlaneMove.bind(this));
    }
    myWarPlanInit() {
        this.myWarPlan.style.left = MyPlane.size.left + "px";
        this.myWarPlan.style.top = MyPlane.size.top + "px";
    }
    myPlaneMove(evt) {
        let e = evt || window.event;
        MyPlane.size.left = e.pageX - PlaneWar.boxSize.left - MyPlane.size.width / 2;
        MyPlane.size.top = e.pageY;
        this.myWarPlan.style.left = MyPlane.size.left + "px";
        this.myWarPlan.style.top = MyPlane.size.top + "px";
    }
    static size
}
// 子弹
class Blute {
    constructor() { }
    init() {
        this.blute = PlaneWar.createEle("bullet");
        if (!Blute.size) {
            Blute.size = {
                width: this.blute.offsetWidth,
                height: this.blute.offsetHeight
            }
        };
        console.log(MyPlane.size.top, MyPlane.size.height / 2, Blute.size.height / 2);

        this.blute.style.left = MyPlane.size.left + MyPlane.size.width / 2 - Blute.size.width / 2 + "px";
        this.blute.style.top = MyPlane.size.top - Blute.size.height + "px";
        this.bluteMove();
    }
    bluteMove() {
        this.blute
    }
    bluteDie() {

    }
    static size;
}
// 敌机
class EnemyPlane {

}
let [planeWar, myplane, blute, enemyPlane] = [new PlaneWar(), new MyPlane(), new Blute(), new EnemyPlane]

