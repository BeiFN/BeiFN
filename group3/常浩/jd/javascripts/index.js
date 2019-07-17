let {$,on} = Utils;
class Logochange{
    constructor(){
        this.logo = $(".logo");
        this.logo_list = ["https://misc.360buyimg.com/mtd/pc/index_2017/2.1.0/static/images/sprite.head.png","https://img1.360buyimg.com/da/jfs/t1/16134/5/11584/77878/5c90a4bdE5ae12937/38714fb6679b8daf.gif?v=0.6569346937447404"];
        this.init();
        this.temp = null;
        this.temp_s = null;
    }
    init(){
        this.logo.addEventListener("mouseenter",this.showLoading.bind(this));
        this.logo.addEventListener("mouseleave",this.hideLoading.bind(this));
    }
    showLoading(){
        this.logo.style.backgroundImage.src;
        this.temp = true;
        this.logo.style.backgroundImage = `url(${this.logo_list[1]})`;
    }
    hideLoading(){
        this.temp = false;
        if (!this.temp){
            setTimeout(()=>{
                this.logo.style.backgroundImage = `url(${this.logo_list[0]})`;
            },3500)
        }
    }
}
new Logochange();

//定位部分
class Mapopsition{
    constructor(){
        this.ul = $(".leftFloat")
        this.main = $("#map");
        this.mapmenu = $(".mapmenu");
        this.opsitions = $(".map-top");
        this.texts      = $("#map").children[1];
        this.init();
    }
    init(){
        this.main.addEventListener("mouseenter",this.showMenu.bind(this));
        this.ul.addEventListener("mouseleave",this.hideMenu.bind(this));
        on(this.opsitions,"mouseover",this.changeOpsition.bind(this),"a");
        on(this.opsitions,"click",this.changeMap.bind(this),"a");
    
    }
    showMenu(){
        this.main.className = "hover";
        this.mapmenu.style.display = "block";
    }
    changeOpsition(evt,ele){
        // console.log(ele);
        let ul = ele.parentNode.parentNode;
       for(let i = 0 ,opsition;opsition = ul.children[i];i++){
            if(opsition.className !=="red"){
                opsition.className = "";
            }
       }
       if(ele.parentNode.className !== "red"){
           ele.parentNode.className = "hover";
       }
    }
    changeMap(evt,ele){
        let ul = ele.parentNode.parentNode;
       for(let i = 0 ,opsition;opsition = ul.children[i];i++){
                opsition.className = "";
       }
        ele.parentNode.className ="red";
        let _text = ele.innerHTML;
        this.texts.innerHTML = _text;
    }
    hideMenu(){
        for(let i = 0 ,opsition; opsition = this.opsitions.children[i]; i++){
            if(opsition.className !=="red"){
                opsition.className = "";
            }
        }
        this.main.className ="";
        this.mapmenu.style.display = "none";

    }
}
new Mapopsition();