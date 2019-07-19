function Cart(){
  // 回调函数列表
  this.cbList = {};
}
$.extend(Cart.prototype, {
  init : function(){
    this.main = $(".goods-list");
    this.cartsNum = $(".cart-num");
    this.carts = $(".cart-wrap");
    this.main.on("click", ".add-cart", $.proxy(this.addCart, this));
    this.main.on("click", ".add-cart", $.proxy(this.sumCartNum, this));
    // 点击购物车图标
    this.carts.on("click", $.proxy(function(){
      var clear = confirm("是否清空购物车");
      if(clear){
        localStorage.clear();
        this.sumCartNum();
      }
    }, this))
    this.sumCartNum();
    // 购物车加减
    this.main.on("click", ".btn-reduce", $.proxy(this.reduceGoodsNum, this));
    this.main.on("click", ".btn-add", $.proxy(this.addGoodsNum, this));
  },
  // 点击加入购物车按钮
  addCart : function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    var id = $(target).attr("data-id");
    // console.log(id);
    // 把数据放入localStorage里面
    this.saveCart(id);
  },
  // 向localStorage加入数据
  saveCart : function(id){
    // var arr = [{
    //   id : id,
    //   count : 1
    // }];
    // localStorage.setItem("carts", JSON.stringify(arr));
    // console.log(localStorage.getItem("carts"));
    // 1. carts不存在；=>创建结构放入数组；
    // 2. carts存在：
    //   有相同id => count++;
    //   没有相同id => 创建对象插入
    var str = localStorage.getItem("carts");
    // console.log(str);
    if(str === null){
      var arr = [{
        id : id,
        count : 1
      }];
      localStorage.setItem("carts", JSON.stringify(arr));
    }else{
      var la = JSON.parse(str);
      // console.log(la);
      var has_same_id = false;
      $.each(la, function(index, item){
        if(item.id === id){
          item.count ++;
          has_same_id = true;
        }
      })
      if(!has_same_id){
        la.push({
          id : id,
          count : 1
        })
      }
      localStorage.setItem("carts", JSON.stringify(la));
      // console.log(la);
    }
    // console.log(str);
  },
  // 渲染购物车图标上的数字
  sumCartNum : function(){
    var la = JSON.parse(localStorage.getItem("carts"));
    la = la === null ? [] : la;
    // console.log(la);
    var sum = 0;
    la.forEach(function(item){
      sum += item.count;
    })
    this.cartsNum.html(sum);
    // console.log(sum);
  },
  // 减少购买的商品数量
  reduceGoodsNum : function(evt){
    var e = evt || window.event;
    var target = e.target || e.crcElement;
    var id = $(target).parent().attr("data-id");
    // console.log(id);
    var la = JSON.parse(localStorage.getItem("carts"));
    la.forEach(function(item, index){
      if(item.id == id){
        item.count --;
        if(item.count === 0){
          la.splice(index, 1);
        }
      }
    })
    localStorage.setItem("carts", JSON.stringify(la));
    this.fire("changeNum");
    this.sumCartNum();
  },
  // 增加购买的商品数量
  addGoodsNum : function(evt){
    var e = evt || window.event;
    var target = e.target || e.crcElement;
    var id = $(target).parent().attr("data-id");
    // console.log(id);
    var la = JSON.parse(localStorage.getItem("carts"));
    la.forEach(function(item, index){
      if(item.id == id){
        item.count ++;
        if(item.count === 0){
          la.splice(index, 1);
        }
      }
    })
    localStorage.setItem("carts", JSON.stringify(la));
    this.fire("changeNum");
    this.sumCartNum();
  },
  add : function(cb, type){
    console.log(this.cbList)
    if(!(this.cbList[type] instanceof Array)){
      this.cbList[type] = [];
    }
    console.log(this.cbList);
    this.cbList[type].push(cb);
  },
  fire : function(type){
    this.cbList[type].forEach(function(item){
      typeof item === "function" ? item() : "";
    })
  }
})
export default new Cart();