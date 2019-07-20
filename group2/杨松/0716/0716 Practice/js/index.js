

let { $, on, ajax } = Utils;
class Waterfall {
    constructor() {
        this.init()
    }
    //初始化
    async init() {
        this.imgWrapper = $(".wrapper")
        this.container = $(".container")
        this.heightArr = []

        let data = await new Load().init(0)
        let timer = null;

        //页面尺寸改变触发函数  触发函数
        on(window, "resize", () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                this.coculateWidth();
                this.sort()
                // this.render(data);
                timer = null;
            }, 500)
        })
        this.cHeigth = document.documentElement.clientHeight;
        //节流的方式
        this.loading = false;
        //滑轮滚动 
        on(window, "scroll", async() => {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollTop + this.cHeigth > (this.minHeight - 500) && !this.loading) {
                this.loading = true;

                let res = await new Load().init(Load.nextStart);
                this.render(res);
                this.sort();
                this.loading=false;
            }
        })
        this.coculateWidth();
        this.render(data)
        this.sort();
    }
    //渲染图片高度
    render(data) {
        let html = ""
        for (var i = 0, item; item = data[i]; i++) {
            let scaleHeight = (235 / item.photo.width) * item.photo.height;
            html += `  
            <div class="box">
                <div class="box-img"  style="height:${scaleHeight}px" >
                    <img src="${item.photo.path}" alt="">
                    <u style="height:${scaleHeight}px"></u>
                </div>
                <div class="box-detail">
                    <div class="title">
                        ${item.msg}
                    </div>
                </div>
            </div>`
        }
        this.imgWrapper.innerHTML += html;
    }
    sort() {
        //首先获取所有生成的元素
        let boxList = this.imgWrapper.children;

        //获取里面的每一个box
        this.minIndex = 0;
        for (var i = 0, box; box = boxList[i]; i++) {
            if (i < this.total) {
                this.heightArr.push(box.offsetHeight)
                box.style.position = "static"
            } else {
                this.min = Math.min.apply(false, this.heightArr)
                this.minIndex = this.heightArr.indexOf(this.min)
                // console.log(box)
                box.style.position = "absolute"
                box.style.left = this.minIndex * 250 + "px"
                box.style.top = this.min + 20 + "px"
                // console.log(box.offsetHeight)
                this.heightArr[this.minIndex] += box.offsetHeight + 20;
            }
        }
        this.minHeight = Math.min.apply(false, this.heightArr)
        this.container.style.height = Math.max.apply(false, this.heightArr) + "px"
        this.heightArr = []
    }
    coculateWidth() {
        this.cWidth = document.documentElement.clientWidth;
        this.total = parseInt(this.cWidth / 250)
        //容器
        this.container.style.width = this.total * 250 + "px"
    }

}
class Load {
    constructor() {
    }
    async init(start) {
        let url = "http://localhost/dt";
        let data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "手工DIY",
            //start是开始的下标
            start: start
        };

        let res = await ajax(url, { data: data, dataType: "json" });
        Load.nextStart = res.data.next_start;
        //返回的就是图片的数据了
        return res.data.object_list;

    }
    static nextStart;
}

new Waterfall();