let {ajax,$,on} = Utils;
class WaterFall{
      constructor(){
            this.init();
      }

      //渲染数据
      async init(){
            this.template = $("#template")
            this.wrapper = $(".wrapper")
            this.container = $(".container")
            this.next_start = 0;
            //是否要加载
            this.loading = false;
            this.cHeight = document.documentElement.clientHeight;
            this.heightArray = [];
            //表示第一排能放多少个
            this.count = 0
            this.changeContainerWidth();
            let timer = null;
            on(window, "resize", () => {
                  clearTimeout(timer)
                  timer = setTimeout(() => {
                        this.changeContainerWidth();
                        this.sort();
                        timer =null;
                        this.cHeight     = document.documentElement.clientHeight;
                  },500)

            })
            on(window, "scroll", async () => {
                  let scrollTop = document.documentElement.scrollTop;
                  if (!this.loading && scrollTop + this.cHeight >= this.containerHeight - 800) {
                        this.loading = true;
                        console.log("该加载了")
                        //加载
                        let res = await new Load().init(this.next_start);
                        // console.log(res)
                        this.next_strat = Load.nextStart
                        this.render(res);
                        this.sort();
                        this.loading = false;


                  }
            })
            let res = await new Load().init(0);
            //console.log(res)
            this.next_start = Load.nextStart;
            this.render(res);
            this.sort();

      }
      changeContainerWidth(){
            let cWidth = document.documentElement.clientWidth;
            this.count =parseInt(cWidth/250);
            this.container.style.width = this.count *250+"px";
      }
      sort(){
            let children = this.wrapper.children;
           // console.log(children)
            Array.from(children).forEach((box,index)=>{
                  if(index<this.count)
                        {
                             this.heightArray.push(box.offsetHeight)
                        }
                  else{
                        let min = Math.min.apply(false,this.heightArray);
                        let minIndex = this.heightArray.indexOf(min)
                        // console.log(min,minIndex)
                        box.style.position = "absolute";
                        box.style.left = minIndex*250+"px";
                        box.style.top = min+"px"
                        //console.log(box.offsetParent)
                        this.heightArray[minIndex] += box.offsetHeight 
                  }
            })
            let maxHeight = Math.max.apply(false,this.heightArray)
            let minHeight = Math.max.apply(false,this.heightArray)
            this.container.style.height=maxHeight+"px";
            this.containerHeight =minHeight;
            this.heightArray.length = 0;

      }
      render(list){
          let html ="";
          
           for(var i = 0; i < list.length ; i++)
            {
             let scaleHeight = parseInt(235/list[i].photo.width*list[i].photo.height);
             html+=` <div class="box">
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
             this.wrapper.innerHTML +=html;
            
      }

}
class Load{
      constructor(){

      }
      async init(start){
            let url = "http://localhost/dt";
            let data ={
                  include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  filter_id: "美食菜谱",
                  start : start
            }
            //console.log( ajax(url,{data:data,dataType:"json"}))
            let res =  await ajax(url,{data:data,dataType:"json"});
            // console.log(res)
            // console.log(res.data.object_list)
            Load.next_start = res.data.next_strat;
            return res.data.object_list;
            
      }
      static nextStart = 0;
}
new WaterFall();