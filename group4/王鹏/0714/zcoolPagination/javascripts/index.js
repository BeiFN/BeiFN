// 对班级进行分组 ;
// 6 人一组编号;
// 共 55 人有多少组; 
// 55 / 6 = 9 余 1 
// 如果有余数就多加一组;
// 10 组;

// 1.  1 ~ 6 
// 2.  7 ~ 12
// 3. 13 ~ 18
// 4. 19 ~ 24 
// n. 6(n - 1) + 1 ~ 6n

// 渲染         ;   box , 按钮;   ejs;  
// ejs.render( template , data);
// // 事件      ;   事件委托;
// 数据根据页码不同 => 页码影响数据;
// // 重新渲染  ; 
// ejs.render( template , data);
// 页码         ; 

let { ajax , $ } = Utils;

class Pagination{
      constructor() {
            this.init();
      }
      async init(){
            this.list_wrapper = $(".image-list");
            this.pageNo = 1;
            this.showNo = 5;
            // 1. 以数据加载开始;
            // 2. 事件委托;
            this.res = await this.loadData();
            // console.log(res);
            this.render();
      }     
      // 加载数据;
      async loadData(){
            let url  = "http://localhost/zc";
            let data = {
                  pageSize : 100,
                  contentId: (""+Date.now()).slice(6) + "_3",
                  day : new Date().toISOString().slice(0,10)                  
            }     
            // await 
            let res = await ajax( url , { data : data , dataType : "json" });
            return res;
      }
      // 渲染页面;
      render(){
            let data = this.res.data.contents;
            // 处理data;
            data = this.interceptData(data);
            let template = "";
                      
            var html = ejs.render(template , {data : data})
            console.log(html);
            this.list_wrapper.innerHTML = html;
      }
      //裁剪数据的;
      interceptData(data){
            // 裁剪;
            
            return data;
      }
      // 切换页码;
      prevIndex(){

      }
      nextIndex(){

      }
      toIndex(){

      }
}

new Pagination();