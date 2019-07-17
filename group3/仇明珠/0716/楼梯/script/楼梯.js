function randomColor(){
    return ("#"+parseInt(Math.random()*0xffffff).toString(16)).padStart(7,0);
}
$(".wraper div").css({
    background:function randomColor(){
        return ("#"+parseInt(Math.random()*0xffffff).toString(16)).padStart(7,0);
    }
})
function Stairs(){
    this.init();
}
$.extend(Stairs.prototype,{
    init:function(){
        this.stairs=$(".stairs");
        this.floorList=$("div[class*=box]");
        this.header=$(".header");
        this.stairsList=$(".stairs span");
        this.headerSize={
            height:this.header.height()
        };
        this.floorArr=[];
        $.each(this.floorList,$.proxy(function(index,item){
            $min=$(item).offset().top;
            $max=$(item).offset().top+$(item).outerHeight();
            this.floorArr.push({
                min:$min,
                max:$max
            })
        },this));
        $(window).scroll($.proxy(function(){
            var timer=null;
            if(timer!=null) return false;
            timer=setTimeout($.proxy(function(){
                let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
                this.toggleStairs(scrollTop);
                this.changeStrirs(scrollTop);
            },this),500)
           
        },this));
        this.stairs.on("click","span",$.proxy(function(evt){
             var target=evt.target;
             this.changeFloor.call(this,$(target).index());
             let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
             this.changeStrirs(scrollTop);
        },this))
    },
    toggleStairs:function(scrollTop){
        var has=this.stairs.hasClass("show");
        if(!has&&scrollTop>this.headerSize.height){
            this.stairs.addClass("show");
        }
        if(has && scrollTop < this.headerSize.height){
            this.stairs.removeClass("show");
        }
    },
    changeFloor:function(index){
        $("html,body").scrollTop(this.floorList.eq(index).offset().top);
    },
    changeStrirs: function (scrollTop) {
        $.each(this.floorArr,$.proxy(function (index, item) {
            if (scrollTop >= item.min && scrollTop < item.max) {
                this.stairsList.eq(index).addClass("active")
                    .siblings()
                    .removeClass("active");
            }
        },this))
    }

})
new Stairs();