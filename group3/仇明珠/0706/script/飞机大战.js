let {$$}=Utils;
class Core{
    constructor(){
        this.main=$$(".main");
        this.options=$$(".options");
        this.init();
        this.hardLevel=null;
    }
    init(){
        this.options.addEventListener("click",this.handleClick.bind(this));
    }
    handleClick(evt){
        let e=evt||window.event;
        let target=e.target;
        if(target.nodeName!="P") return false;
        for(let i=0;i<target.parentNode.children.length;i++){
            if(target===target.parentNode.children[i]){
                this.hardLevel=i;
            }
        }
        this.options.remove();
        let position=0;
        let speed=5;
        this.logo=this.createLogo();
        this.loading=this.createLoading();
        setInterval(function(){
            position+=speed;
            this.main.style.backgroundPositionY=position+"px";
        }.bind(this),50)
        this.gameStart();

    }
    createLogo(){
        let logo=document.createElement("div");
        logo.className="logo";
        document.body.appendChild(logo);
        return logo;
    }
    createLoading(){
        let loading=document.createElement("div");
        loading.className="loading";
        document.body.appendChild(loading);
        return loading
    }
    gameStart(){
        this.clearAll();
        setTimeout(()=>{
            new Plane().init();
        },1000)
    }
    clearAll(){
        setTimeout(()=>{
            this.logo.remove();
            this.loading.remove();
        },1000)
    }
    static createEle(className){
        let ele=document.createElement("div");
        ele.className=className;
        document.body.appendChild(ele);
        return ele;
    } 
}
class Plane{
    constructor(){
        this.main=$$(".main");
    }
    init(){
        this.plane=this.createPlane();
    }
    createPlane(){
        let cWidth=document.documentElement.clientWidth;
        let plane=document.createElement("div");
        plane.className="plane";
        document.body.appendChild(plane);
        plane.style.left=(cWidth-plane.offsetWidth)/2+"px";
        return plane;
    }
}
new Core();