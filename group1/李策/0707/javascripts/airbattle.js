let { $ , on , createEle } = Utils;

class Core{
    constructor(){
        this.option = $(".options");
        this.main   = $(".main")   ;
        this.init();
    }
    init(){
        on(this.option , "click" ,this.handlerClick.bind(this));
    }
    handlerClick(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "P") return false ;
        this.setHardLevel(target);
        this.clearAll();
        this.showAll();
        this.animate();
        setTimeout( ()=> {
            this.clearAll();
            this.gameStart();
        },1000)
    }
    setHardLevel(target){
        this.hardLevel = Array.from(target.parentNode.children).indexOf(target);
    }
    clearAll(){
        this.option ? this.option.remove() : "";
        clearInterval(this.loading);
        this.logo ? this.logo.remove() : "";
        this.plane_loading ? this.plane_loading.remove() : "";
    }
    showAll(){
        this.logo = createEle("logo");
        this.plane_loading = createEle("plane-loading");
    }
    animate(){
        let index = 0;
        this.loading = setInterval(()=>{
            this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3  + 1}.png`;
        },800)
        let positionY = 0;
        let speed = 5;
        switch(this.hardLevel){
            case 0 : speed = 20;break;
            case 1 : speed = 10;break;
            case 2 : speed = 5;break;
            case 3 : speed = 20;break;
        }
        this.bg_moving = setInterval(()=>{
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        },50)
    }
    gameStart(){

    }

    static hardLevel;
}

class Plane{
    constructor(){}
    init(){
        this.ele = this.createPlane();
        this.main = $(".main");
        this.mainSize = {
            left : this.main.offsetLeft,
            width : this.main.offsetWidth
        }
        this.eleSize = {
            width : this.ele.offsetWidth,
            height : this.ele.offsetHeight
        }
        __________________________________________+++++++________________
    }
    createPlane(){
        let cWidth = document.documentElement.clientWidth;
        let ele = createEle("palne");
        ele.style.cursor = "none";
        ele.style.left = cWidth / 2 - ele.offsetWidth / 2 + "px";
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop ;
        return ele;
    }
    planeMove(evt){
        let e = evt || window.event;
        let { x , y } = this.boundary(e.clientX - this.eleSize.width / 2 , ele.clientY - this.eleSize.height / 2);
        Plane.x = x ;
        Plane.y = y;
        this.ele.style.left = x + "px";
        this.ele.style.top  = y + "px";
    }
    boundary(x,y){
        let minX = this.mainSize.left;
        let maxX = this.mainSize.left + this.mainSize.width - this.eleSize.width;
        x = x < minX ? minX : x ;
        x = x > maxX ? maxX : x ;
        y = y < 0 ? 0 : y ;
        return{
            x ,
            y
        }
    }
    static x ;
    static y ;
    static plane_size ;
}
new Core();

