class Pagination{
    constructor(){
        
    }
    init({
        list    = "",
        page    = "",
        getData = {
            url  : "",
            data : {}
        },
        template= "",
        pageNo  = 1,
        showNo  = 5
    } = {}){
        this.list_wrapper = $(list);
        this.page_wrapper = $(page);
        this.pageNo       = pageNo;
        this.showNo       = showNo;
        this.url          = getData.url;
        this.data         = getData.data;
        this.template     = template;

        this.page_wrapper.on("click" , "span" ,$.proxy(function(evt){
            let target = evt.target;
            this.render();
            this.renderBtn();
        },this));
        this.loadData().done($.proxy(function(res){
            this.total = res.data.contents.length;
            this.render(res);
        },this))
    }

    loadData(){
        return $.ajax({
            url : this.url,
            data : this.data,
            dataType : "json"
        });
    }

    interceptData(data){
        let min = this.showNo * (this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1;
        
        // data = $.filter(data , $.proxy(function(index){
        //     return index >= min && index <= max;
        // },this))

        data = data.filter((item , index)=>{
            return index >= min && index <=max;
        })
        // console.log(data);
        return data;
    }

    render(res){
        let data = res.data.contents;
        data = this.interceptData(data);

        let html = ejs.render(this.template , {data : data});
        this.list_wrapper.innerHTML = html;
    }

    renderBtn(){
        let total = Math.ceil(this.total / this.showNo);
        let btns  = this.page_wrapper.children;

        if(btns.lengths === total){
            // $.each(btns , $.proxy(function(index , item){
            //     if(this.pageNo === index+1){
            //         item.addClass("active")
            //         .siblings()
            //         .removeClass("active");
            //     }
            // },this))

            Array.from(btns).forEach((btn , index)=>{
                if(index + 1 === this.pageNo){
                    btn.className = "active";
                }else{
                    btn.className = "";
                }
            })

            return false;
        }

        let html = "";
        for(let i = 0; i < total; i ++){
            if(i + 1 === this.pageNo){
                html += `<span class='active'>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>`;
            }
            $(this.page_wrapper) = html;
        }
    }

    toIndex(index){
        this.pageNo = index + 1;
    }
}