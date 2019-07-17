let { ajax, $, on } = Utils;

class WaterFall {
    constructor() {
        this.init();
    }
    async init() {
        
        this.container = $(".container");

        this.count = 0;
        this.heightArray = [];
        this.changeContainerWidth();
      

        let timer = null;
        on(window,"resize",()=>{
            //每次窗口改变时.先清空延时器,保证只有最后一次改变才生效;
            clearTimeout(timer);
            timer= setTimeout( ()=>{
                // console.log(1);
                this.changeContainerWidth();
                timer = null;
            },500);
           
        })

        let res = await new Load().init(0); //res是一个数组;       
        this.render(res);
        this.sort();
    }
    changeContainerWidth(){
        let cWidth = document.documentElement.clientWidth;
        this.count = parseInt(cWidth/250);
        this.container.style.width = this.count*250 + "px";
    }
    render(list) {
        let html = "";
        for (let i = 0; i < list.length; i++) {
            let scaleHeight = parseInt(235/list[i].photo.width*list[i].photo.height);
            html += `<div class="box">
                      <div class="box-img" style ="height:${scaleHeight}px">
                            <img src="${list[i].photo.path}" alt="">
                            <u style ="height:${scaleHeight}px"></u>
                      </div>
                      <div class="box-detail">
                            <div class="title">
                                  ${list[i].msg}
                            </div>
                      </div>
                   </div>
               
                  `
        }
            this.container.innerHTML = html;

        }

        sort(){

            //区分;
            //第一排和其余排;
        let children = this.container.children;
          
            Array.from(children).forEach((box,index)=>{
                if(index < this.count){
                    //刚开始,将第一排盒子的高度放进数组;
                    this.heightArray.push(box.offsetHeight);
                }else{
                    //取出高度数组里最小的高度及其所在下标;
                    let min = Math.min.apply(false,this.heightArray);
                    let minIndex = this.heightArray.indexOf(min);

                    // console.log(min,minIndex);
                    box.style.position = "absolute";
                    box.style.left = minIndex * 250 +"px";
                    box.style.top = min + 20 +"px"; 
                    //更新高度;
                    this.heightArray[minIndex] +=box.offsetHeight +20;

                }
                
            })

            //改变容器的高度;
            let maxHeight = Math.max.apply(false,this.heightArray);
            this.container.style.height = maxHeight +"px";

         
        }

    }

class Load {
    constructor() {

    }
    async init(start) {
        let url = "http://localhost/dt";
        let data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "摄影",
            start: start
        };
        let res = await ajax(url, { data: data, dataType: "json" });

        return res.data.object_list; //返回的是一个数组;
    }
}

new WaterFall();