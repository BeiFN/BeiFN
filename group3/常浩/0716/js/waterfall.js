class WaterFall{
      constructor(){
            this.init();
      }
      async init(){
          this.wrapper     = $(".wrapper")[0];
          this.container   = $(".container")[0];
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
          $(window).on("resize" , ()=>{
                  clearTimeout(timer);
                  timer = setTimeout( ()=>{
                        this.changeContainerWidth();
                        this.sort();
                        timer = null;
                        this.cHeight     = document.documentElement.clientHeight;
                  },500)
          })
          $(window).on("scroll" ,async ()=>{
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(!this.loading && scrollTop + this.cHeight >= this.containerHeight - 300){
                   this.loading = true;
                   // 加载;
                   let res =  await new Load().init(this.next_start);
                   this.next_start = Load.nextStart;
                   this.render(res);
                   this.sort();
                   // 加载结束要归零;
                   this.loading = false;
                }
          })
          let res =  await new Load().init(0);
          this.next_start = Load.nextStart;
          this.render(res);
          this.sort();
      }
      changeContainerWidth(){
          let cWidth = document.documentElement.clientWidth;
          this.count = parseInt(cWidth / 250);
          this.container.style.width = this.count * 250 + "px";  
      }
      render(list){    
            let html = "";
            for(var i = 0 ; i < list.length ; i ++){
                  let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
                  html += `<div class="box">
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
      sort(){
            // 区分 ;
            // 1. 第一排的;
            // 2. 其余的;
            let children = this.wrapper.children;
            // console.log(children);
            Array.from(children).forEach( (box , index) => {
                  if(index < this.count){
                        box.style.position = "static";
                        this.heightArray.push(box.offsetHeight);
                  }else{
                        // 找到数组之中最小的那一个;
                        let min = Math.min.apply(false, this.heightArray);
                        let minIndex = this.heightArray.indexOf(min);
                        // console.log(min , minIndex)
                        box.style.position = "absolute";
                        box.style.left     = minIndex * 250 + "px";
                        box.style.top      = min + 20 + "px";

                        this.heightArray[minIndex] += box.offsetHeight + 20;
                  }
            })

            let maxHeight = Math.max.apply(false , this.heightArray);
            let minHeight = Math.min.apply(false , this.heightArray);

            this.container.style.height = maxHeight + "px";
            this.containerHeight = minHeight;

            this.heightArray.length = 0;
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
            let res = await $.ajax(url,{data : data,dataType : "json"});
            Load.nextStart = res.data.next_start;
            return res.data.object_list;
      }

      static nextStart = 0;
}

new WaterFall();