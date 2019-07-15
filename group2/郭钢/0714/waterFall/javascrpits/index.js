let {
    ajax,
    ejs,
    $,
    on
} = Utils;


class WaterFall {
    constructor() {
        this.wrapper = $(".wrapper");
        this.container = $(".container");
        let timer = null;
        this.heightArray = [];
        this.changeSize();
        on(window, "resize", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.changeSize();
                timer = null;
            }, 500)
        })
        this.init();
    }
    async init() {
        let res = await new Load().init();
        this.data = res.data.object_list;

        // 渲染页面
        this.render();

        // 对当前页面排序，把每张图片以瀑布流的方式渲染
        this.sort();
    }
    render() {
        let html = "";
        for (let i = 0, item; item = this.data[i]; i++) {
            // 等比例缩放高度
            let scaleHeight = parseInt(235 / item.photo.width * item.photo.height);
            html += `<div class="boxWrapper">
                <div class="box">
                    <div class="boxImg" style="height:${scaleHeight}px">
                        <a class="alink">
                            <img src=${item.photo.path} alt="">
                            <u style="height:${scaleHeight}px"></u>
                        </a>
                    </div>
                    <div class="boxTxt">
                        <div class="title">${item.msg}</div>
                    </div>
                </div>
            </div>
        `
            this.wrapper.innerHTML = html;
        }
    }


    changeSize() {
        let cWidth = document.documentElement.clientWidth;
        // 页面窗口发生改变时，计算当前的页面宽度所能放下的图片数，下面排序时要用到，所以要计算数字。
        this.count = parseInt(cWidth / 255);
        this.container.style.width = this.count * 255 + "px";
    }

    sort() {
        this.boxWrapper = $(".boxWrapper");
        // 取到当前所有的盒子
        let children = this.wrapper.children;
        // 对这个盒子集合进行遍历
        Array.from(children).forEach((box, index) => {
            // 如果是第一行的盒子，就把其放入到第一行的高度数组中
            if (index < this.count) {
                this.heightArray.push(box.offsetHeight);
            } else {
                // 不是第一行的盒子，就把当前元素放到当前最小高度列的下面
                let min = Math.min.apply(false, this.heightArray);
                let minIndex = this.heightArray.indexOf(min);

                // 计算要偏移的left及top值
                box.style.position = "absolute"
                box.style.left = minIndex * 255 + "px";
                box.style.top = min + 20 + "px";

                // 对高度数组更新
                this.heightArray[minIndex] = min + box.offsetHeight + 20;
            }
        })

    }
    // loadData() {
    //     let data = this.getData;
    //     return ajax(this.url, data)
    // }
}


// 数据初始化
class Load {
    constructor() {
    }
    async init() {
        // 获取数据
        let url = "http://localhost/dt";
        let data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "人物明星",
            start: 0,
            _: 1563094065180
        }
        let res = await ajax(url, {
            data,
            dataType: "json"
        });
        // 将获取到的数据返回
        return res

    }
}

new WaterFall();