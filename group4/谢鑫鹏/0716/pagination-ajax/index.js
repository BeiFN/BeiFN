let{ajax, $ : $$, on, ejs} = Utils;

function Pagination(){
  this.init();
}
$.extend(Pagination.prototype, {
  init : async function(){
    this.list_wrapper = $$(".image-list");
    this.page_wrapper = $$(".pagination");
    this.pageNo = 1;
    this.showNo = 5;
    // 1. 以数据加载开始
    // 2. 事件委托
    on(this.page_wrapper, "click", (evt)=>{
      // console.log(this);
      // console.log(evt.target);
      // console.log(evt.target.index());
      this.toIndex(evt.target.index()); 
      this.render();
      this.renderBtn();
    }, "span")
    // 等待数据加载完成
    this.res = await this.loadData();
    console.log(this.res);
    this.total = this.res.data.contents.length;
    // 页面加载先渲染一次
    this.render();
    this.renderBtn();
  },
  loadData : async function(){
    let res = await $.ajax({
      url : "http://localhost/zc",
      data : {
        pageSize : 20,
        contentId : ("" + Date.now()).slice(6) + "_3",
        day : new Date().toISOString().slice(0, 10)
      },
      async : true
    })
    return res;
  },
  // 渲染页面
  render : function(){
    let data = this.res.data.contents;
    // 处理data
    data = this.interceptData(data);
    let template = 
    `<%  for(var i = 0 , item ; item = data[i]; i++) {%>
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
    <% } %>`
    var html = ejs.render(template, {data : data});
    this.list_wrapper.innerHTML = html;
  },
  // 裁切data
  interceptData : function(data){
    let min = this.showNo * (this.pageNo - 1);
    let max = this.showNo * this.pageNo - 1;
    data = data.filter((item, index) => {
      return index >= min && index <= max ;
    })
    // console.log(data);
    return data;
  },
  // 渲染按钮
  renderBtn : function(){
    // 获取页数
    let total = Math.ceil(this.total / this.showNo);
    // console.log(total);
    // 获取页数按钮组
    let btns = Array.from(this.page_wrapper.children);
    // console.log(btns);
    // 不用重新渲染按钮，只需要切换active就可以了
    if(btns.length === total){
      btns.forEach((btn, index)=>{
        if(index + 1 === this.pageNo){
          btn.className = "active";
        }else{
          btn.className = "";
        }
      })
      return false;
    }
    // 没有按钮时渲染按钮
    let html = "";
    for(let i = 0; i < total; i++){
      if(i + 1 === this.pageNo){
        html += `<span class="active">${i+1}</span>`;
      }else
      html += `<span>${i+1}</span>`;
    }
    this.page_wrapper.innerHTML = html;
  },
  // 切换页码
  toIndex : function(index){
    this.pageNo = index + 1;
  }
})
  
new Pagination();
