
// 1. 渲染页面;
// - 获取数据
// - 拼接页面;

let { ajax   , $ , on } = Utils;

class WaterFall{
      constructor(){
            // 引用init()
            this.init();
      }


      async init(){
            // 获取属性
          this.template    = $("#template");
          this.wrapper     = $(".wrapper");
          this.container   = $(".container");
          // 第一排能放下多少个元素;
          this.count       = 0;
      //     定义一个数组，存储高度
          this.heightArray = [];
          this.changeContainerWidth();
          let timer = null;
      //   事件监听    
          on(window , "resize" , ()=>{
            //     页面去抖
            
                  clearTimeout(timer);  //每次进来之前先清空一下，再继续执行
                  timer = setTimeout( ()=>{
                        this.changeContainerWidth();
                        timer = null;
                        // 定时器每隔500ms执行一次，500ms不到，不能执行resize事件，所以需要清空timer
                  },500)
                  //定时器每隔500ms执行一次
                  // console.log(timer);
                  // console.log(1);
          })
 
          let res =  await new Load().init(0);
                                    //   init(start)   start默认为0
      //     load的init里的res在底下
          this.render(res);
      //     调用的是load的init

          this.sort();
      }



      // 根据屏幕宽度自适应图片张数
      changeContainerWidth(){
            // 获取屏幕宽度
          let cWidth = document.documentElement.clientWidth;
      //     一张图片宽度250px，用变量count来记录不同的屏幕可以放下多少张图片
          this.count = parseInt(cWidth / 250);
            // container的宽度 = 图片的张数 * 图片的宽度
          this.container.style.width = this.count * 250 + "px";     //???
      }
//   页面渲染
      render(list){    
            let html = "";
            for(var i = 0 ; i < list.length ; i ++){
                  // 等比例的高度  比值-> 235 / list[i].photo.width   宽的比值      根据宽度的比值可以算出对应的比例值   图片本身的高度乘以比例值，就可以算出相应的高度  
                  let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
                  // 字符串模板
                  //  图片只是定宽不定高，图片的高度是个变量
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

//      排列
// 因为浮动，图片上下没有间距，每个元素按照最后一个元素的高度，从右往左排列，排列的时候，碰到较高的高度时，元素就卡在那里不会动了
      sort(){
            // 区分 ;
            // 1. 第一排的;
            // 2. 其余的;

            // 找到所有元素
            let children = this.wrapper.children;
            // console.log(children);
            // Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
            // array.forEach(function(currentValue, index, arr), thisValue)
            Array.from(children).forEach( (box , index) => {
                  if(index < this.count){//第一排
                        // console.log("第一排" , box);
                        // offsetHeight      //返回元素的高度（包括元素高度、内边距和边框，不包括外边距）   
                        // 把box.offsetHeight放入HeightArray数组
                        this.heightArray.push(box.offsetHeight);
                  }else{//其余
                        //比对 找到数组之中最小的那一个;
                        // Math.min 可以实现得到数组中最小的一项
                       
                        let min = Math.min.apply(false, this.heightArray);
                                                //   this   参数
                        //    minIndex   最小值下标    
                        // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。                
                        let minIndex = this.heightArray.indexOf(min);
                        // console.log(min , minIndex)
                        //知道第一排的最小值元素之后，就可以把第二排的元素进行拼接了
                        //  通过定位 把元素定位到相应位置
                        box.style.position = "absolute";
                        box.style.left     = minIndex * 250 + "px";
                        box.style.top      = min + 20 + "px";
                                
                        //  最小值
                        this.heightArray[minIndex] += box.offsetHeight + 20;   //修改样式。使元素排列更加美观
                  }
            })
            // Math.max.apply可以获得数组里面最大的值。
            // 取出最大的高度
            let maxHeight = Math.max.apply(false , this.heightArray);

            //   给container添加最大的高度元素
            this.container.style.height = maxHeight + "px";
            console.log(this.heightArray);
      }
}

// 从堆糖获取数据
class Load{ 
      constructor(){
      }
      // start是一个很重要的形参
      async init(start){
            // 域名
            let url = "http://localhost/dt";
            // 传入的数值
            let data = {
                  include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  filter_id: "植物多肉",
                  start : start   //默认从0开始查询
            };
            let res = await ajax(url,{data : data,dataType : "json"});//dataType : "json" 转换成json格式
            
          
            return res.data.object_list;   // start  -> list
            
      }
}

new WaterFall();