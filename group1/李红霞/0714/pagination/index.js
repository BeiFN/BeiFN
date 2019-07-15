// 实现分页功能  1.创建布局 2.监听用户的输入页码 3.连接服务器获取数据 4.根据pageNum和pageSize计算数据 5.将相应的数据渲染到页面
class Pagination{
      // 获取用户输入并将数据渲染到界面上
      constructor(){
            let {$,ajax,ejs} = Utils;
            this.ajax = ajax;
            this.$ = $;
            this.ejs = ejs;
            this.pagNum = 0;
            this.pagSize = 5;
            this.init();
            this.first = 0;
            this.index = 0;
      }
      init(){
            this.getData();
      }
      getData(){
            // 接受两个参数，第一个为url， 第二个为要获取到的字段
            let url = "http://localhost/zcl";
            let data = {
                  pageSize :100,
                  contentId: (""+Date.now()).slice(6) + "_3",
                  day : new Date().toISOString().slice(0,10)
            }
            this.ajax(url,{
                  data:data,
                  dataType:"json",
                  type:"GET"
            })
            .then(res=>{
                  // 获取到data后先直接渲染到页面上
                  this.data = res.data.contents;
                  // console.log(this.data);
                  this.render(this.data, this.first, this.pagSize);
                  this.getIndex();
                  // 获取到index后根据用户给的index进行渲染页面
            })
      }
      render(data, first, pageSize){
            // 接受两个参数，第一个为字符串，第二个为data，数据是以对象的形式传入的
            let str = this.$("#template").innerHTML;
            let html = this.ejs.render(str, {
                  "data":data,
                  "first":first,
                  "pageSize":pageSize,
            });
            // console.log(first+pageSize)
            this.$(".image-list").innerHTML = html;
            let paginationstr = "";
            for(let i = 0; i < this.data.length /this.pagSize; i++){
                  paginationstr += `<span>${i+1}</span>`;
            }
            this.$(".pagination").innerHTML = paginationstr;
      }
      // 获取用户的点击的按钮的下标 获取pagination并绑定事件
      getIndex(){
            let {on} = Utils;
            on(this.$(".pagination"), "click", this.handlerClick.bind(this), "span");
      }
      handlerClick(index){
            this.index = index;
            this.first = index*this.pagSize;
            console.log(this.data)
            this.render(this.data, this.first, this.pagSize);
      }
}
new Pagination();
