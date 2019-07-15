/* 
*
*
*
*/

let {ajax , $ , on} = Utils;

class Waterfall {
    constructor() {
        this.init();
    }
    async init() {
        this.pic_list = $(".wrapper");
        this.template = $("#template");
        this.container = $(".container");
        this.heightArray = [];
        let res = await new Load().init();
        this.render(res);

        this.sort();

    }
    render(res) {
        let html = "";
        for(var i=0; i<res.length; i++) {
            let scaleHeight = parseInt(235 / res[i].photo.width * res[i].photo.height);
            html += `<div class="box">
                        <div class="box-img" style="height : ${scaleHeight}px">
                            <img src="${res[i].photo.path}" alt="">
                            <u style="height:${scaleHeight}px"></u>
                        </div>
                        <div class="box-detail">
                            <div class="title">
                                ${res[i].msg}
                            </div>
                        </div>
                    </div>`
        }
        this.pic_list.innerHTML = html;
    }
    sort() {
        let children = this.pic_list.children;
        Array.from(children).forEach((item , index) => {
            if(index < 4) {
                this.heightArray.push(item.offsetHeight);                
            }else {
                let min = Math.min.apply(false , this.heightArray);
                let minIndex = this.heightArray.indexOf(min);

                item.style.position = "absolute";
                item.style.left = minIndex * 250 + "px";
                item.style.top = min + 20 + "px";

                this.heightArray[minIndex] += item.offsetHeight + 20;
            }
        })
    }
    
}

class Load {
    constructor() {
    }
    async init() {
        let url = "http://localhost/dt";
        
        let data = {
            include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id : "搞笑萌宠",
            start : 72
        };
        let res = await ajax(url , {data : data , dataType : "json"});
        return res.data.object_list;
    }
}

new Waterfall();