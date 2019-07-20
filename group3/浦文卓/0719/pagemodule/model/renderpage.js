
function RenderPage(){}
$.extend(RenderPage.prototype,{
    init : function(res){
        this.show_No = 5;
        this.page_No = 1;
        this.renderPage(res)
    },
    renderPage : function(res){
        let data = res.data.contents;
        data = this.cutPage(data);     
        let template = `<%for(let i = 0 ,item ; item = data[i] ; i ++){%>
                            <div class="box">
                                <div class="box-img">
                                    <img src="<%=item.cover%>" alt="">
                                </div>
                                <div class="box-title">
                                    <a href=""><%=item.title%></a>
                                    <span class="fire"></span>
                                </div>
                            </div>
                        <%}%>`
        var html = ejs.render(template,{data : data});
        // this.list_wrapper.innerHTML = html;
        return html;
    },
     //剪裁数据
     cutPage : function(cut_data){
        // 0~4
        // 5~9
        // 10~14
        // 15~19
        // 5(n-1)~5n-1
        // let n = this.total / this.show_No;
        // let show = 5;
        // let page = 1;
        let min = this.show_No * (this.page_No - 1);
        let max = this.show_No * this.page_No - 1;
        //两个参数，当前正在处理的元素，当前正在处理元素的下标
        cut_data = cut_data.filter((item,index) => {
            if(index >= min && index <= max){
                return item;
            }
        })
        return cut_data;
    }
})
    

export default new RenderPage();