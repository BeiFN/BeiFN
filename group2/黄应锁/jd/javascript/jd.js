let {$,on,removeClassName} = Utils;
class Li{
    constructor(){
        this.lis = $(".fr");
        this.init()
    }
    init(){
        on(this.lis,"mouseover",this.changeColor.bind(this),"a");
        on(this.lis,"mouseout",this.returnColor.bind(this),"a");
    }
    changeColor(evt,ele){
        ele.style.color = "red";
    }
    returnColor(evt,ele){
        ele.style.color = "";
    }
}
new Li();

class Fs_menu{
    constructor(){
        this.menu  = $(".menu");
        this.show = $(".show");
        this.libs = this.menu.children;
        this.init();
    }
    init(){
        on(this.menu,"mouseover",this.handlerMouseover.bind(this),"li");
        on(this.menu,"mouseout",this.handlerMouseout.bind(this),"li");
    }
    handlerMouseover(evt,ele){
        let e = evt ||event;
        let target = e.target ||e.srcElement;
        if(target.nodeName === "A"){
             target.style.color = "red";
        }
        ele.style.backgroundColor = "#d9d9d9";
        let index = Array.from(this.libs).indexOf(ele);
        let node = this.show.children[index];
        node.style.display = "block";
        node.addEventListener("mouseenter",function(){
            node.style.display="block";
        });
        node.addEventListener("mouseleave",function(){
            node.style.display = "none";
        });
    }
    handlerMouseout(evt,ele){
        let e = evt ||event;
        let target = e.target ||e.srcElement;
        if(target.nodeName === "A"){
            target.style.color = "";
       }
        ele.style.backgroundColor = "";
        let index = Array.from(this.libs).indexOf(ele);
        this.show.children[index].style.display ="";
        
    }
}
new Fs_menu();

class Banner{
    constructor(){
        this.container = $(".container");
        this.wrapper = $(".wrapper");
        this.sliders = $(".slide");
        this.btn_next = $(".button-next");
        this.btn_prev = $(".button-prev");
        this.pagination = $(".pagination");
        this.index = 0;
        this.init();
    }
    init(){
        this.btn_next.addEventListener("click",this.handlerBtnNext.bind(this));
        this.btn_prev.addEventListener("click",this.handlerBtnPrev.bind(this));
        this.container.addEventListener("click",this.move.bind(this));
        this.container.addEventListener("click",this.changePagination.bind(this));
        on(this.pagination,"mouseover",this.changeContent.bind(this),"div");
        this.autoPlay();
        this.container.addEventListener("mouseenter",this.offTimer.bind(this));
        this.container.addEventListener("mouseleave",this.onTimer.bind(this));
    }
    handlerBtnNext(){
        if(this.index === this.sliders.length -1){
            this.index = 0;
        }else{
            this.index++;
        }
    }
    handlerBtnPrev(){
        if(this.index === 0){
            this.index = this.sliders.length -1;
        }else{
            this.index--;
        }
    }
    move(){
        for(var i = 0,ele; ele = this.sliders[i++];){
            ele.style.opacity = 0;
            ele.style.transition = "all 1s";
        }
        this.sliders[this.index].style.opacity = 1;
    }
    changePagination(){
        for(var i = 0 , ele ; ele = this.pagination.children[i++];){
            removeClassName(ele,"pagination-bullet-active")
        }
        this.pagination.children[this.index].className += " pagination-bullet-active";
    }
    changeContent(evt,ele){
        let _index = Array.from(this.pagination.children).indexOf(ele);
        this.index = _index;
        this.move();
        this.changePagination();
    }
    autoPlay(){
        this.timer = setInterval(()=>{
            let evt = new Event("click");
            this.btn_next.dispatchEvent(evt);
            this.move();
            this.changePagination();

        },3000);
    }
    offTimer(){
        clearInterval(this.timer);
    }
    onTimer(){
        this.autoPlay();
    }

}
new Banner();

class Cd{
    constructor(time){
        this.time = time;
        this.day = $(".cd_day");
        this.hour = $(".cd_hour");
        this.minute = $(".cd_minute");
        this.second = $(".cd_second");
        this.init();
    }
    init(){
        setInterval(()=>{
            let arr = this.getShiJIan();
            this.second.innerHTML = arr[0];
            this.minute.innerHTML = arr[1];
            this.hour.innerHTML = arr[2];
            this.day.innerHTML = arr[3];
        },1000);
    }
    getShiJIan(){
        let date = new Date(this.time);
        let total = date.getTime()- Date.now();
        let day = parseInt(total/1000/3600/24);
        let hour = parseInt(total/1000/3600%24);
        let minute = parseInt(total/1000/60%60);
        let second = parseInt(total/1000%60);
        return [
            second < 10 ? "0" + second : "" + second,
            minute < 10 ? "0" + minute : "" + minute,
            hour < 10 ? "0" + hour : "" + hour,
            day < 10 ? "0" + day : "" + day
        ]
    }
}
new Cd("2019/8/8");