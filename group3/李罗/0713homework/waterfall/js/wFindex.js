//渲染页面
//获取数据
//拼接页面

let {ajax, $,on}=Utils;

class WaterFall{
    constructor(){
        this.init();
    }
    async init(){
        this.template=$("#template");
        this.wrapper=$(".wrapper");
        this.container=$(".container");

        //第一排可以放多少元素
        //初始化为0
        this.count=0;
        //把图片的高度存在数组
        this.heightArray=[];
        //改变页面大小
        this.changeContainerWidth();
        let timer=null;
        on(window, "resize",()=>{
            clearTimeout(timer);
            timer=setTimeout(() => {
                this.changeContainerWidth();
                timer=null;
            }, 500);
        })
        let res=await new Load().init(0);
        this.render(res);

        this.sort();
    }
    changeContainerWidth(){
        let cWidth=document.documentElement.clientWidth;
        this.count=parseInt(cWidth/250);
        this.container.style.width=this.count*250 +"px";
    }
    render(list){
        let html="";
        for(var i=0;i<list.length;i++){
           let scaleHeight=parseInt(235/list[i].photo.width*list[i].photo.height); //等比例
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
        this.wrapper.innerHTML=html;
    }
    sort(){
        //区分：第一排和其他的
        //这个wrapper里面有多少张图片
        let children=this.wrapper.children;
        //遍历出每个盒子以及他们的下标
        Array.from(children).forEach((box,index)=>{
            //把每个盒子的下标放进数组中
            this.heightArray.push(box.offsetHeight);
            //如果下标比第一排中放的图片个数小
            if(index<this.count){
                // console.log("这是第一排");
                //把里面图片的盒子的高度放入数组
                this.heightArray.push(box.offsetHeight);
            }else{
                //找到数组中最小的那个
                let min = Math.min.apply(false,this.heightArray);
                //找到下标
                let minIndex = this.heightArray.indexOf(min);
                // console.log(min,minIndex);
                box.style.position="absolute";
                box.style.left=minIndex*250+"px";
                box.style.top=min + 20 +"px";
                this.heightArray[minIndex] += box.offsetHeight+20;
            }
        })
        //找出数组中最大的那个
        let maxHeight=Math.max.apply(false,this.heightArray);
        this.container.style.height=maxHeight+"px";
        console.log(this.heightArray);
    }
}

// class Load{
//     constructor(){

//     }
//     async init(start){
//         let url ="http://localhost/dt";
//         let data={
//             kw:"陈情令",
//             type:"feed",
//             include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
//             filter_id:"",
//             _type: "=",
//             start: start,
//             _:Date.now()
//         };
//         let res=await ajax(url,{
//             data:data,dataType:"jsonp"
//         });
//         return res.data.object_list;
//     }
// }

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