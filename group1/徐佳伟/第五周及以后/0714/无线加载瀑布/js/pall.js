
// let {ajax , $,on} = Utils;
// class Pall{
//     constructor(){
//         this.init();
//     }
//     async init(){
//         this.wrapper = $(".wrapper");
//         this.container = $(".container");
//         //成功获取到了数据
//         this.res = await new Load().init(0);
       
//         //第一排显示多少个
//         this.count = 0;
//         this.heightArray = [];
//         this.changeContainerWidth();
//         this.timer = null;
//         on(window , "resize" , ()=>{
//             //我写得是节流
//             if(this.timer === null){
//                 this.timer = setTimeout(()=>{                   
//                     // console.log(1);
//                     this.changeContainerWidth();
//                     // this.render();
//                     this.sort();
//                     this.timer = null;
//                 },1000);
                
//             }
//         })
        
//         this.render();
//         this.sort();
//     }
//     changeContainerWidth(){
//         let cWidth = document.documentElement.clientWidth;
//         this.count = parseInt(cWidth / 250);
//         console.log(this.count);
//         this.container.style.width = this.count * 250 + "px";
//     }
//     render(){  
//         //这里我还是用的ejs模板写法
//         //将自适应高度通过<%%>加在了图片中
//         let template = `<%for(let i = 0 ; i < data.length ; i++ ){%>
//                         <%let scaleHeight = parseInt(235 / data[i].photo.width * data[i].photo.height);%>
//                             <div class="box">
//                                 <div class="box-img" style= "height : <%=scaleHeight%>px">
//                                     <img src="<%=data[i].photo.path%>" alt="">
//                                     <u style= "height :<%=scaleHeight%>px"></u>
//                                 </div>
//                                 <div class="box-detail">
//                                     <div class="title" style="height:<%=scaleHeight%> px">
//                                         <%=data[i].msg%> 
//                                     </div>
//                                 </div>
//                             </div>
//                         <%}%>`;
//          let html = ejs.render(template , {data : this.res});
//          this.wrapper.innerHTML = html;   
//     }
//     sort(){
//         //获取子元素
//         let children = this.wrapper.children;
//         Array.from(children).forEach((box , index)=>{
//             if(index < this.count){
//                 box.style.position = "static"
//                 this.heightArray.push(box.offsetHeight);
//             }else{
//                 console.log(this.heightArray)
//                 let min = Math.min.apply(false , this.heightArray);
//                 let minIndex = this.heightArray.indexOf(min);
//                 // console.log(min,minIndex);
//                 box.style.position = "absolute";
//                 box.style.left = minIndex * 250 + "px";
//                 box.style.top = min + 20 + "px";

//                 this.heightArray[minIndex] += box.offsetHeight + 20;
//             }            
//         })
//         //这两行代码也就是设置最大高度，刚好能显示出所有的box
//         let max = Math.max.apply(false , this.heightArray);
//         this.container.style.height = max + "px";
//         //设置完后记得清空数组,否则会影响下一轮的排序xc
//         this.heightArray.length = 0;
//     }   
// }

// class Load{
//     constructor(){
//     }
//     async init(start){
//           let url = "http://localhost/dt";
//           let data = {
//                 include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
//                 filter_id: "手工DIY",
//                 start : start
//           };
//           let res = await ajax(url,{data : data,dataType : "json"});
//           return res.data.object_list;
//     }
// }
// new Pall();
// // class Load{
// //     constructor(){
        
// //     }
// //     async init({
// //         url = "",  
// //         data = {},
// //         type = "GET",
// //         dataType = "json"
// //     }={}){
// //         this.url = url;
// //         this.data = data;
// //         this.type = type;
// //         this.dataType = dataType;
// //         this.res = await this.loadData();
// //         console.log(this.res);
// //     }
// //     async loadData(){
// //         let res = await ajax(this.url,{data : this.data,type : this.type,dataType : this.dataType})
// //         return res.data.object_list;
// //     }
    
// // }
// // new Load().init({
// //     url  : "http://localhost/dt" ,
// //     data : {
// //         include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
// //         filter_id: "美食菜谱",
// //         start : 100
// //     }
// // })


let {ajax , $ ,on} = Utils;
class Pall{
    constructor(){
        this.init();
    }
    async init(){
        this.wrapper = $(".wrapper");
        this.container = $(".container");
        //加载数据的起始点
        this.start = 1;
        //当前显示的条数
        this.count = 0 ;
        //存入第一行盒子的高度
        this.heightArray = [];
        //当前页面的最大高度
        this.maxHeight = 0;
        //延时器
        this.timer = null;
        //获取数据
        this.data = await new Load().init(this.start);
        console.log(this.data);
        //改变container宽度
        this.changeContainerWidth();
        on(window , "resize" , ()=>{
            //防止抖动
            clearTimeout(this,this.timer);
            this.timer = setTimeout(()=>{
                this.changeContainerWidth();
                // this.render();
                this.sort();
                this.timer = null;
            },800)
        })
        //进行页面渲染
        this.render();
        this.sort();
        //获取当前窗口的高度
        this.cHeight = document.documentElement.clientHeight;
        //无线加载数据
        document.onscroll = function(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;     
            this.loadData(scrollTop);
        }.bind(this);
        
    }
    async loadData(scrollTop){ 
        console.log(scrollTop,this.maxHeight -this.cHeight); 
        if(scrollTop > this.maxHeight -this.cHeight ){
            let res = await new Load().init(this.start ++);
            for (let i = 0 ; i < res.length ; i++){
                this.data.push(res[i]);
            }
            this.render();
            this.sort();
        }
    }
    changeContainerWidth(){
        let cWidth = document.documentElement.clientWidth;
        //实时获取窗体的总条数
        this.count = parseInt(cWidth / 250);
        //根据总条数改变container宽度
        this.container.style.width = this.count * 250 + "px";
    }
    render(){
        let html = "";
        for(let i = 0 ; i < this.data.length ; i++){
            let boxHeight = parseInt(235/ this.data[i].photo.width * this.data[i].photo.height);
            html += `<div class="box">
                            <div class="box-img" style = "height:${boxHeight}px">
                                <img src="${this.data[i].photo.path}" alt="">
                                <u style = "height:${boxHeight}px"></u>
                            </div>
                            <div class="box-detail">
                                <div class="title">
                                    ${this.data[i].msg}
                                </div>
                            </div>
                    </div>`;
        }
        this.wrapper.innerHTML = html;
    }
    sort(){
        let children = this.wrapper.children;
        Array.from(children).forEach((box,index)=>{
            if(index < this.count){
                this.heightArray.push(box.offsetHeight);
                box.style.position = "static";
            }else{
                let min  = Math.min.apply(false , this.heightArray);
                let minIndex = this.heightArray.indexOf(min);
                
                box.style.position = "absolute";
                box.style.left = minIndex * 250 + "px";
                box.style.top  = min + 20 + "px";
                this.heightArray[minIndex] += box.offsetHeight + 20 ;
            }
        })
        //设置窗体的最大高度
        this.maxHeight = Math.max.apply(false , this.heightArray)
        this.container.style.height = this.maxHeight + "px";
        //清空数组
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
                  filter_id: "手工DIY",
                  start : start
            };
            let res = await ajax(url,{data : data , dataType : "json"});
            return res.data.object_list;
      }

}
new Pall();
