export default function(){
    function render(){

    }
    $.extend(render.prototype,{
        init : function(data){
            var html = "";
            $.each(data,function(index , item){
                var proportionH = parseInt( (235 / item.photo.width)* item.photo.height);
                html +=`<div class="box">
                        <div class="box-img" style="height:${proportionH}px">
                            <img src="${item.photo.path}" alt="">
                            <u style="height:${proportionH}px"></u>
                        </div>
                        <div class="box-detail">
                            <div class="title">
                                ${item.msg}
                            </div>
                        </div>
                    </div>`
            })
            return html ;
        }
    })
    return new render();
}