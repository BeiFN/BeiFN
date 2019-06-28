var box = document.getElementById("box");
var child = box.children;
on(box , "click" , handlerClick , "li");
function handlerClick(){
    for(var i = 0 ,ele; ele = child[i ++] ; ){
        ele.className = "" ;
    }
        this.className = "active";
        var text_h2 = document.getElementById("txt").children[0];
        var text_p = document.getElementById("txt").children[1];
        var monthActive = this.children[0].innerHTML;
        text_h2.innerHTML = monthActive +"月活动";
        text_p.innerHTML = list[monthActive-1];

}

var list = [
    "哈哈",
    "嘿嘿",
    "哦哦",
    "嗯嗯",
    "呃呃",
    "嘻嘻",
    "嗷嗷",
    "啊啊",
    "呵呵",
    "刚刚",
    "恩恩",
    "额额",
    "谔谔",
];
