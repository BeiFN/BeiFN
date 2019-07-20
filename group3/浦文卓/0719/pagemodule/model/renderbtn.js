function RenderBtn(){}
$.extend(RenderBtn.prototype,{
    //渲染按钮
    init : function(res){
        this.page_wrapper = $(".pagination");
        this.show_No = 5;
        this.page_No = 1;
        this.total = res.data.contents.length
        return this.renderBtn();
    },
    renderBtn : function(){
        // console.log("btn");
        let count = Math.ceil(this.total / this.show_No);
        //改变按钮类名，换颜色
        let btns = this.page_wrapper.children;
        // console.log(btns); 
        if(btns.length === count){
            // console.log(typeof btns);
            Array.from(btns).forEach((item , index) => {
                if(index + 1 === this.page_No){
                    item.className = "active";
                }else{
                    item.className = "";
                }
            });
            return false;
        }

        let html = "";
        for(let i = 0 ; i < count ; i ++){
            if( i + 1 === this.page_No){
                html += `<span class=active>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>`;
            }
        } 
        return html;   
    },
    toIndex : function(index){
        // console.log("to");
        this.page_No = index + 1;
        console.log(this.page_No);
    }
})
export default new RenderBtn();