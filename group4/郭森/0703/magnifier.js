

// 放大镜
function Magnifier() {
    this.init();
}
Magnifier.prototype.init = function (data) {
    this.lb = $$(".left-bar"); // 左盒子
    this.rb = $$(".right-bar"); // 右盒子
    this.cb = $$(".clip-box"); // 小框
    this.limg = $$(".img-box"); // 左图
    this.rimg = this.rb.children[0]; // 右图

    this.lblt = getAbsOffset(this.lb).left; // 左盒位置
    this.lbtp = getAbsOffset(this.lb).top;
    this.lbwid = this.lb.offsetWidth; // 左盒尺寸
    this.lbhei = this.lb.offsetHeight;

    this.bindEvent();
}
Magnifier.prototype.bindEvent = function () {
    on(this.lb, "mouseenter", this.show.bind(this));      // 鼠标进入显示
    on(this.lb, "mouseleave", this.hidden.bind(this));    // 鼠标离开隐藏
    on(this.lb, "mousemove", this.move.bind(this));       // 鼠标移动跟随
}
//    鼠标进入显示
Magnifier.prototype.show = function () {
    this.limg.style.opacity = ".3";     //左图透明
    this.rb.style.display = "block";    //右框显示
    this.cb.style.display = "block";    //小框显示

    this.cbwid = this.cb.offsetWidth;   // 小框尺寸
    this.cbhei = this.cb.offsetHeight;
    this.ratio = this.lbwid / this.cbwid;   // 放大比例
}
//  鼠标离开隐藏
Magnifier.prototype.hidden = function () {
    this.limg.style.opacity = "1";
    this.rb.style.display = "none";
    this.cb.style.display = "none";
}
//     鼠标移动跟随
Magnifier.prototype.move = function (evt) {
    var e = evt || event;
    var elt = e.pageX,
        etp = e.pageY;
    // 小框位置    
    var cblt = elt - this.lblt - this.cbwid / 2,
        cbtp = etp - this.lbtp - this.cbhei / 2,
        // 小框边界范围
        cbltMax = this.lbwid - this.cbwid,
        cbtpMax = this.lbhei - this.cbhei;
    // 边界处理
    cblt = cblt < 0 ? 0 : cblt;
    cblt = cblt > cbltMax ? cbltMax : cblt;
    cbtp = cbtp < 0 ? 0 : cbtp;
    cbtp = cbtp > cbtpMax ? cbtpMax : cbtp;
    // 小框位置，小框图片位置，右框图片位置
    this.cb.style.left = cblt + "px";
    this.cb.style.top = cbtp + "px";
    this.cb.style.backgroundPosition = -cblt + "px " + -cbtp + "px";
    this.rimg.style.left = (-cblt * this.ratio) + "px";
    this.rimg.style.top = (-cbtp * this.ratio) + "px";
}
var magnifier = new Magnifier();