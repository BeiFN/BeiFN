
function Render(){}
$.extend(Render.prototype , {
    init : function(data){
        var html = "";
        var url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563172097821&di=5a91819ee43850fc70b858e143165238&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523090235_fJUxr.gif";
        for(var i = 0 ; i < data.length ; i++){
            var boxHeight = parseInt(235/ data[i].photo.width * data[i].photo.height);
            html += `<div class="box" data-img="${data[i].photo.path}">
                            <div class="box-img" style = "height:${boxHeight}px" >
                                <img src="${url}" alt="">
                                <u style = "height:${boxHeight}px"></u>
                            </div>
                            <div class="box-detail">
                                <div class="title">
                                    ${data[i].msg}
                                </div>
                            </div>
                    </div>`;
        }
        return html;
        // this.wrapper.html(html);
    }
})
export default new Render();