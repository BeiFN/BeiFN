let { $,on } = Utils;
class Area{
    constructor(){
        this.area_container = $(".name-area-container");
        this.count = this.area_container.children;
        this.count = Array.from(this.count);
        this.name_area = $(".name-area");
        this.init();
    }
    init(){
        on(this.area_container , "click" , this.handerClick.bind(this));
    }
    handerClick(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "A"){
            return false;
        }
        this.index(target);
    }
    index(target){  
        let index = target.getAttribute("data-id");
        for(let i = 0 ; i< this.count.length; i++){
            this.count[i].children[0].className = "";
            this.count[i].children[0].style.color = "";
        }
        target.className += " selected";
        target.style.color += "white";
        this.name_area.innerHTML = target.innerHTML;
        this.name_area.setAttribute("title",target.innerHTML);
    }
    static index;
    static removeClassName(dom,className){
        return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
    }
}
new Area();