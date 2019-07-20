
import sort from "./sort.js";
import render from "./render.js";
let { ajax   , $ , on } = Utils;

//  滚轮向下滚动滚动到一定程度的时候就加载数据。
//  一定程度 => 机器无法分别 ; 自己定义逻辑;
// 

class WaterFall{
      constructor(){
            this.init();
      }
      async init(){
          this.template    = $("#template");
          this.wrapper     = $(".wrapper");
          this.container   = $(".container");
          //屏幕高度
          this.cHeight     = document.documentElement.clientHeight;
          //是否在加载;
          this.loading     = false;
          // 下一次在哪加载;
          this.next_start = 0;
          // 第一排能放下多少个元素;
          this.count       = 0;
          this.heightArray = [];
          this.changeContainerWidth();
          let timer = null;
          on(window , "resize" , ()=>{
                  clearTimeout(timer);
                  timer = setTimeout( ()=>{
                        this.changeContainerWidth();
                        this.sort();
                        timer = null;
                        this.cHeight     = document.documentElement.clientHeight;
                  },500)
          })
          on(window, "scroll" ,async ()=>{
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(!this.loading && scrollTop + this.cHeight >= this.containerHeight - 300){
                   this.loading = true;
                   // 加载;
                   let res =  await new Load().init(this.next_start);
                   this.next_start = Load.nextStart;
                   render(this.wrapper, res);
                   sort();
                   // 加载结束要归零;
                   this.loading = false;
                }
          })
          let res =  await new Load().init(0);
          this.next_start = Load.nextStart;
          render(this.wrapper,res);
          sort();
      }
    
      changeContainerWidth(){
          let cWidth = document.documentElement.clientWidth;
          this.count = parseInt(cWidth / 250);
          this.container.style.width = this.count * 250 + "px";  
      }
   

}

class Load{
      constructor(){
      }
      async init(start){
            let url = "http://localhost/dt";
            let data = {
                  include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  filter_id: "美食菜谱",
                  start : start
            };
            let res = await ajax(url,{data : data,dataType : "json"});
            Load.nextStart = res.data.next_start;
            return res.data.object_list;
      }

      static nextStart = 0;
}

export default new WaterFall();