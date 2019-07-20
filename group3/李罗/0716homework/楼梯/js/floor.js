let {throttle}=Utils;

//楼梯是：
//1.按钮显示隐藏
//2.点击改变scrollTop
//3.根据scrollTop值可以改变楼层

function Stairs(){
    this.init();
}
//jQuery提供的原型方法添加方式
$.extend(Stairs.prototype,{
    init : function(){
        this.header=$("header");
        //头部的高度
        this.headerSize = {
            height : this.header.height()
      }
        this.stairs=$(".stairs");
        this.boxs=$("div img");
        //楼梯里面的子元素
        this.stairsList=this.stairs.children();
        //承载的最大值和最小值
        this.boxsList=[];
        $.each( this.boxs, $.proxy(function(index,item){
            console.log(index,item);
            var min=$(item).offset().top;
            this.boxsList.push({
                min:min,
                max:min + $(item).outerHeight()//获取第一个匹配元素外部高度（默认包括补白和边框）。此方法对可见和隐藏元素均有效。
                
            })
        },this))
        //考虑兼容
        var self = this;
        $(window).scroll(throttle($.proxy(function(){
            var sT=$("body,html").scrollTop();
            this.toggleStairs(sT);
            this.changeStairs(sT);
        },this),300));//$.proxy接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文语境
        
        this.stairs.on("click","span",$.proxy(function(evt){
            var target=evt.target;
            this.changeFloor.call(this,$(target).index());
            this.changeStairs($("body,html").scrollTop());
        },this))

    },

    toggleStairs:function(sT){
        
        var has=this.stairs.hasClass("show");
        if(!has && sT>this.headerSize.height){
            this.stairs.addClass("show");
        }
        if(has && sT<this.headerSize.height){
            this.stairs.removeClass("show");
        }
    },

    changeFloor:function(index){
        //根据索引
        $("html,body").scrollTop(this.boxs.eq(index).offset().top);
    },
    changeStairs:function(scrollTop){
        $.each(this.boxsList,$.proxy(function(index,item){
            if(scrollTop >= item.min && scrollTop<item.max){
                this.stairsList.eq(index).addClass("active")
                .siblings()// 取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选。
                
                .removeClass("active");
            }
        },this))
    }
})
new Stairs();