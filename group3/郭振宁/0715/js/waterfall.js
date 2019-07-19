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
        this.loading = false;
        this.next_start = 0;
        this.cHeight = document.documentElement.clientHeight;
        this.count = 0;  
        this.heightArray = [];
        this.load_url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563172097821&di=5a91819ee43850fc70b858e143165238&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523090235_fJUxr.gif";
        this.changeContainerWidth();
        let timer = null; 
        on(window , "resize" , () => {
            clearInterval(this.timer);
            this.timer = setTimeout(() => {
                this.changeContainerWidth();
                this.sort();
            },500)
        })
        on(window , "scroll" , async () => {
            console.log(1);
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(!this.loading && scrollTop + this.cHeight >= this.containerHeight - 300) {
                console.log(2);
                this.loading = true;
                let res = await new Load().init(this.next_start);
                this.next_start = Load.next_start;
                this.render(res);
                this.sort();
                this.loading = false;
            }
        })
        let res = await new Load().init(0);
        this.next_start = Load.next_start;
        this.render(res);
        this.sort();

    }
    changeContainerWidth() {
        this.cWidth = document.documentElement.clientWidth;
        this.count = parseInt(this.cWidth / 250);
        // console.log(this.count);
        this.container.style.width = this.count * 250 + "px";
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
        this.pic_list.innerHTML += html;
    }
    sort() {
        let children = this.pic_list.children;
        Array.from(children).forEach((item , index) => {
            if(index < this.count) {
                item.style.position = "static";
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
        let maxHeight = Math.max.apply(false , this.heightArray);
        let minHeight = Math.min.apply(false , this.heightArray);

        this.container.style.height = maxHeight + "px";
        this.containerHeight = minHeight;
        this.heightArray.length = 0;
    }
    
}

class Load {
    constructor() {
    }
    async init(start) {
        let url = "http://localhost/dt";
        
        let data = {
            include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id : "搞笑萌宠",
            start : start
        };
        let res = await ajax(url , {data : data , dataType : "json"});
        Load.nextStart = res.data.next_start;
        return res.data.object_list;
    }
    static nextStart = 0;
}

new Waterfall();