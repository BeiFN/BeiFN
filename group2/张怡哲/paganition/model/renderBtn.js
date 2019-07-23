function RenderBtn(){}
$.extend( RenderBtn.prototype , {
    init : function(data , showNo , page_wrapper , pageNo){
        this.data         = data;
        this.showNo       = showNo;
        this.page_wrapper = page_wrapper;
        this.pageNo       = pageNo;
        return this.renderBtn();
    },
    renderBtn : function(){
        // console.log(Math.ceil(this.data.length / this.showNo));
        var total = Math.ceil(this.data.length / this.showNo);
        // var btns  = this.page_wrapper.children;
        // console.log(btns);

        // if(btns.length === total){
        //     $.each(btns , function(index , item){
        //         if(index+1 === this.pageNo){
        //             item.addClass("active")
        //             .siblings()
        //             .removeClass("active");
        //         }
        //     })
        //     return false;
        // }

        var html = "";
        for(var i = 0 ; i < total ; i++){
            if(i + 1 === this.pageNo){
                html += `<span class='active'>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>`;
            }
        }
        // console.log(html);
        return html;
    }
})
export default new RenderBtn();