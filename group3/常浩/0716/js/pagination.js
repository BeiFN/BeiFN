let {ejs} = Utils;
class Pagination{
    constructor(){
    
        this.init();
    }
    async init(){
        this.showNo = 5;
        this.pageNo = 1;
        this.list_wrapper = $(".image-list")[0];
        this.page_wrapper = $(".pagination")[0];
        console.log(this.list_wrapper,this.page_wrapper)
        //获取数据
        let res = await this.getData();
        this.res_list = res.data.contents
        // //处理数据   数据处理放在此处不正确   事件触发 数据不能再次更新 
        // let datas = this.clip();
        // 渲染页面
        this.render();
        // 创建分页按钮
        this.createBtns();
        //事件委托
        $(this.page_wrapper).on("click","span",(evt)=>{
            let  target = evt.target;
            this.toIndex.call(this,$(target).index());
            this.clip();
            this.render();
            this.createBtns();
        })
    }
    async getData(){
        let url = "http://localhost/zc";
        let data ={
            pageSize : 50,
            contentId : (""+Date.now()).slice(6)+"_3",
            day : new Date().toISOString().slice(0,10)
        }
        let res =  await $.ajax(url , {
            data : data,
            dataType : "json"
        })
        return res;
    }
    //数据裁剪
    clip(){
        // console.log(res);
        let min = this.showNo * (this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1;
        let datas = this.res_list.filter((item , index)=>{
            return index >= min && index <= max ;
        }) 
        // console.log(datas);
        return datas;
    }
    //渲染页面
    render(){
       
        let data = this.clip();
        let template = `
        <%  for(var i = 0 , item ; item = data[i]; i++) {%>
              <div class="box">
                    <div class="box-img">
                          <img src="<%= item.cover %>" alt="">
                    </div>
                    <div class="box-title">
                          <a href="">
                                <%= item.title %>
                          </a>
                          <span class="fire"></span>
                    </div>
              </div>
        <% } %>
        `;
        let  html = ejs.render(template , {data:data});
        this.list_wrapper.innerHTML = html;
    }
    //创建按钮
    createBtns(){
        let total = Math.ceil(this.res_list.length / this.showNo);
        let btns =  this.page_wrapper.children;

        if(btns.length === total){
            Array.from(btns).forEach((btn,index)=>{
                if(index + 1 === this.pageNo){
                    btn.className = "active";
                }else{
                    btn.className = "";
                }
            })
        }

        let html = "";
        for( var i = 0 ; i < total ; i ++){
            if(i + 1 === this.pageNo){
                html += `<span class=active>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>` ;
            }
        }
        this.page_wrapper.innerHTML = html; 
    }
    //切换页码
    toIndex(index){
        this.pageNo = index +1;
    }
}
new Pagination(); 