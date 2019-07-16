//获取数据
// 渲染页面
// 拼接页面
let {ajax,$,on} = Utils;
class Waterfall{
    constructor(){
        this.init();
        this.start = 0 ;
        this.wrapper = $(".wrapper");
        this.container = $(".container")
        this.count = 0;
        this.loading = false;
        this.cHeight     = document.documentElement.clientHeight;
    }
    async init(){
        //获取数据
        let res = await this.getData();
        //自适应宽度
        this.changeContainerWidth();
         // 窗口绑定事件
         let timer = null;
         on(window , "resize" ,()=>{
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.changeContainerWidth();
                this.sort();
                this.cHeight     = document.documentElement.clientHeight;
            },500)
        })
        // 无感加载
        on(window,"scroll",async()=>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
           if( !this.loading && scrollTop + this.cHeight >= this.minHeight - 300){
               console.log(1);
               this.loading = true ;
               let res = await this.getData();
               this.list = res.data.object_list;
               this.start =  res.data.next_start;
               this.render()
               this.sort();
               this.loading = false;
           }
        })
        this.start = res.data.next_start;
        this.list = res.data.object_list;
        // console.log(this.list);
        //渲染页面
        this.render();
        //排序
        this.sort();
        
    }
    async getData(){
        let url = "http://localhost/dt";
        let data = {
            include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id : "壁纸",
            start  : this.start,
        };
        let res =  await ajax(url,{
            data : data ,
            dataType : "json"
        })
        return res;
    }
    //数据处理

    render(){
       let html = "";
       for(let i = 0 ; i < this.list.length ; i ++){
           let scaleHeight = parseInt(235/this.list[i].photo.width * this.list[i].photo.height);
           html += 
           `<div class="box">
                <div class="box-img" style="height:${scaleHeight}px">
                    <img src="${this.list[i].photo.path}" alt="">
                    <u style="height:${scaleHeight}px"></u>
                </div>
                <div class="box-detail">
                    <div class="title">
                       ${this.list[i].msg}
                    </div>
                </div>
            </div>`
       }
       this.wrapper.innerHTML += html;
    }
    sort(){
        let children = this.wrapper.children;
        let heightArray = [];
        Array.from(children).forEach((box,index)=>{
            if(index < this.count){
                heightArray.push(box.offsetHeight);
                box.style.top = 0
                box.style.left = index * 250 + "px";
            }else{
                let min = Math.min.apply(false,heightArray);
                let minIndex = heightArray.indexOf(min);
                box.style.position ="absolute";
                box.style.left     = minIndex * 250 + "px";
                box.style.top      = min + 20 + "px";
                heightArray[minIndex] += box.offsetHeight + 20; 
            }
            this.maxHeight = Math.max.apply(false ,heightArray);
            this.minHeight = Math.min.apply(false ,heightArray);
            this.container.style.height = this.maxHeight + "px";
        })
    }
    changeContainerWidth(){
        let cWidth = document.documentElement.clientWidth;
        this.count = parseInt(cWidth / 250);
        this.container.style.width = this.count * 250 +"px";
    }
}
new Waterfall();
