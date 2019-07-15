// 1. 渲染页面
// - 获取数据
// - 拼接页面
let{ajax, ejs, $, on} = Utils;
class WaterFall{
  constructor(){
    this.init();
  }
  async init(){
    this.template = $("#template");
    this.wrapper = $(".wrapper");
    this.container = $(".container");
    this.count = 0;
    this.cHeight = document.documentElement.clientHeight;
    this.loading = false;
    this.next_start = 0;
    // 高度数组
    this.heightArray = [];
    this.changeContainerWidth();
    let timer = null;
    // 给页面绑定事件
    on(window, "resize", ()=>{
      // 节流
      clearTimeout(timer);
      timer = setTimeout(()=>{
        // 当页面改变大小时,重新给高度数组赋值
        this.heightArray = [];
        this.changeContainerWidth();
        this.render(res);
        this.sort();
        timer = null;
        this.cHeight = document.documentElement.clientHeight;
      }, 500)
    });
    on(window, "scroll", async()=>{
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(!this.loading && scrollTop + this.cHeight >= this.containerHeight - 300){
        this.loading = true;
        // 加载
        let res = await new Load().init(this.next_start);
        this.next_start = Load.nextStart;
        this.render(res);
        this.sort();
        // 加载结束要归零
        this.loading = false;
      }
    })
    // 页面第一次加载时渲染页面
    let res = await new Load().init(0);
    this.next_start = Load.nextStart;
    this.render(res);
    this.sort();
  }
  // 当页面宽度被改变，改变列数
  changeContainerWidth(){
    let cWidth = document.documentElement.clientWidth;
    this.count = parseInt(cWidth / 250);
    this.container.style.width = this.count * 250 + "px";
  }
  // 渲染页面
  render(list){
    let html = "";
    for(var i = 0; i< list.length; i++){
      // 根据比例计算图片的高度
      let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
      html += 
      `<div class="box">
        <div class="box-img" style="height:${scaleHeight}px">
          <img src="${list[i].photo.path}" alt="">
          <u style="height:${scaleHeight}px"></u>
        </div>
        <div class="box-detail">
          <div class="title">
              ${list[i].msg}
          </div>
        </div>
      </div>`
    }
    this.wrapper.innerHTML += html;
  }
  // 排序
  sort(){
    // 获取所有图片
    this.children = Array.from(this.wrapper.children);
    // 遍历图片
    this.children.forEach((box, index)=>{
      if(index < this.count){
        // 如果是第一排的图片，那么就将图片的高度加入高度数组
        this.heightArray.push(box.offsetHeight);
      }else{
        // 如果不是，计算数组中最低的高度，在下方加入该图片
        let min = Math.min.apply(false, this.heightArray);
        let minIndex = this.heightArray.indexOf(min);
        box.style.position = "absolute";
        box.style.left = minIndex * 250 + "px";
        box.style.top = min  + 20 + "px";
        // 更新高度数组
        this.heightArray[minIndex] += box.offsetHeight + 20;
      }
    })
    // 获取高度数组的最大值
    let maxHeight = Math.max.apply(null, this.heightArray);
    let minHeight = Math.min.apply(null, this.heightArray);
    // 给外面的大包围高度
    this.container.style.height = maxHeight + "px";
    this.containerHeight = minHeight;
    this.heightArray.length = 0;
  }
}
// 加载数据
class Load{
  constructor(){}
  async init(start){
    let url = "http://localhost/dt";
    let data = {
      include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
      filter_id: "古风",
      start: start,
      _: Date.now()
    }
    let res = await ajax(url, {data : data, dataType : "json"});
    Load.nextStart = res.data.next_start;
    return res.data.object_list;
  }
  static nextStart = 0;
}

new WaterFall();