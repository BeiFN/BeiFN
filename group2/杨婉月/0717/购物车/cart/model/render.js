define(["jquery"], function($){
    function Render(){}
    $.extend(Render.prototype, {
        init : function(){
            var list = JSON.parse(localStorage.getItem("carts"));
            console.log(list);
            var html = "";
            $.each(list, function(index, item){
                
            })
            return html;
        }

    })
    return new Render();
})