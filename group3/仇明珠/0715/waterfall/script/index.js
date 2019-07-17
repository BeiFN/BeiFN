let {ajax,$,on}=Utils;
class Waterfall{
    constructor(){
        this.init();
    }
    async init(){
        this.container=$(".container");
        this.main=$(".wrapper");
        this.heightArr=[];
        this.cWidth=document.documentElement.clientWidth;
        this.cHeight=document.documentElement.clientHeight;
        this.count=parseInt(this.cWidth/250);
        this.loading=false;
        this.nextStart=0;
        this.data=await new Load().init(0);
        this.nextStart=Load.nextStart;
        let timer=null;
        this.render();
        this.changeWidth();
        on(window,"resize",()=>{
            clearInterval(timer);
            timer=setTimeout(()=>{
                this.changeWidth();
                timer=null;
            },500)
        });
        on(window,"scroll",async (evt)=>{
            let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            console.log(scrollTop);
            if(!this.loading&&scrollTop+this.cHeight>this.mainHeight-300){
                this.loading=true;
                this.data =  await new Load().init(this.next_start);
                this.next_start = Load.nextStart;
                this.render();
                this.sort();
                this.loading=false;
            }
        })
    }
    changeWidth(){
        this.cWidth=document.documentElement.clientWidth;
        this.count=parseInt(this.cWidth/250);
        this.main.style.width = this.count * 250 + "px"; 
        this.sort();
    }
    render(){
        let html=``;
        for(let i=0;i<this.data.length;i++){
            let rateHeight=parseInt(235/this.data[i].photo.width*this.data[i].photo.height);
            html+=`
            <div class="box">
            <div class="box-img" style="height:${rateHeight}px">
                  <img src=${this.data[i].photo.path} alt="">
                  <u style="height:${rateHeight}px"></u>
            </div>
            <div class="box-detail">
                  <div class="title">
                  ${this.data[i].msg}
                  </div>
            </div>
      </div>`
        }
        this.main.innerHTML+=html;
    }
    sort(){
        let children=Array.from(this.main.children);
        children.forEach((item,index)=>{
            if(index<this.count){
                item.style.position="static";
                this.heightArr.push(item.offsetHeight);
            }else{
                item.style.position="absolute";
                let min=Math.min.apply(false,this.heightArr);
                let minIndex=this.heightArr.indexOf(min);
                item.style.top=min+20+"px";
                item.style.left=minIndex*250+"px";
                this.heightArr[minIndex]+= item.offsetHeight+20;
            }
        });
        let maxHeight = Math.max.apply(false , this.heightArr);
        let minHeight=Math.min.apply(false,this.heightArr);
        this.mainHeight=minHeight;
        this.main.style.height = maxHeight + "px";
        this.heightArr.length=0;
    }
}
class Load{
    constructor(){};
    async init(start){
        let url="http://localhost/dt";
        let data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "美食菜谱",
            start: start
        };
        let res=await ajax(url,{data:data,dataType:"json"});
        Load.nextStart = res.data.next_start;
        return res.data.object_list;
    }
    static nextStart=0;
}
new Waterfall();