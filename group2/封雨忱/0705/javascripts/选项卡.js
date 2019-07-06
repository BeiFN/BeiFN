let {randomColor}=Utils;
class Table{
    constructor(btnSelector, contentSelector){
        this.btns = document.getElementById(btnSelector).children;
        this.contents = document.getElementById(contentSelector).children;
    }
    init(){
        for( var i = 0 , btn ; btn = this.btns[i] ; i++){
            btn.addEventListener( "click" , this.changeContent.bind(this , i) );
            btn.addEventListener( "click" , this.addBtnColor.bind(this , i) );
      }
    }
    changeContent(index,evt){
        var e = evt || window.event;
        var target = e .target || e.srcElement;
        for(var i = 0 , content ; content = this.contents[i++];){
              content.className = "";
              // console.log(content)
        }
        this.contents[index].className = "active";
    }
    addBtnColor(index,evt){
        var e=evt||window.event
        this.target=e.target||e.srcElement;
        this.target.style.background= randomColor();
    }
}
var table = new Table("btn-list","content-list");
table.init();