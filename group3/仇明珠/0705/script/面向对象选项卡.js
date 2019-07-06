class Utils{
    static $$(selector){
        let ele=null;
        return (ele=document.querySelectorAll(selector)).length==1?ele[0]:ele;
    }
    static randomColor(){
        let color = "#" + Math.round((Math.random()) * 0xffffff).toString(16);
                if (color.length != 7) {
                    for (let i = 0; i < (7 - color.length); i++) {
                        color += 0;
                    }
                }
                return color;
    }
}
let{$$,randomColor}=Utils;
class Tab{
    constructor({btnSelector="#btn-list",contentSecotr="#content-list"}={}){
        this.btns=$$(btnSelector).children;
        this.contents=$$(contentSecotr).children;
        this.init();
    }
    init(){
        for(let i=0;i<this.btns.length;i++){
            this.btns[i].addEventListener("click",this.changeContent.bind(this,i))
            this.btns[i].addEventListener("click",this.changeBgColor.bind(this,i))
        }
    }
    changeContent(index){
        for(var i=0;i<this.contents.length;i++){
            this.contents[i].className="";
        }
        this.contents[index].className="active";
        this.contents[index].style.background=randomColor();
    }
    changeBgColor=function(index){
        this.btns[index].style.background=randomColor();
    }
}
let tab=new Tab();