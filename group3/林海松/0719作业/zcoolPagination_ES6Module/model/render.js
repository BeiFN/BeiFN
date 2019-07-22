//页面渲染
export default function(){
    function render(){

    }
    $.extend(render.prototype,{
        init : function(data){
            var html = "";
            $.each(data,function(index,item){
                html += `<div class="box">
                            <div class="box-img">
                                <img src="${item.cover}" alt="">
                            </div>
                            <div class="box-title">
                                <a href="">
                                    ${item.title}
                                </a>
                                <span class="fire"></span>
                            </div>
                        </div> `     
            })
        return html;
        }
    })
    return new render();
}