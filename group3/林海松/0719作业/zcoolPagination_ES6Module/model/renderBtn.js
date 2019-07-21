export default function(){
    function renderBtn(){

    }
    $.extend(renderBtn.prototype,{
        init : function(total , showNo , pageNo){
            var group = Math.ceil(total / showNo);
            var html = "";
            for (var i = 0; i < group; i++) {//动态添加span标签
                if (i + 1 === pageNo) {
                    html += `<span class="active">${i + 1}</span>`;
                }
                else {
                    html += `<span>${i + 1}</span>`;
                }
            }
            return html;
        }
    })
    return new renderBtn();
}
