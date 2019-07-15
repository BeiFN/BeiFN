let { $, on, ajax } = Utils
class Waterfall {
    constructor() {
        this.init()
    }
    //初始化
    async init() {
        //获取wrapper
        this.imgWrapper = $(".wrapper")
        this.container = $(".container")

        //放图片高度的数组
        this.heightArr = []

        //加载图片数据
        let data = await new Load().init(0)

        let timer = null;
        //页面尺寸改变触发函数  触发函数
        on(window, "resize", () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                this.coculateWidth();
                // this.render(data);
                timer = null;
            }, 500)
        })
        this.coculateWidth();
        this.render(data)
        this.sort();
    }
    //图片的高度等的渲染
    render(data) {
        let html = ""
        for (var i = 0, item; item = data[i]; i++) {
            //卡住  不知道怎么设置高度  
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
        this.container.innerHTML = html;
        //

    }
    sort() {
        //首先获取所有生成的元素
        let boxList = this.container.children;

        //获取里面的每一个box
        this.minIndex = 0;
        for (var i = 0, box; box = boxList[i]; i++) {
            if (i <= this.total) {
                this.heightArr.push(box.offsetHeight)
                // box.style.position = "absolute"
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
        this.container.style.height = Math.max.apply(false, this.heightArr) + "px"
    }
    coculateWidth() {
        this.cWidth = document.documentElement.clientWidth;
        console.log(this.cWidth)
        this.total = parseInt(this.cWidth / 250)
        //给装图片的容器
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
            filter_id: "旅行",
            //start是开始的下标
            start: start
        };
        let res = await ajax(url, { data: data, dataType: "json" });
        //返回的就是图片的数据了
        return res.data.object_list;
    }
}

new Waterfall();