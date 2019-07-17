
// 1. 渲染页面;
// - 获取数据
// - 拼接页面;

let { on } = Utils;
function WaterFall(){
      this.init();
}

$.extend(WaterFall.prototype,{
      init : async  function(){
          this.template    = $("#template");
          this.wrapper     = $(".wrapper");
         // console.log(this.wrapper[0]);
          this.container   = $(".container");
          // 第一排能放下多少个元素;
          this.count       = 0;
          this.heightArray = [];
          this.changeContainerWidth();
          let timer = null;
          on(window , "resize" , ()=>{
                  clearTimeout(timer);
                  timer = setTimeout( ()=>{
                        this.changeContainerWidth();
                        timer = null;
                  },500)
          })
          let res =  await new Load().init();
          this.render(res);

          this.sort();
      },
      changeContainerWidth : function(){
          let cWidth = document.documentElement.clientWidth;
          this.count = parseInt(cWidth / 250);
          this.container[0].style.width = this.count * 250 + "px";  
      },

      render : function(list){    
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
            
            this.wrapper[0].innerHTML = html;
      },
      sort : function(){
            // 区分 ;
            // 1. 第一排的;
            // 2. 其余的;
            let children = this.wrapper[0].children;
            // console.log(children);
            Array.from(children).forEach( (box , index) => {
                  if(index < this.count){
                        // console.log("第一排" , box);
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

            this.container[0].style.height = maxHeight + "px";
            console.log(this.heightArray);
      }
})

function Load(){
      this.init();
}
$.extend(Load.prototype,{
       init : async function(start){
            let url = "http://localhost/dt";
            let data = {
                  include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  filter_id: "美食菜谱",
                  start : start
            };
            let res = await $.ajax(url,{data : data,dataType : "json"});
            return res.data.object_list;
      }
})

new WaterFall();