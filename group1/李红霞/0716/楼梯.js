// 给每个主页上的每个div添加颜色
$(".content div").css({
      background : function(){
            var r = Math.round(Math.random() * 255 );
            var g = Math.round(Math.random() * 255 );
            var b = Math.round(Math.random() * 255 );
            return "rgb("+r+","+g+","+b+")"
      }
})
// 面向对象的思想实现楼梯的功能
// 1.楼梯的显示和隐藏  2.获取index并设置楼梯的样式 3.设置scrolltop的值  ES5的写法
function Stairs(){
      // 原型上的方法只能用实例调用
      this.init();
}
// 将方法添加到一个对象上，并且将该对象与stairs的构造函数合并
$.extend(Stairs.prototype, {
      init:function(){
            //boxs ：box元素的数组  stairsList:楼梯的元素列表  boxHeightList：每个div的最高和最低的位置列表
            this.stairs = $(".stairs");
            this.boxs = $("div[class*='box']");
            this.stairsList = $("span");
            this.boxHeightList = [];
            $.each(this.boxs, $.proxy(function(index, item){
                  this.boxHeightList.push({
                        min:$(item).offset().top,
                        max:$(item).outerHeight() + $(item).offset().top,
                  });
            }, this));
            console.log(this.boxs, this.stairsList, this.boxHeightList)
            // 绑定滚动事件
            $(window).scroll($.proxy(function(){
                  // 获取到scrollTop
                  var scrollTop = $(window).scrollTop();
                  // 遍历boxHeightList的数组判定当前的位置
                  this.toggle(scrollTop);
                  this.changeStairs(scrollTop)
            }, this));
            // stairs绑定点击事件
            this.stairs.on("click", "span", $.proxy(function(evt){
                  var e = evt || window.event;
                  var target = e.target;
                  var index= $(target).index();
                  this.stairsList.eq(index).addClass("active")
                  // console.log(index)
                  this.changeScrollTop(index);
            }, this));
      },
      // 根据scrollTop的值更改楼梯的显示和隐藏
      toggle:function(scrollTop){
            if(scrollTop > 600){
                  this.stairs.addClass("show")
            }
            if(scrollTop < 600){
                  this.stairs.removeClass("show");
            }            
      },
      // 根据scrollTop的值更改staris的显示样式
      changeStairs:function(scrollTop){
            $.each(this.boxHeightList, $.proxy(function(index, item){
                  this.stairsList.eq(index).removeClass("active");
                  if(scrollTop > this.boxHeightList[index].min && scrollTop < this.boxHeightList[index].max){
                        // 改变stairs的样式
                        this.stairsList.eq(index).addClass("active");
                  }
            }, this))

      },
      // 根据用户点击的index设置scrolltop的值
      changeScrollTop:function(index){
            // console.log(index)
             $("body,html").scrollTop(this.boxHeightList[index].min) ;
            //  this.stairsList.eq(index).addClass("active")
      }
})
new Stairs();