class Utils{
    static $(selector){
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length  === 1 ? ele[0] : ele;
    }
    static getAbsPosition(dom){
        let position = {
            left : dom.offsetLeft,
            top : dom.offsetTop
        }
        if(dom.offsetParent === document.body){
            return position;
        }else{
            let pos = getAbsPosition(dom.offsetParent);
            return position = {
                left : dom.offsetLeft + pos.left,
                top : dom.offsetTop + pos.top
            }
        }
    }
    static getSize(ele){
        let styles = getComputedStyle(ele);

        return {
            kuan : styles.width,
            high : styles.height
        }
    }
    static delegation(handlerClick,selector){
        return function(evt){
            let e = evt || window.event;
            let target = e.target || e.srcElement;
            let elelist = this.querySelectorAll(selector);
            let _target = target;
            let targetFamily = [];
            let count = 0;
            while(true && count ++ <100){
                if(_target === this || _target === null){
                    break;
                }
                    targetFamily.push(_target);
                    _target = _target.parentNode;
                    
            }
            // console.log(targetFamily , elelist);

                for(var i = 0,ele;ele = elelist[i ++];){
                    if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                        handlerClick.call(ele,e,ele);
                        break;
                    }                    
            }          
        }     
    }
    static removeClassName(ele,classname){
        return ele.className = ele.className.replace(new RegExp("\\s?" + classname),"");
    }
}
let{$,getAbsPosition,getSize,delegation,removeClassName} = Utils;
class Magnifier{
    constructor({small_wrapper = ".small-img" , cube = ".cube" , big_wrapper = ".big-img",big_img = ".big-img img",small_img = ".small-img img",img_btns = ".img-btn",img_box = ".img-box"} = {}){

        this.small_wrapper = $(small_wrapper);
        this.cube = $(cube);
        this.big_wrapper = $(big_wrapper);
        this.big_img = $(big_img);
        this.small_img = $(small_img);
        this.img_btns = $(img_btns);
        this.img_box = $(img_box);


        this.init();
    }
    init(){
        this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
        this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));
        this.small_wrapper.addEventListener("mousemove" , this.handlerMove.bind(this));
        this.img_btns.addEventListener("click" , delegation(this.changeImg.bind(this),".img-box"));
    }
    show(){
        this.cube.style.display = "block";
        this.big_wrapper.style.display = "block";

        this.small_img.style.opacity = .3;
    }
    hide(){
        this.cube.style.display = "none";
        this.big_wrapper.style.display = "none";

        this.small_img.style.opacity = 1;
    }
    handlerMove(evt){
        let e = evt || window.event;
        let cube_position = getAbsPosition(this.small_wrapper);
        let cube_size = getSize(this.cube);
        let cubex = e.pageX - cube_position.left - parseInt(cube_size.kuan) / 2;
        let cubey = e.pageY - cube_position.top - parseInt(cube_size.high) / 2;
        // console.log(cubex,cubey);
        var cube_boundary = this.boundary(cubex,cubey);
        var big_position = this.bigPosition(cube_boundary.x,cube_boundary.y);

        this.move(cube_boundary,big_position);
    }
    move(cube_boundary,big_position){
        this.cube.style.left = cube_boundary.x + "px";
        this.cube.style.top = cube_boundary.y + "px";

        this.cube.style.backgroundPosition = -cube_boundary.x + "px " + -cube_boundary.y + "px";

        this.big_img.style.left = -big_position.x + "px";
        this.big_img.style.top = -big_position.y + "px";
    }
    boundary(x,y){
        x = x < 0 ? 0 : x;
        x = x > (this.small_wrapper.offsetWidth - this.cube.offsetWidth) ? (this.small_wrapper.offsetWidth - this.cube.offsetWidth) : x;
        y = y < 0 ? 0 : y;
        y = y > (this.small_wrapper.offsetHeight - this.cube.offsetHeight) ? (this.small_wrapper.offsetHeight - this.cube.offsetHeight) : y;
        return{
            x : x,
            y : y
        }
    }
    bigPosition(x,y){
        let perx = x / this.small_wrapper.offsetWidth;
        let pery = y / this.small_wrapper.offsetHeight;

        let bigx = perx * this.big_img.offsetWidth; 
        let bigy = perx * this.big_img.offsetHeight;
        
        return {
            x : bigx,
            y : bigy
        }
    }
    changeImg(evt,ele){
        // console.log(1);
        for(var i = 0,btn;btn = this.img_box[i ++];){
            removeClassName(btn,"active");
        }
        ele.className += " active"; 
    }
}

new Magnifier();