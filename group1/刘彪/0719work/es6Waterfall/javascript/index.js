//index   => 处理耦合
//loadata =>加载数据;
//render  => 渲染 + 排版;

let { ajax, $, on } = Utils;

import { Load }   from "./loaddata.js";
import { Render } from "./render.js";



class WaterFall {
 
    async init() {

        this.container = $(".container");
        this.count = 0;
        this.loading = false;
        this.next_start = 0;

        //屏幕高度;
        this.cHeight = document.documentElement.clientHeight;
        //初始化时,设置容器的宽度;
        this.changeContainerWidth();
        let timer = null;
        //事件委托;
        on(window, "resize", () => {
            //每次窗口改变时.先清空延时器,保证只有最后一次改变才生效;
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.changeContainerWidth();
                this.containerHeight = new Render().sort(this.container, this.count);
                timer = null;
            }, 500);
        })
        on(window, "scroll", async () => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (!this.loading && scrollTop + this.cHeight >= this.containerHeight - 300) {
                this.loading = true;
                // console.log("该加载数据了");
                let res = await new Load().init(this.next_start);
                this.next_start = Load.next_start;
                // console.log(res);
                this.container.innerHTML += new Render().render(res);
                this.containerHeight = new Render().sort(this.container, this.count);
                console.log(this.containerHeight)
                this.loading = false;
            }

        })
        //res是一个数组;     
        let res = await new Load().init(0);
        console.log(res);
        this.next_start = Load.next_start;
        //全局渲染一次,通过sort进行排版;
        var html = new Render().render(res);
        this.container.innerHTML = html;
        this.containerHeight = new Render().sort(this.container, this.count, this.heightArray);

    }
    // 改变容器的宽度;
    changeContainerWidth() {
        let cWidth = document.documentElement.clientWidth;
        this.count = parseInt(cWidth / 250);
        this.container.style.width = this.count * 250 + "px";
    }

}

export default new WaterFall();