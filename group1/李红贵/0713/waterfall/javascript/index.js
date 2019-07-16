
// 1. 渲染页面;
// - 获取数据
// - 拼接页面;

let { ajax   , $ , on } = Utils;

class WaterFall{
      constructor(){
            this.init();
      }
      async init(){
          this.template    = $("#template");
          this.wrapper     = $(".wrapper");
          this.container   = $(".container");
          // 第一排能放下多少个元素;
          this.count       = 0;
          this.heightArray = [];//高度数组
          this.changeContainerWidth();
          let timer = null;
          on(window , "resize" , ()=>{
                  clearTimeout(timer);
                  timer = setTimeout( ()=>{
                        this.changeContainerWidth();
                        timer = null;
                  },300)
          })
      //     防抖：改变结束后再调用
      //     节流：增加调用间隔时间，
      //     获取数据源
          let res =  await new Load().init(0);
          this.render(res);

          this.sort();
      }
      //宽度改变
      changeContainerWidth(){

            let cWidth = document.documentElement.clientWidth;
            this.count = parseInt(cWidth / 250);//每行显示图片数
            console.log(this.count);
            //     图片父视图宽度改变
            this.container.style.width = this.count * 250 + "px";  
      
            // //重新排序
             this.sort();
      }

      render(list){    
            let html = "";
            for(var i = 0 ; i < list.length ; i ++){
                  //图片显示高度计算
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
            
            this.wrapper.innerHTML = html;
      }
      sort(){
            let children = this.wrapper.children;
            console.log(children,this.count);
            this.heightArray=[];
            Array.from(children).forEach( (box , index) => {
                  
                  if(index < this.count){
                        console.log(box,index);
                        // console.log("第一排" , box);
                        box.style.position = "static";
                        box.style.top      = 0;
                        this.heightArray.push(box.offsetHeight);
                        console.log(this.heightArray);
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

            this.container.style.height = maxHeight + "px";
            console.log(this.heightArray);
      }
}

//数据请求
class Load{
      constructor(){
      }
      async init(start){
            let url = "http://localhost/dt";
            let data = {//接口参数
                  include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  // filter_id: "美食菜谱",
                  filter_id: "手工DIY",
                  start : start
            };
            let res = await ajax(url,{data : data,dataType : "json"});
            // 返回图片数据数组
            return res.data.object_list;
      }
}

new WaterFall();