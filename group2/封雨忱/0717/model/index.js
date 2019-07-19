define([
    'jquery',
    './loaddata',
    './render',
    './carts'
], function($, loaddata,render,carts) {
    'use strict';
    console.log(loaddata)
    var der=loaddata.init();
    der.then(function(res){
        console.log(res);
    })
});