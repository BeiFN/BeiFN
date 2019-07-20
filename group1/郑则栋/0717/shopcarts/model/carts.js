define([
    'jquery',
], function () {
    'use strict';
    function carts() { }
    $.extend(carts.prototype, {
        init: function () {
            this.cb=[];
            $('.goods-list').on("click", ".add-cart", $.proxy(this.addCarts, this));
            $('.goods-list').on('click', $.proxy(this.chageItems, this));
        },
        addCarts: function (eve) {
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).attr('data-id');
            this.SecondCar(id);
            this.changeCart();
        },
        SecondCar: function (id) {
            var s = localStorage.getItem('carts');
            if (s === null) {
                // console.log(1);
                var a = [{
                    id: id,
                    count: 1
                }]
                localStorage.setItem('carts', JSON.stringify(a));
            }
            else {
                var bool = false;
                var a = JSON.parse(s);
                $.each(a, function (index, item) {
                    if (id === item.id) {
                        item.count++;
                        bool = true;
                        // console.log(item)
                    }

                });
                if (!bool === true) {
                    a.push({
                        id: id,
                        count: 1
                    });
                }
                localStorage.setItem('carts', JSON.stringify(a));
            }
        },
        changeCart: function () {
            var sum = 0;
            var count = JSON.parse(localStorage.getItem('carts'));
            $.each(count, function (index, item) {
                sum += item.count;
                // console.log(sum);

            });
            $('.cart-num').html(sum);
        },
        chageItems: function (eve) {
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            var data_id=$(target).parent().attr('data-id');
            var la = JSON.parse(localStorage.getItem("carts"));
            if (!(target.className.indexOf('btn-reduce') == -1)) {
        
                la.forEach(function(item,index){
                    if(item.id===data_id){
                        item.count--;
                    }
                    if(item.count===0){
                        la.splice(index,1);
                    }
                    
                });
                localStorage.setItem('carts',JSON.stringify(la));
                this.fire();
                
            }
            else if (!(target.className.indexOf('btn-add') == -1)){

            }

                // console.log(target.className.indexOf('btn-reduce'));
        },
        add:function(fn){
            this.cb.push(fn);
        },
        fire:function(){
            if(this.cb instanceof Array){
                this.cb[0]();
            }
            // this.cb.length=0;
        }
    })
    return new carts();
});