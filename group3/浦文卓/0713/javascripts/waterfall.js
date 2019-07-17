

let {$ , ajax , on } = Utils;
class Waterfall{
    constructor(){

        this.init();
    }
    async init(){
        this.wrapper = $(".wrapper");
        this.container = $(".container");
        this.count = 0;
        this.heightArray = [];

        this.changeContainerSize();
        on(window,"resize",() => {
            // console.log(1);
            this.changeContainerSize()
        })

        

        this.res = await this.loadData();
        this.render();
        this.sort();
        // console.log(this.res);
    }
    //加载数据
    async loadData(){
        let url = "http://localhost/dt";
        // https://www.duitang.com/napi/blog/list/by_filter_id/?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count&filter_id=%E6%89%8B%E5%B7%A5DIY&start=24&_=1563109833471
        let data = {
            include_fields : "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id : "手工DIY",
            start : 24,
            _ : 1563109833471
        }
        let res = await ajax(url,{
            data : data,
            dataType : "json"
        });
        // console.log(sres);
        return res;
    }
    //渲染页面
    render(){
        let data = this.res.data.object_list;
        // console.log(data);
        let html = "";
        
        for(let i = 0 ; i < data.length ; i ++){
            let scaleHeight = 235 / data[i].photo.width * data[i].photo.height;
            html += `<div class="box">
                        <div class="box-img" style="height:${scaleHeight}px">
                            <img src="${data[i].photo.path}" alt="">
                            <u style="height:${scaleHeight}px"></u>
                        </div>
                        <div class="box-detail">
                            <div class="title">
                                ${data[i].msg}
                            </div>
                        </div>
                    </div>`
        }
        this.wrapper.innerHTML = html;
    }
    //改变窗口大小
    changeContainerSize(){
        let cWidth = document.documentElement.clientWidth;
        this.count = parseInt(cWidth / 250);
        this.container.style.width = this.count * 250 +"px";
    }

    //排列
    sort(){
        let children = this.wrapper.children;
        // console.log(this.box);
        Array.from(children).forEach((box,index) => {
            if(index <= this.count){
                // console.log(1,box);
                this.heightArray.push(box.offsetHeight);
            }else{
                // console.log(2,box);
                let min = Math.min.apply(false,this.heightArray);
                let minIndex = this.heightArray.indexOf(min);
                box.style.position = "absolute";
                box.style.left = minIndex * 250 + "px";
                box.style.top = min + 20 + "px";

                this.heightArray[minIndex] += box.offsetHeight + 20;
            }
        })
        let maxHeight = Math.max.apply(false , this.heightArray);
        this.container.style.height = maxHeight + "px";
        // console.log(this.heightArray);
    }
}

    

new Waterfall();