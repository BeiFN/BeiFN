// logo
let logoImg = $(".logo-img").children[0],
    flag = false,
    logoTimer = null;  
function enterLogo(){
    if(!flag){
        logoImg.style.backgroundImage = `url(http://img1.360buyimg.com/da/jfs/t1/16134/5/11584/77878/5c90a4bdE5ae12937/38714fb6679b8daf.gif?v=0.13884730030421966?+${Date.now()})`;
        logoTimer = setTimeout(logoChange,3000);
    }
    
}
function leaveLogo(){
    flag = true;
}
function logoChange(){ 
    setInterval(function(){
        if(flag){
            logoImg.style.backgroundImage = "url(https://misc.360buyimg.com/mtd/pc/index_2017/2.1.0/static/images/sprite.head.png)";
            flag = false;
            clearTimeout(logoTimer);
        }
    },100)
}
logoImg.addEventListener("mouseenter", enterLogo);
logoImg.addEventListener("mouseleave", leaveLogo);

// nav
class Nav{
    constructor(){
        this.body = $("#body");
        this.nav_box = $("#nav-box");
        this.nav_show_list = Array.from($("#nav-show").children);
        this.nav_hide = $("#nav-hide");
        this.nav_hide_list = [].slice.call($("#nav-hide").children);
        this.index = 0;
        this.init();
    }
    init(){
        document.addEventListener("mousemove", this.navChange.bind(this));
    }
    navChange(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(this.judgeNav(target, this.nav_box)){
            this.navShow(target);
        }else{
            this.navHide();
        }
    }
    navShow(target){
        for(let i = 0, ele; ele = this.nav_show_list[i]; i++){
            this.nav_hide_list[i].style.display = "none";
            if(ele === target || ele === target.parentNode){
                this.index = i;
                this.nav_hide.style.display = "block";
                this.nav_hide_list[this.index].style.display = "block";
            }
            if(this.judgeNav(target, this.nav_hide)){
                this.nav_hide_list[this.index].style.display = "block";
            }
        }
    }
    navHide(){
        this.nav_hide.style.display = "none";
        this.nav_hide_list[this.index].style.display = "none";
    }
    // 辨别a是否是b的子类
    judgeNav(a,b){
        while(a !== this.body){
            if(a === b){
                return true;
            }else{
                a = a.parentNode;
            }
        }
        if(a === body) return false;
    }
}
new Nav();








// 选择器
function $(selector){
    let ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele; 
}