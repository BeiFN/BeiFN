

let {$,ajax , on} = Utils;
class Pagination{
    constructor(){

    }
    async init({
        url = "",
        data = {},
        wrapper = "",
        pagination = "",
        pageNo = 1,
        showNo = 4
    }={}){
        // console.log(wrapper,pagination)
        this.url  = url;
        this.data = data;
        this.wrapper = $(wrapper);
        this.pagination = $(pagination);
        this.pageNo  = pageNo;
        this.showNo  = showNo;
        on(this.pagination , "click" , (evt) =>{
            this.toIndex(evt.target.index());
            this.render();
            this.renderBtn();
        },".pagination span")
        this.res = await this.loadData(); 
     
        this.total = this.res.length;     
        this.render();
        this.renderBtn();
    }
    async loadData(){
        let res = await ajax( this.url,{data : this.data,dataType : "json" });
        return res.goods_list;
    }
    render(){
        let data = this.interceptData(this.res);

        
        let template = `<%for(let i = 0 ; attr = data[i] ; i++){%>
                            <div class="box">
                                <img src="<%=attr.hd_url%>" alt="">           
                                <div class="title">
                                    <%=attr.goods_name%>
                                </div>
                                <div class="price">
                                    ￥
                                    <span class="group-price"><%=attr.price%></span>
                                </div>
                            </div>
                        <%}%>`
        //传入ejsrender方法内的data 就是template中for循环的data
        let html = ejs.render(template , {data : data});
        // console.log(html)
        this.wrapper.innerHTML = html;
    }
    //分割数组
    interceptData(data){
        // 0-3 4-7 8-11  4(n-1)  4n-1
        let min = this.showNo *(this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1 ;
        data = data.filter((item ,index)=>{
            return index >=min && index <= max;
        })
        return data;
    }

    renderBtn(){
        let total = Math.ceil(this.total / this.showNo);
        let html = "";
        let btns = this.pagination.children;
        if(btns.length === total){
            for(let i = 0 ,btn ; btn = btns[i++];){
                if(this.pageNo === i +1 ){
                    btn.className = "active";
                }else{
                    btn.className = "";
                }
            }
            return false;
        }

        for(let i = 0 ; ++i < total ; ){
            if(this.pageNo === i){
                html += `<span class = active>${i}</span>`;
            }else{
                html += `<span>${i}</span>`;
            }
        }
        this.pagination.innerHTML = html ;
    }

    toIndex(index){
        this.pageNo = index + 1;
    }
}
