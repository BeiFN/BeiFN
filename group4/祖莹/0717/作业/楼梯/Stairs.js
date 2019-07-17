// 楼梯
$(".stairs-box div[class*=box]").css({ background: function () { return randomColor(); } })
function Stairs() {
    this.init();
}
$.extend(Stairs.prototype, {
    init: function () {
        this.stairsBox = $(".stairs-box");          // 大盒子
        this.stairsList = $(".stairs-list");        // 格子盒子
        this.boxs = this.stairsBox.children();      // 盒子列表
        this.cells = this.stairsList.children();    // 格子列表
        this.boxHeightArr = [];                     // 盒子高度数组
        $.each(this.boxs, $.proxy(function (i, box) {
            var min = $(box).offset().top
            this.boxHeightArr.push({
                min: min,
                max: min + $(box).outerHeight()
            })
        }, this))
        this.index = 0;                             // 当前坐标
        this.bindEvent();
    },
    bindEvent: function () {
        // 滚动条
        $(window).scroll($.throttle(
            $.proxy(function () {
                var scrTop = $("html,body").scrollTop();
                this.changeCell(scrTop);
                this.toggle(scrTop);
            }, this), 100
        ));
        // 点击跳转
        this.stairsList.on("click", "div", $.proxy(this.changeBox, this));
    },
    // 显示隐藏
    toggle: function (scrTop) {
        var targetTop = scrTop + 200,
            has = this.stairsList.hasClass("show"),
            overMin = targetTop >= this.boxHeightArr[0].min,
            overMax = targetTop >= this.boxHeightArr[this.boxHeightArr.length - 1].max;
        console.log(has);
        if (!has && overMin && !overMax) {
            this.stairsList.addClass("show");
        }
        if (has && !overMin || overMax) {
            this.stairsList.removeClass("show");
        }
    },
    // 改变楼梯层数
    changeCell: function (scrTop) {
        var targetTop = scrTop + 200;
        $.each(this.boxHeightArr, $.proxy(function (i, obj) {
            if (targetTop >= obj.min && targetTop < obj.max) {
                this.cells.eq(i).addClass("active").siblings().removeClass("active");
            }
        }, this))
    },
    // 改变盒子高度
    changeBox: function (evt) {
        var index = $(evt.target).index();
        $("html,body").stop(true);
        $("html,body").animate({
            scrollTop: this.boxHeightArr[index].min
        }, 200)
    },

})
$.throttle = function (cb, delay) {
    var timer = null;
    return function () {
        if (timer) return false;
        timer = setTimeout(function () {
            cb();
            timer = null;
        }, delay || 200);
    }
}
new Stairs();