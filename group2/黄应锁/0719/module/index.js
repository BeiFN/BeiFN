import load from "./load.js"
import render from "./render.js";

class WaterFall {
    constructor() { }
    async init() {
        this.wrapper = $(".wrapper");
        // this.template = $("#template").innerHTML;
        this.cHeight = document.documentElement.clientHeight;
        this.loadig = false; 
        // this.count = 4 ;
        this.arr = [];
        this.changeContainer();
        this.timer = null;

        this.res =await load.init(2);
        // console.log(this.res)
        this.next_start = this.res.data.next_start;
        this.html = render.init(this.res);
        this.wrapper.html(this.html);
        this.sort();
        $(window).on("resize",()=>{
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.changeContainer();
                this.timer = null;
                this.arr = [];
                this.sort();
                this.cHeight = document.documentElement.clientHeight;
            },1000);
        });
        $(window).on("scroll",async()=>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (!this.loading && (scrollTop + this.cHeight >= this.minHeight - 300)) {
                this.loading = true;
                this.res = await load.init(this.next_start);
                this.next_start = this.res.data.next_start;
                this.arr = [];
                this.html = render.init(this.res);
                this.wrapper.append(this.html);
                render.init(this.res)
                this.sort();
                this.loading = false;
            }
        })
    }
    changeContainer(){
        let cWidth = document.documentElement.offsetWidth;
        this.count = parseInt(cWidth*0.8 / 250);
        this.wrapper.css("width" , this.count * 250 + 20) ;  
    }
    sort(){
        let children = this.wrapper[0].children;
        Array.from(children).forEach((box,index) =>{
            if(index < this.count){
                this.arr.push(box.offsetHeight);
                box.style.left = index * 255 + "px";
                box.style.top = 0;
            }else{
                let min = Math.min.apply(false, this.arr);
                let minIndex = this.arr.indexOf(min);
                box.style.position = "absolute";
                box.style.left = minIndex * 255 + "px";
                box.style.top = min + 20 + "px";
                box.style.transition = "all 1s";
                this.arr[minIndex] += box.offsetHeight + 20;
            }
            let maxHeight = Math.max.apply(false , this.arr);
            let minHeight = Math.min.apply(false , this.arr);
            this.minHeight = minHeight;
            this.wrapper[0].style.height = maxHeight + "px";
        });
    }
}
export default new WaterFall();
