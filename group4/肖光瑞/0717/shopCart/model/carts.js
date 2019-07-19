define([
      'jquery',
], function (require, factory) {
      'use strict';
      function Carts() {
            this.cbList = {};
      }
      $.extend(Carts.prototype, {
            init: function () {
                  this.main = $(".goods-list");
                  this.carts_num = $(".cart-num");
                  this.carts = $(".cart-wrap");

                  this.main.on("click", ".add-cart", $.proxy(this.addCart, this));
                  this.main.on("click", ".add-cart", $.proxy(this.sumCartNum, this));
                  this.carts.on("click", $.proxy(function () {
                        var clear = confirm("是否清空购物车");
                        if (clear) {
                              localStorage.clear();
                              this.sumCartNum();
                        }
                  }, this))


                  this.sumCartNum();

                  this.main.on("click", ".btn-reduce", $.proxy(this.reduceGoodstNum, this));
                  this.main.on("click", ".btn-add", $.proxy(this.addGoodstNum, this));

            },
            addCart: function (evt) {
                  var e = evt || window.event;
                  var target = e.target || e.srcElement;
                  var id = $(target).attr("data-id");
                  //把数据放入locaStorage之中
                  this.saveCart(id)
            },
            saveCart: function (id) {
                  // var arr = [
                  //       {
                  //             id: id,
                  //             count: 1,
                  //       }
                  // ]
                  // localStorage.setItem("carts", JSON.stringify(arr));
                  var s = localStorage.getItem("carts");
                  if (s === null) {
                        var arr = [
                              {
                                    id: id,
                                    count: 1,
                              }
                        ]
                        localStorage.setItem("carts", JSON.stringify(arr));
                  } else {
                        var la = JSON.parse(s);
                        var has_same_id = false;
                        $.each(la, function (index, item) {
                              if (item.id === id) {
                                    item.count++;
                                    has_same_id = true;
                              }
                        })
                        if (!has_same_id) {
                              la.push({
                                    id: id,
                                    count: 1,
                              })

                        }
                        localStorage.setItem("carts", JSON.stringify(la))
                  }

            },
            sumCartNum: function () {
                  var ls = localStorage.getItem("carts");
                  var la = JSON.parse(ls === null ? "[]" : ls)
                  var sum = 0;
                  $.each(la, function (index, item) {
                        sum += item.count;
                  })
                  this.carts_num.html(sum)
                  return sum;
            },
            addGoodstNum: function (evt) {
                  var e = evt || window.event;
                  var target = e.target || e.srcElement;
                  var id = $(target).parent().attr("data-id");
                  var la = JSON.parse(localStorage.getItem("carts"));
                  $.each(la, function (index, item) {
                        if (item.id == id) {
                              item.count++;
                        }
                  })
                  localStorage.setItem("carts", JSON.stringify(la));
                  this.fire("changeNum");
                  this.sumCartNum();
            },
            reduceGoodstNum: function (evt) {
                  var e = evt || window.event;
                  var target = e.target || e.srcElement;
                  var id = $(target).parent().attr("data-id");
                  var la = JSON.parse(localStorage.getItem("carts"));
                  la.forEach(function (item, index) {
                        if (item.id == id) {
                              item.count--
                              if (item.count === 0) {
                                    la.splice(index, 1);
                              }
                        }
                  })
                  localStorage.setItem("carts", JSON.stringify(la));
                  this.fire("changeNum");
                  this.sumCartNum();
            },
            add: function (cb, type) {
                  if (!(this.cbList[type] instanceof Array)) {
                        this.cbList[type] = []
                  }
                  this.cbList[type].push(cb);
            },
            fire: function (type) {
                  $.each(this.cbList[type], function (index, item) {
                        typeof item === "function" ? item() : "";
                  });
            }

      })
      return new Carts();
});