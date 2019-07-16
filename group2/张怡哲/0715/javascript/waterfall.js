let { ajax , $ , on} = Utils;

class Waterfall{
    constructor(){
        this.init();
    }
    async init(){
        this.template       = $("#template");
        this.wrapper        = $(".wrapper");
        this.container      = $(".container");
        this.img_wrapper    = $(".box-img");

        //页面当前宽度能够放下的盒子总量;
        this.count          = 0;
        //高度数组;
        this.heightArray    = [];
        this.load_url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563172097821&di=5a91819ee43850fc70b858e143165238&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523090235_fJUxr.gif";
        this.cHeight  = document.documentElement.clientHeight;
        this.changeContainerWidth();
        //防抖计时器;
        let widthTimer = null;
        //节流计时器;
        let heightTimer = null;
        on(window , "resize" , ()=>{
            //防抖处理;
            clearTimeout(widthTimer);
            widthTimer = setTimeout(()=>{
                this.changeContainerWidth();
                timer = null;
            },500);
        });

        on(window , "scroll" , ()=>{
            if(heightTimer != null) return false;
            heightTimer = setTimeout(()=>{
                this.imgShow();
                heightTimer = null;
            } , 500);
        });

        let res = await new Load().init(0);

        console.log(res);
        this.render(res);
        this.getAllimg();
        this.sort();
    }

    changeContainerWidth(){
        let cWidth = document.documentElement.clentWidth;
        this.count = parseInt(cWidth / 250);
        this.container.style.width = this.count * 250 + "px";
    }

    render(list){
        let html = "";
        for(let i = 0; i < list.length ; i++){
            //等比例计算高度;
            let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
            html += `<div class="box">
                            <div class="box-img" style="height:${scaleHeight}px" data-img=${list[i].path}>
                                <img src="${list[i].photo.path}" alt="">
                                <u style="height:${scaleHeight}px"></u>
                            </div>
                            <div class="box-detail">
                                <div class="title">
                                        ${list[i].msg}
                                </div>
                            </div>
                    </div>`
        }
        this.wrapper.innerHTML = html;
    }

    getAllimg(){
        this.imgs = Array.from(this.img_wrapper.children);
        this.imgs.forEach(img => {
            img.setAttribute("data-top" , img.offsetTop);
        })
    }

    imgShow(){
        let scorllTop = document.body.scrollTop || document.documentElement.scrollTop;
        this.imgs.forEach(img => {
            let img_top = img.getAttribute("data-top");
            if(scrollTop + this.cHeight >= img_top - 300){
                let src = img.getAttribute("data-img");
                img.children[0].src = src;
            }
        })
    }

    //图片排列
    sort(){
        let children = this.wrapper.children;
        Array.from(children).forEach((box , index)=>{
            if(index <this.count){
                this.heightArray.push(box.offsetHeight);
            }else{
                let min      = Math.min.apply(false , this.heightArray);
                let minIndex = this.heightArray.indexOf(min);

                box.style.position = "absolute";
                box.style.left     = minIndex * 250 +"px";
                box.style.top      = min + 20 + "px";

                this.heightArray[minIndex] += box.offsetHeight + 20;
            }
        })

        let maxHeight = Math.max.apply(false , this.heightArray);

        this.container.style.height = maxHeight + "px";
        console.log(this.heightArray);
    }
}

class Load{
    constructor(){

    }
    async init(start){
        let url  = "http://localhost/dt";
        let data = {
            include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "美食菜谱",
            start : start
        } 
        let res = await ajax(url , {data : data , dataType : "json"});
        return res.data.Object_list;
    }
}

new Waterfall();