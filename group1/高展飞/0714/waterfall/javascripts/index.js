//1.渲染页面
// -获取数据
// -拼接页面
let  { ajax , $ , on } = Utils;
class WaterFall{
    constructor(){
        this.init();
    }
    async init (){
        this.template  = $("#template");
        this.wrapper   = $(".wrapper");
        this.container = $(".container");
        //第一排能放下多少元素；
        this.count  = 0;
        this.heightArray  = [];
        this.changeContainerWidth();
        let timer = null;
        //事件委托
        on (window ,"resize" , ()=>{
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.changeContainerWidth();
                timer = null;
            },500)
        });
        let res  = await  new  Load().init(0);
        this.render(res);
        this.sort();
    }
    changeContainerWidth(){
        let cWidth = document.documentElement.clientWidth;
        this.count = parseInt(cWidth / 250);
        this.container.style.width = this.count * 250 + "px";
    }
    render (list){
        let html = "";
        for (var i = 0 ; i < list.length ; i++){
            let scaleHeight = parseInt(235/list[i].photo.width * list[i].photo.height);
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
        //区分第一排  和其余的
        let children = this.wrapper.children;
        Array.from(children).forEach((box ,index)=>{
            if(index < this.count){
                this.heightArray.push(box.offsetHeight);
            }else{
                let min = Math.min.apply(false ,this.heightArray);
                let minIndex = this.heightArray.indexOf(min);

                box.style.position = "absolute";
                box.style.left = minIndex * 250 + "px";
                box.style.top = min + 20 + "px";
                this.heightArray[minIndex] += box.offsetHeight + 20;
            }
        })
        let maxHeight = Math.max.apply (false , this.heightArray);
        this.container.style.height = maxHeight + "px";
    }
}
class Load{
    constructor(){

    }
    async init (start){
        let url = "";
        let data = {
            include_fields :"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id :"美食菜谱",
            start : start
        };
        let res = await  ajax(url ,{data : data,dataType : "json"});
        return res.data.object_list;
    }
}
new  WaterFall();