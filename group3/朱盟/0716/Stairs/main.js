function Stairs() {
    this.header = $("header");
    this.headerHeight = this.header.height()
    this.stairs = $(".stairs");
    this.boxs = $("div[class*=box]");
    this.stairsList = this.stairs.children();
    // 承载的就是最大值和最小值;
    this.boxsList = [];
    $.each(this.boxs, (index, e) => {
        let min = $(e).offset().top;
        this.boxsList.push({
            min: parseInt(min),
            max: parseInt(min + $(e).outerHeight())
        });
    });
    this.initial();
}

function initial() {

    $(window).scroll(() => {
        $.throttle(this.floorListener($("body,html").scrollTop()), 100);
    })
    this.stairs.on("click", "span", (evt) => {
        var target = evt.target;
        this.toFloor($(target).index());
    })
    console.log("Initialize Loading ");
}

function barToggle(index) {
    this.stairs.addClass("show");
    this.stairsList.eq(index).addClass("active")
        .siblings()
        .removeClass("active");
}

function toFloor(index) {
    $("html,body").scrollTop(this.boxsList[index].min);
}

function floorListener(scrollTop) {
    if (this.stairs.hasClass("show") && scrollTop < this.headerHeight) this.stairs.removeClass("show");
    $.each(this.boxsList, (index, e) => {
        if (scrollTop >= e.min && scrollTop < e.max) this.barToggle(index);
    });
}

Stairs.prototype = {
    constructor: Stairs,
    initial,
    barToggle,
    toFloor,
    floorListener
}

new Stairs();

$.extend({
    throttle: function (cb, delay = 120) {
        let timer = null;

        return function () {
            if (timer !== null) return false;
            timer = setTimeout(() => {
                cb();
                timer = null;
            }, delay);
        }
    }
})
// jQuery 底层的原型绑定方式;

// Stairs.prototype = {
//       constructor : Stairs,
//       init : function(){

//       }
// }


// ES6 的原型添加方法的方式：
// Object.assign(Stairs.prototype , {
//       init : function(){
//       }
// })


// jQuery提供的原型方法添加方式;
// $.extend(Stairs.prototype , {
//       init : function(){

//       },
//       toggleStairs : function( toggle ){

//       },
//       changeFloor : function( index ){
//             // 根据索引
//       },
//       changeStairs : function( scrollTop ){

//       }
// })


//  console.log(this.boxsList);
//  Stairs.fn =

// 玩坏了
// function Stairs() {
//      return new Stairs.fn.initial();
//  }

//  Stairs.fn.initial = function () {
//      this.__proto__ = Stairs;
//      //  console.log(this);
//      console.log("Initialize Loading ");
//  }

//  Stairs.fn=stairs.pro = Stairs.fn.initial.prototype = {
//      constructor: Stairs
//  }

//  Stairs();

//  console.dir();