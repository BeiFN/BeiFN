//导入库方法
let { ajax , $ , on , ejs} = Utils;

// 页面布局类
class Pagination{
      constructor() {
            
      }
      // async声明异步
      async init({
            list = "",
            page = "",
            getData = {
                  url  : "",
                  data : {}
            },
            template = "",
            pageNo = 1,
            showNo = 5
      } = {}){
            this.list_wrapper = $(list);
            this.page_wrapper = $(page);
            this.pageNo       = pageNo;
            this.showNo       = showNo;
            this.url          = getData.url;
            this.data         = getData.data;
            this.template     = template;
            console.log(this);
            // 1. 以数据加载开始;
            // 2. 事件委托;
            on(this.page_wrapper , "click" , (evt)=>{
                  this.toIndex(evt.target.index());
                  this.render();
                  this.renderBtn();
            }, "span")

            // 下列函数异步调用，保证数据渲染在加载数据之后
            this.res = await this.loadData();
      //    站酷接口数据拆分
            this.total = this.res.data.contents.length;
            // 拼多多接口数据拆分
            // this.total = this.res.goods_list.length;

            this.render();
            this.renderBtn();
      }     
      // 加载数据;
      async loadData(){
            // let url  = "http://localhost/zc";
            // let data = {
            //       pageSize : 100,
            //       contentId: (""+Date.now()).slice(6) + "_3",
            //       day : new Date().toISOString().slice(0,10)                  
            // }
            let res = await ajax( this.url , { data : this.data , dataType : "json" });
            console.log(res);
            return res;
      }
      // 渲染页面;
      render(){
            let data = this.res.data.contents;
            // let data = this.res.goods_list;
            //拆分处理data;
            data = this.interceptData(data);
            
            //使用模板引擎数据处理
            var html = ejs.render(this.template , {data : data});
            // 页面渲染
            this.list_wrapper.innerHTML = html;
      }
      //裁剪数据
      interceptData(data){
            // 裁剪; 显示数据范围
            let min = this.showNo * ( this.pageNo - 1);
            let max = this.showNo *  this.pageNo - 1;
            // filter遍历，以数组形式返回满足条件的元素，item元素，index元素下标
            data = data.filter( (item , index) => {
                  return  index >= min && index <= max;
            })
            return data;
      }
      // 渲染按钮;
      renderBtn(){
            // 实际按钮数
            let total = Math.ceil(this.total / this.showNo); 
            // 当前页面按钮数
            let btns = this.page_wrapper.children;

            // 不用重新渲染按钮，只需要切换active就可以了;
            if(btns.length === total){
                  // 选中按钮
                  Array.from(btns).forEach( ( btn , index) => {
                        if(index + 1 === this.pageNo){
                              btn.className = "active"
                        }else{
                              btn.className = "";
                        }
                  })
                  return false;
            }
            // 渲染按钮;
            let html = "";
            for(var i = 0 ; i < total ; i ++){
                  if(i + 1 === this.pageNo) {
                        html += `<span class=active>${i+1}</span>`;
                  }else{
                        html += `<span>${i+1}</span>`;
                  }
            }
            this.page_wrapper.innerHTML = html;
      }
      // 切换页码;
      toIndex(index){
            // console.log(index);
            this.pageNo = index + 1;
      }
}

