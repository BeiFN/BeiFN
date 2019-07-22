


//  滚轮向下滚动滚动到一定程度的时候就加载数据。
//  一定程度 => 机器无法分别 ; 自己定义逻辑;
// 
function WaterFall(){}
$.extend(WaterFall.prototype , {
      init : function(){
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
          var timer = null;

          $(window).on( "resize" , $.proxy(function(){
                  clearTimeout(timer);
                  timer = setTimeout( $.proxy(function(){
                        this.changeContainerWidth();
                        this.sort();
                        timer = null;
                        this.cHeight     = document.documentElement.clientHeight;
                  },this),500)
          },this))

          $(window).on( "scroll" ,$.proxy(function(){

            let scrollTop = $("body,html").scrollTop();

            if(!this.loading && scrollTop + this.cHeight >= this.containerHeight - 300){
               this.loading = true;
               // 加载;
               this.next_start += 25;
               
               var res = new Load().init(this.next_start);
               res.done($.proxy(function(res){
                     res = res.data.object_list;
                     this.render(res);
                     this.sort();
                     // 加载结束要归零;
                     this.loading = false;

               },this))
            }
      },this))

          var res = new Load().init(20);
          res.then($.proxy(function(res){
                res = res.data.object_list;             
                this.render(res);
                this.sort();
          },this))
      },
      changeContainerWidth : function(){
          var cWidth = document.documentElement.clientWidth;
          this.count = parseInt(cWidth / 250);
          this.container.width(this.count * 250);  
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
            
            this.wrapper.html(html) ;
      },
      sort : function(){
              // 区分 ;
            // 1. 第一排的;
            // 2. 其余的;


            var children = this.wrapper.find(".box");
            children = children.toArray();            
            $.each(children , $.proxy(function(index,item){
                  if(index < this.count){
                        $(item).css("position","static");
                        // console.log(item.height());
                        this.heightArray.push($(item).height());
                  }else{
                        var min = Math.min.apply(false,this.heightArray);
                        var minIndex = this.heightArray.indexOf(min);
                        $(item).css({
                              "position" : "absolute",
                              left : minIndex*250,
                              top : min +20
                        })
                        this.heightArray[minIndex] += $(item).height() + 20;
                  }
            },this))
            var maxHeight = Math.max.apply(false , this.heightArray);
            var minHeight = Math.min.apply(false , this.heightArray);

            this.container.height( maxHeight);
            this.containerHeight = minHeight;

            this.heightArray.length = 0;
        
      }
})
// class WaterFall{
      // constructor(){
      //       this.init();
      // }
      // async init(){
          
      // }
      // changeContainerWidth(){
      //     let cWidth = document.documentElement.clientWidth;
      //     this.count = parseInt(cWidth / 250);
      //     this.container.style.width = this.count * 250 + "px";  
      // }
      // render(list){    
      //       let html = "";
      //       for(var i = 0 ; i < list.length ; i ++){
      //             let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
      //             html += `<div class="box">
      //                         <div class="box-img" style="height:${scaleHeight}px">
      //                               <img src="${list[i].photo.path}" alt="">
      //                               <u style="height:${scaleHeight}px"></u>
      //                         </div>
      //                         <div class="box-detail">
      //                               <div class="title">
      //                                     ${list[i].msg}
      //                               </div>
      //                         </div>
      //                   </div>`
      //       }      
            
      //       this.wrapper.innerHTML += html;
      // }
//       sort(){
//             // 区分 ;
//             // 1. 第一排的;
//             // 2. 其余的;
//             let children = this.wrapper.children;
//             // console.log(children);
//             Array.from(children).forEach( (box , index) => {
//                   if(index < this.count){
//                         box.style.position = "static";
                        
//                         this.heightArray.push(box.offsetHeight);
//                   }else{
//                         // 找到数组之中最小的那一个;
//                         let min = Math.min.apply(false, this.heightArray);
//                         let minIndex = this.heightArray.indexOf(min);
//                         // console.log(min , minIndex)
//                         box.style.position = "absolute";
//                         box.style.left     = minIndex * 250 + "px";
//                         box.style.top      = min + 20 + "px";

//                         this.heightArray[minIndex] += box.offsetHeight + 20;
//                   }
//             })

//             let maxHeight = Math.max.apply(false , this.heightArray);
//             let minHeight = Math.min.apply(false , this.heightArray);

//             this.container.style.height = maxHeight + "px";
//             this.containerHeight = minHeight;

//             this.heightArray.length = 0;
//       }
// }
function Load(){}
$.extend(Load.prototype ,{
      init :function(start){         
            var url = "http://localhost/dt";
            var data = {
                  include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  filter_id: "美食菜谱",
                  start : start
            };
            return $.ajax(url,{data : data,dataType : "json"});           
      }
      // nextStart : function(){
      //       return 0;
      // }
})
// class Load{
//       constructor(){
//       }
//       async init(start){
//             let url = "http://localhost/dt";
//             let data = {
//                   include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
//                   filter_id: "美食菜谱",
//                   start : start
//             };
//             let res = await ajax(url,{data : data,dataType : "json"});
//             Load.nextStart = res.data.next_start;
//             return res.data.object_list;
//       }

//       static nextStart = 0;
// }

new WaterFall().init();