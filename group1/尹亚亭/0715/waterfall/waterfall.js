let {ajax , $ , on} = Utils;

class Waterfall{
    constructor(){
        this.init();
    }
    async init(){
        this.template    = $("#template");
        this.wrapper     = $(".wrapper");
        this.container   = $(".container");
        // 屏幕高度
        this.cHeight = document.documentElement.clientHeight;
        //是否加载
        this.loading =  false;
        // 下一次加载的地方
        this.next_start = 0;
        this.count       = 0;
        this.heightArray = [];
        let timer = null;
        // 容器的宽度发生改变
        this.changeContainerWidth();
        // 事件绑定
        on(window , "resize" , ()=>{
            clearTimeout(timer);
            timer = setTimeout( ()=>{
                  this.changeContainerWidth();
                  // 排列
                  this.sort();
                  timer = null;
                  // 高度
                  this.cHeight = document.documentElement.clientHeight;
            },500)
        })
        // 窗口scroll
        on(window , "scroll" , async () =>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (!this.loading && screenTop + this.cHeight >= this.containerHeight - 300) {
                this.loading = true;
                //加载
                let res =  await new Load().init(this.next_start);
                this.next_start = Load.nextStart;
                this.render(res);
                this.sort();
                this.loading = false;   //归零
            }
        })
        let res =  await new Load().init(0);
        // 下一次加载的地方
        this.next_start = Load.nextStart;
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
        for (var i = 0; i < list.length; i++) {
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
        this.wrapper.innerHTML += html;
    }

    sort(){
        let children = this.wrapper.children;
        Array.from(children).forEach( (box , index) => {
            if(index < this.count){
                // Debug第一行的显示问题
                box.style.position = "static";
                this.heightArray.push(box.offsetHeight);
            }else{
                let min = Math.min.apply(false, this.heightArray);
                let minIndex = this.heightArray.indexOf(min);
                box.style.position = "absolute";
                box.style.left     = minIndex * 250 + "px";
                box.style.top      = min + 20 + "px";
                this.heightArray[minIndex] += box.offsetHeight + 20;
            }
        })
        let maxHeight = Math.max.apply(false , this.heightArray);
        let minHeight = Math.min.apply(false , this.heightArray);
        this.container.style.height = maxHeight + "px";
        //  
        this.containerHeight = minHeight;
        //
        this.heightArray.length = 0;
    }
}

// 
class Load{
    constructor(){

    }
    async init(start){
        let url = "http://localhost/dt";
        let data = {
            include_fields : "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id : "美食菜谱",
            start : start
        };
        let res = await ajax(url,{data:data,dataType:"json"});
        Load.nextStart = res.data.next_start;
        return res.data.object_list;
    }

    static nextStart = 0;
}

new Waterfall();