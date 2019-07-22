let {ajax, $ , on} = Utils;


class Pagination{
    constructor(){
       
    }

   async init({
        box_wrapper = "",
        pagination  = "",
        getData     = {
            url  : "",
            data : {},
        },
        template = "",
        pageNo   = 1,
        showNo   = 5
        } = {}){
            console.log(box_wrapper);
            console.log(pagination);
            this.box_wrapper = $(box_wrapper);
            this.pagination  = $(pagination);
            this.url         = getData.url;
            this.data        = getData.data;       
            this.pageNo      = pageNo;
            this.showNo      = showNo;
            this.template    = template;
        on(this.pagination , "click" , (evt)=>{
            //返回分页器下标
            // console.log(evt.target.index());
            this.toIndex(evt.target.index());
            this.renderBtn();
            this.render();
        } , ".pagination span")
        this.res = await this.loadData();
        this.total = this.res.data.object_list.length;
        this.renderBtn();
        this.render();
    }
   async loadData(){
        // let url = "http://localhost/dt";
        // let data = {
        //     include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
        //     filter_id: "人文艺术",
        //     start: 24,
        //      "_" : Date.now()
        // }

        let res = await ajax(this.url , { data : this.data , dataType : "json"});
        return res;
    }
    render(){
        let data = this.res.data.object_list;
        data = this.interceptData(data);
        // this.template = `<%for(var i = 0 ,attr; attr = data[i] ; i++){%>
        //                     <div class="box">
        //                         <div class="box-img">
        //                             <img src="<%= attr.photo.path%>" alt="">
        //                         </div>
        //                         <div class="box-title">
        //                             <a href="">
        //                                  <%= attr.msg%>       
        //                             </a>
        //                             <span class="fire"></span>
        //                         </div>
        //                     </div>
        //                 <%}%>`
        let html = ejs.render(this.template,{data : data});
        this.box_wrapper.innerHTML = html;
    }
    //0-4 5-9 5(n-1) 5n-1
    interceptData(data){
        let min = this.showNo*( this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1;
        data = data.filter((item , index)=>{
            return index >= min && index <= max;
        })
        return data;
    }

    renderBtn(){
        let total = Math.ceil(this.total / this.showNo);
        let btns  = this.pagination.children;
        if(btns.length === total){
            Array.from(btns).forEach((btn,index) => {
                if( index + 1 === this.pageNo){
                    btn.className = "active";
                }else{
                    btn.className = "";
                }
            })
            return false;
        }

        let html = "";
        for(var i = 0 ; ++i <= total ; ){
            if(i === this.pageNo){
                html += `<span class = active>${i}</span>`
            }else{
                html += `<span>${i}</span>`
            }
        }
        this.pagination.innerHTML = html;
    }

    toIndex(index){
        this.pageNo = index + 1;
    }
}
