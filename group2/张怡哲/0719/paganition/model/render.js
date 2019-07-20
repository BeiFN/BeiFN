// import ejs from "../../libs/ejs.js"
function Render(){}
$.extend( Render.prototype , {
    init : function(data , pageNo , showNo ){
        this.data = data;
        this.pageNo = pageNo;
        this.showNo = showNo;
        return this.pageRender(data , pageNo , showNo )
    },
    pageRender : function(){
        var data = this.interceptData();
        var html = "";
        $.each(data , function(index , item){
            html += `
                    <div class="box">
                            <div class="box-img">
                                <img src="${item.cover}" alt="">
                            </div>
                            <div class="box-title">
                                <a href="">
                                        ${item.title}
                                </a>
                                <span class="fire"></span>
                            </div>
                    </div>
                     `;
        });
        // var html = ejs.Render(this.template , {data : data});
        return html;
    },
    interceptData : function(){
        var min = this.showNo * (this.pageNo - 1);
        var max = this.showNo * this.pageNo - 1;
        // console.log(this.data);
        var data = this.data.filter(function(item , index){
            return index >= min && index <= max;
        })
        return data;
    }

})
export default  new Render();