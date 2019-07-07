class Table{

  constructor(btnSelector, contentSelector){
    this.btns = document.getElementById(btnSelector).children;
    this.contents = document.getElementById(contentSelector).children;
    this.init()
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
    // console.log("changeContent" , this , target);
    for(var i = 0 , content ; content = this.contents[i++];){
          content.className = "";
    }
    this.contents[index].className = "active";
  }
  addBtnColor(index,evt){
    var e = evt || window.event;
    var target = e .target || e.srcElement;
    // console.log("changeContent" , this , target);
    // for(var i = 0 , btn ; btn = this.btns[i++];){
    //       btn.className = "";
    // }
    // this.btns[index].className = "active"; 10 A 11 B 12 C 13 D 14 E 15 F
    this.btns[index].style.background = "#" + Math.round(parseInt("ffffff",16) * Math.random()).toString(16).padStart(6,"0");
  }

}

new Table("btn-list","content-list")