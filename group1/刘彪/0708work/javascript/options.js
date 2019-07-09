class Options{
    constructor(btnList,contentList){
        this.btns = document.querySelector(btnList).children;
        this.contents = document.getElementById(contentList).children;
        this.init();
    }

    init(){
        for(let i = 0 ,btn ; btn =this.btns[i] ;i++ ){
            btn.addEventListener("click",this.changeContent.bind(this,i));
            btn.addEventListener("click",this.changeColor.bind(this,i));
        }
    }

    changeContent(index){
        for( let i = 0 , content ; content = this.contents[i] ; i++){
            content.className = "" ;
        }
        this.contents[index].className = "active";
    }
    changeColor(index){
        let randomColor = "#" + Math.round(Math.random()*parseInt("ffffff",16)).toString(16).padStart(6,"0");
        // console.log(randomColor);
        this.btns[index].style.background = randomColor;
    }

}

new Options("#btn-list","content-list");