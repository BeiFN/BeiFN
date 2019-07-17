let { $,ajax ,on} = Utils;
class WaterFall {
    constructor() {
        
        this.wrapper = $(".wrapper");
        this.template = $("#template").innerHTML;
        // this.count = 4 ;
        this.arr = [];
        this.changeContainer();
        this.timer = null;
        on(window,"resize",()=>{
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.changeContainer();
                this.timer = null;
                this.arr = [];
                this.sort();
            },1000);
        });
        this.init();
    }
    async init() {
        this.res = await new Load().init();
        this.render();
        this.sort();
    }
    changeContainer(){
        let cWidth = document.documentElement.offsetWidth;
        this.count = parseInt(cWidth*0.8 / 250);
        this.wrapper.style.width = this.count * 250 + 20 + "px";  
    }
    render(){
        let data = this.res.data.object_list;
        let html = "";
        for(let i = 0 ; i < data.length ; i ++){
            let scaleHeight = parseInt(235 / data[i].photo.width * data[i].photo.height);
            //style =" height:${scaleHeight}px"
            html += `<div class="box">
                             <div class="box-img" style =" height:${scaleHeight}px" >
                                    <img src="${data[i].photo.path}" alt="">
                            </div>
                            <div class="box-title">${data[i].msg}</div>
                    </div>`
        }
        console.log(html)
        this.wrapper.innerHTML = html;
    }
    sort(){
        let children = this.wrapper.children;
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
            this.wrapper.style.height = maxHeight + "px";
        });
    }
}
class Load {
    constructor() {

    }
    async init() {
        let url = "http://localhost/dt";
        ////https://www.duitang.com/napi/blog/list/by_filter_id/?
        //include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count
        //&filter_id=%E6%97%85%E8%A1%8C&start=24&_=1563087570106 
        let data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "古风",
            start: 72,
            // _: 1563087570106,
        };
        let res = await ajax(url, {data:data,dataType:"json"});
        return res;
    }
}
new WaterFall();
// window.onresize = function(){
//     clearTimeout(timer);
//     var timer = setTimeout(()=>{
//         new WaterFall();
//     },1000);
// }