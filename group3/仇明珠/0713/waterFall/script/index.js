let { ajax, $, on } = Utils;
class WaterFall {
    constructor() {
        this.cWidth=document.documentElement.clientWidth;
        this.main=$(".wrapper");
        this.init();
    }
    async init() {
        this.data = await this.loadData(0);
        this.count=parseInt(this.cWidth/250);
        this.heightArr=[];
        this.render(this.data);
        // this.sort();
    }
    async loadData(start) {
        let url = "http://localhost/dt";
        let data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "美食菜谱",
            start: start
        };
        let res = await ajax(url, { data: data, dataType: "json" });
        console.log(res.data.object_list);
        return res.data.object_list;
    }
    render(data){
        let html='';    
        for(let i=0;i<data.length;i++){
            let rateHeight=parseInt(235/data[i].photo.width*data[i].photo.height);
            html+=`<div class="box">
                        <div class="box-img" style="height:${rateHeight}px">
                              <img src=${data[i].photo.path} alt="">
                              <u style="height:${rateHeight}px"></u>
                        </div>
                        <div class="box-detail">
                              <div class="title">
                              ${data[i].msg}
                              </div>
                        </div>
                  </div>`
        }
        this.main.innerHTML=html;
    }
    // sort(){
    //     let children=this.main.children;
    //     Array.from(children).forEach((item,index)=>{
    //         if(index+1<this.count){
    //             this.heightArr.push(item.offsetHeight);
    //         }else{
    //             let min = Math.min.apply(false, this.heightArr);
    //             let minIndex = this.heightArr.indexOf(min);
    //             item.style.position = "absolute";
    //             item.style.left     = minIndex * 250 + "px";
    //             item.style.top      = min + 20 + "px";
    //             this.heightArr[minIndex] += item.offsetHeight + 20;
    //         }
    //         console.log(index,item);
    //     })
    // }
}
new WaterFall();