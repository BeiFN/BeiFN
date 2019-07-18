
let { ejs } = Utils;

// Pagination 类
class Pagination{
    constructor(){
        // 获取img列表
        // this.list    = $("image-list");
        this.page_wrapper = $(".pagination");
        this.wrapper = $(".wrapper");
        // console.log(this.wrapper[0])
        // 当前显示的数量为 5
        this.showImg = 5;
        // 当前显示的页码为1
        this.pageImg = 3;
        this.init();
    }
    async init(){
        $(".pagination").on("click", "span" , (evt)=>{
            let target = evt.target;
            this.toIndex($(target).index());
            this.render();
            this.renderBtn();
        })
        // console.log(this.list,this.wrapper);
        // 加载数据
        this.loadData();
        // 获取的数据res
        this.res = await this.loadData();
        // sum为数据的总和
        this.sum = this.res.data.contents.length;
        // console.log(this.sum)
        // console.log(this.res);
        // 渲染按钮
        this.renderBtn()
        // 渲染页面
        this.render();
    }
    // 渲染页面
    render(){
        // 获取数组列表数量
        let list = this.res.data.contents;
        // 确认显示几张
        list = this.ininterceptData(list);
        // console.log(list[0].cover);
        // ejs字符串模板
        let template = `
            <% for (let i = 0;i<list.length;i++) {%>
                <div class="box">
                    <div class="box-img">
                        <img src="<%= list[i].cover %>" alt="">
                    </div>
                    <div class="box-title">
                        <a href="">
                                <%= list[i].title %>
                        </a>
                        <span class="fire"></span>
                    </div>
                </div>
            <% } %>
        `;
        let html = ejs.render(template,{list:list});
        // console.log(template,list,html);
        this.wrapper[0].innerHTML = html;
    }
    // 显示几张图片
    ininterceptData(list){
        // 最小值 = 当前显示照片的数量 * （页码 - 1）
        let min = this.showImg * (this.pageImg - 1);
        // 最大值 = 当前显示照片的数量 * 页码 - 1
        let max = this.showImg * this.pageImg - 1;
        // console.log(min,max);
        // 过滤数组list
        let newList = list.filter((item,index)=>{
            // console.log(index);
            return index>=min && index<=max;
        });
        // console.log(newList);
        return newList;
    }
    // 加载数据
    async loadData(){
        // pageSize=5&contentId=9250681_3&day=2018-12-04
        let url  = "http://localhost/zc";
        let data = {
            pageSize  : 20,
            contentId : ((""+Date.now()).slice(6)+"_3"),
            day       : new Date().toISOString().slice(0,10),
        }
        // let res =ajax(url,{data:data,dataType:"json"}).then((res)=>{console.log(res)});
        let res = await $.ajax(url,{data : data,dataType:"json"});
        // console.log(res.data.contents);
        return res;
    }
    // 渲染按钮
    renderBtn(){
        // 向上取整
        let sum = Math.ceil(this.sum/this.showImg);
        // console.log(sum);
        // 获取page_wrapper的子元素
        let btns = this.page_wrapper[0].children;
        // console.log(btns);
        // 转换为真数组遍历循环
        if(btns.length === sum){
            Array.from(btns).forEach((item,index)=>{
                if(index+1 === this.pageImg){
                    item.className = "active";
                    // item.style.cursor = "pointer";
                }else{
                    item.className = "";
                    // item.style.cursor = "pointer";
                }
            })
        }else{ 
            let html = "";
            for(let i=0;i<sum;i++){
                if(i+1===this.pageImg){
                    html += `<span class=active>${i+1}</span>`
                }else{
                    html += `<span>${i+1}</span>`
                }
            }
         this.page_wrapper[0].innerHTML = html;
        }  
    }
    toIndex(index){
        this.pageImg = index+1;
    }
}

new Pagination();
