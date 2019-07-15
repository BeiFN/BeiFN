let {ajax , $ ,  on} = Utils;
class WaterFall{
    constructor(){
        this.init();
    }
    async init(){
        this.template   = $("#template");
        this.wrapper    = $(".wrapper");
        this.container  = $(".container");
        //第一排能放下多少个元素
        this.count   = 0;
        this.changeContainWidth();
        let timer = null;
        on(window , "resize" , () =>{
            clearTimeout(timer);
            timer = setTimeout( ()=> {
                this.changeContainWidth();
                timer = null;
            } , 500)
        }) 
        let res = await new Load().init(0);
        this.render(res);

        this.sort();
    }
    changeContainWidth(){
        let cWidth = document.documentElement.clientWidth;
        this.count = parseInt(cWidth / 250);
        this.container.style.width = this.count * 250 + "px";
    }
    //渲染页面
    render(list){
        let html = "";
        for(var i = 0 ; i < list.length; i ++){
            let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
            html += `<div class="box">
                        <div class="box-img style="height:${scaleHeight}px">
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
        //区分：第一排、其余的
        let children = this.wrapper.children;
        Array.from(children).forEach( (box , index) => {
            if(index < this.count){
                this.heightArray.push(box.offsetHeight);
            }else{
                //找到数组之中最小的
                let min = Math.min.apply(false , this.heightArray);//Math.min();返回最低的数字；
                let minIndex = this.heightArray.indexOf(min);//某个指定的字符串值在字符串中首次出现的位置
                box.style.position = "absolute";
                box.style.left     = min + 20 + "px";

                this.heightArray[minIndex] += box.offsetHeight + 20;
            }

        })
        //找出数组中最大的高度；
        let maxHeight = Math.max.apply(false , this.heightArray);
        this.container.style.height = maxHeight + "px";
        console.log(this.heightArray);

    }
}

class Load{
    constructor(){

    }
    async init(start){
        let url  = "http://localhost/dt";
        let data = {
            include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "美食菜谱",
            start : start
        };
        let res = await ajax(url, {data,dataType : "json"});
        return res.data.onject_list; 
    }
}
new WaterFall();