let {
    ajax,
    $,
    on
} = Utils;

class WaterFall {
    constructor() {
        this.wrapper = $(".wrapper");
        this.container = $(".container");
        this.count = 0;
        this.heightArray = [];
        this.init();
    }

    async init() {
        this.changeContainerWidth();
        let timer = null;
        on(window, "resize", z => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.changeContainerWidth();
                this.heightArray = [];
                this.sort();
                timer = null;
            }, 500);
        })
        let res = await new Load().init(0);
        this.render(res);
        this.sort();
    }

    changeContainerWidth() {
        let c_width = document.documentElement.clientWidth;
        this.count = parseInt(c_width / 250);
        this.container.style.width = this.count * 250 + "px";
    }

    render(list) {
        let html = "";
        for (let i = 0; i < list.length; i++) {
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
                    </div>`;
        }
        console.log(html);
        this.wrapper.innerHTML = html;
    }

    sort() {
        let children = this.wrapper.children;
        Array.from(children).forEach((box, index) => {
            if (index < this.count) {
                this.heightArray.push(box.offsetHeight);
                box.style.top = 0;
                box.style.left = index * 250 + "px";
            } else {
                let min = Math.min.apply(false, this.heightArray);
                let minIndex = this.heightArray.indexOf(min);
                box.style.position = "absolute";
                box.style.left = minIndex * 250 + "px";
                box.style.top = min + 20 + "px";
                this.heightArray[minIndex] += box.offsetHeight + 20;
            }
        })
        let maxHeight = Math.max.apply(false , this.heightArray);
        this.container.style.height = maxHeight + "px";
    }
}

class Load {
    constructor() {}

    async init(start) {
        let url = "http://localhost/dt";
        let data = {
            kw: "短发",
            type: "feed",
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,like_id,sender,album,reply_count,favorite_blog_id",
            _type: "",
            start: 0,
            _: 1563096841660
        };
        let res = await ajax(url, {
            data: data,
            dataType : "json"
        });
        console.log(res);
        return res.data.object_list;
    }
}

new WaterFall();