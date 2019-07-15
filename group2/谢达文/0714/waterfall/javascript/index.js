
// 1. 渲染页面;
// - 获取数据
// - 拼接页面;

let { ajax   , $ , on } = Utils;


// class WaterFall{
//       constructor(){

//             this.init(0);
//       }
//       async init(){
//             this.wrapper     = $(".wrapper");
//             this.box_list    = this.wrapper.children;
//             console.log(this.box_list);
//             this.container  = $(".container")
//             let res = await this.loadDate(0);
//             // this.changContainer();
//             let timer = null;
//             on(window,"resize",()=>{
//                   clearTimeout(timer);
//                   timer = setTimeout(()=>{
//                         this.changContainer();
//                   },500)
//             })
//             this.render(res);
//             this.heightArray = [];
//             this.sort();
          
//       }
//       render(res){
//             let html = "";
            
//             for(var i = 0,item;item = res[i];i++){
//                   let scaleHeight = parseInt (235/item.photo.width*item.photo.height);
//                   html +=`  <div class="box">
//                   <div class="box-img" style = "height:${scaleHeight}px">
//                         <img src="${item.photo.path}" alt="">
//                         <u style = "height:${scaleHeight}px"></u>
//                   </div>
//                   <div class="box-detail">
//                         <div class="title">
//                               ${item.msg}
//                         </div>
//                   </div>
//             </div>`;
//             }
//             this.wrapper.innerHTML = html;
//       }
//       async loadDate(start){
//             let url = "http://localhost/dt";
//             let data = {
//                   include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
//                   filter_id: "手工DIY",
//                   start : start
//             }
//             let res =  await ajax(url,{data:data,dataType:"json"});
//             // console.log(res.data.object_list);
//             return (res.data.object_list);
//       }
//       sort(){
//             let box_list =  Array.from(this.box_list);
//             // console.log(box_list);
//             for(var i = 0,box;box = box_list[i];i++){
//                   if(i < this.count){
//                         this.heightArray.push(box.offsetHeight);
//                   }
//                   else{
//                         let min = Math.min.apply(false,this.heightArray);
//                         let minIndex = this.heightArray.indexOf(min);
//                         box.style.Position = "absolute";
//                         box.style.left     = minIndex * 250 + "px";
//                         box.style.top      = min + 20 + "px";  
//                         this.heightArray[minIndex] = box.offsetHeight + 20;
//                         }
//             }
//             console.log(this.heightArray);
//       }
//       changContainer(){
//             let cWidth = document.documentElement.clientWidth;
//             this.count = parseInt(cWidth / 250);
//             this.container.style.width = this.count * 250 + "px";
//       }
// }


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
          let res =  await new Load().init(0);
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
            
            this.wrapper.innerHTML = html;
      }
      sort(){
            // 区分 ;
            // 1. 第一排的;
            // 2. 其余的;
            let children = this.wrapper.children;
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

            this.container.style.height = maxHeight + "px";
            console.log(this.heightArray);
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
            return res.data.object_list;
      }
}

new WaterFall();