let { $, ajax, on } = Utils;

class Load {
    constructor() { }
    async init(start) {
        let url = "http://localhost/dt";
        let data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "设计",
            start: start
        };
        let res1 = await ajax(url, { data: data, dataType: "json" });  // ajax异步加载，需要等待获取完之后才return  故添加异步async
        return res1.data.object_list;
    }
}

class WaterFall {
    constructor() {
        this.init();
    }

    async init() {
        this.template = $("#template");
        this.wrapper = $(".wrapper");
        this.container = $(".container");

        // 第一排能放下多少个元素;
        this.count = 0;
        this.heightArray = [];
        this.changeContainerWidth();
        let timer = null;
        on(window, "resize", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.changeContainerWidth();
                this.heightArray.length = 0;
                this.sort();
                timer = null;
            }, 500)
        })
        let res = await new Load().init(24);
        this.render(res);
        this.sort();
    }

    changeContainerWidth() {
        this.cWidth = document.documentElement.clientWidth;
        this.count = Math.floor(this.cWidth / 250);
        this.container.style.width = this.count * 250 + "px";
    }

    render(list) {
        let html = "";
        for (var i = 0; i < list.length; i++) {
            let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
            html += `<div class="box">
                        <div class="box-img" style="height:${scaleHeight}px">
                            <img src=${list[i].photo.path} alt="">
                            <u style="height:${scaleHeight}px"></u>
                        </div>
                        <div class="box-detail">
                            <div class="title">
                                ${list[i].msg}
                            </div>
                        </div>
                    </div>`;
        }
        this.wrapper.innerHTML = html;
    }

    sort() {
        let children = this.wrapper.children;
        console.log(children, this.count);
        Array.from(children).forEach((box, index) => {
            if (index < this.count) {
                box.style = "";
                this.heightArray.push(box.offsetHeight);
            }
            else {
                let min = Math.min.apply(null, this.heightArray);
                let minIndex = this.heightArray.indexOf(min);
                Object.assign(box.style, {
                    position: "absolute",
                    left: minIndex * 250 + "px",
                    top: min + 20 + "px"
                })
                this.heightArray[minIndex] += box.offsetHeight + 20;
            }
        })
        let maxHeight = Math.max.apply(false, this.heightArray);
        this.container.style.height = maxHeight + "px";
    }
}


new WaterFall();


async function async1() {
    console.log(1)
    await async2()
    console.log(2)
}
async function async2() {
    console.log(3)
}
console.log(4)
setTimeout(function () {
    console.log(5)
}, 0)
async1()
new Promise(function (resolve) {
    console.log(6)
    resolve()
}).then(function () {
    console.log(7)
})
console.log(8)