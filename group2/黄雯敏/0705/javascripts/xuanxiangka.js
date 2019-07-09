    class Table{
        constructor(btnSelector,conSelector){
            //属性
            this.btns      = document.querySelector(btnSelector).children;
            this.contents  = document.querySelector(conSelector).children;
        }
        init(){
            for(let i=0,btn;btn=this.btns[i];i++){
                // 遍历btn并获取i值
                btn.addEventListener("click",this.handlerClick.bind(this,i));
            }
        }
        handlerClick(index){
            for(let i=0,con;con=this.contents[i];i++){
                // console.log(i)
                con.className = "";
            }
            for(let j=0,btn;btn=this.btns[j];j++){
                btn.style.backgroundColor = "#DDD";
            }
            this.contents[index].className = "active";
            this.contents[index].style.backgroundColor = "#" + Math.round(parseInt("ffffff",16)*Math.random()).toString(16).padStart(6,0);
            this.btns[index].style.backgroundColor = "#" + Math.round(Math.random()*parseInt("ffffff",16)).toString(16).padStart(6,0);
       
        }

    }
    var table = new Table("#btn-list","#content-list");
    table.init();
    