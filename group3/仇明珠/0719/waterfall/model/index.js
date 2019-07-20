import loadData from "./loadData.js";
import render from "./render.js";
import sort from "./sort.js"
export default function(){
    var  wrapper     = $(".wrapper");
    var container   = $(".container");
    var timer=null;
    var def=loadData.init();
    def.then(function(res){
        var list=res.data.object_list;
        var html=render(list);
        $(wrapper).html(html);
        changeContainerWidth();
    });
    function changeContainerWidth(){
        var cWidth = document.documentElement.clientWidth;
        var count = parseInt(cWidth / 250);
        $(container).css({
            width:count * 250
        });
        sort();
    }
    $(window).on("resize",function(){
        clearTimeout(timer);
        timer = setTimeout(function (){
            changeContainerWidth();
            timer = null;
        }, 500)
    })
}  