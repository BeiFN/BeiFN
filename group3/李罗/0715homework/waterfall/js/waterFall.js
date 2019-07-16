let { ajax, on, $}=Utils;

//加载数据，
//渲染页面
//滚轮向下滑动一定程度就加载数据；这个一定程度是自己定义的，在初始状态时把图片设置成为加载中，要显示那个，哪个图片才会发送请求；

class WaterFall{
    constructor(){
        this.init();
    }
    async init(){
        //选择元素
        this.template=$("#template");
        this.wrapper=$(".wrapper");
        this.container=$(".container");
        //屏幕的高度
        this.cHeight = document.documentElement.clientHeight;
        //设置一个标志就是看它是否在加载
        this.loading=false;
        //下一次从哪里加载
        this.next_start=0;
        //第一排能够放几张图片
        this.count=0;
        //每个图片的高度放进数组
        this.heightArray=[];
        //改变屏幕大小
        this.changeContainerWidth();
        let timer=null;
        on(window,"resize",()=>{
            clearTimeout(timer);
            timer=setTimeout(() => {
                this.changeContainerWidth();
                //排序
                this.sort();
                timer=null;
                this.cHeight=document.documentElement.clientHeight;
            }, 500);
        })

        //滚动
        on(window,"scroll",async ()=>{
            let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            //如果现在已经不再加载并且上面的高度加上页面的高度大于等于，开始加载
            if(!this.loading&&scrollTop+this.cHeight>=this.containerHeight-300){
                this.loading=true;
                //加载
                let res=await new Load().init(this.next_start);
                this.next_start=Load.nextStart;
                this.render(res);
                this.sort();
                //加载完数据要归0
                this.loading=false;
            }
        })
        let res= await new Load().init(0);
        this.next_start=Load.nextStart;
        this.render(res);
        this.sort();

    }
    changeContainerWidth(){
        let cWidth=document.documentElement.clientWidth;
        this.count=parseInt(cWidth/250);
        this.container.style.width=this.count*250+"px";
    }
    render(list){
        let  html="";
        
        for(var i=0;i<list.length;i++){
            let scaleHeight=parseInt(235/list[i].photo.width*list[i].photo.height);
            html +=  `<div class="box">
                <div class="box-img">
                    <img src=" ${list[i].photo.path}" alt="">
                    <u style="height:${scaleHeight}px"></u>
                </div>
                <div class="box-detail">
                    <div class="title"> 
                     ${list[i].msg}
                    </div>
                </div>
            </div>
            `
        }
        this.wrapper.innerHTML +=html;
    }
    sort(){
        //排序，区分那个是第一排还是其他
        let children=this.wrapper.children;
        Array.from(children).forEach((box,index)=>{
            if(index<this.count){
                // console.log("这是第一排的");
                box.style.position="static";
                this.heightArray.push(box.offsetHeigt);
            }else{
                //找到数组中最小的
                let min = Math.min.apply(false,this.heightArray);
                let minindex=this.heightArray.indexOf(min);
                box.style.position="absloute";
                box.style.left=minindex*250+"px";
                box.style.top=min+20+"px";

                this.heightArray[minindex]+=box.offsetHeigt+20;
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
          let res = await ajax(url,{data : data,dataType : "json"});
          Load.nextStart = res.data.next_start;
          return res.data.object_list;
    }

    static nextStart = 0;
}

new WaterFall();