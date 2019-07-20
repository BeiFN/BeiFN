define([
    'jquery'
], function($) {
    'use strict';
    function Carts() {};
    Carts.prototype.init = function () {
        this.main = $(".goods-list");
        this.main.on("click", ".add-cart", $.proxy(this.addCart, this));
    }
    Carts.prototype.addCart = function (evt) {
        // console.log(this);
        var e = evt || event;
        var target = e.target || e.srcElement;
        var id = $(target).attr("data-id");
        console.log(id);
    }
    return new Carts();
});