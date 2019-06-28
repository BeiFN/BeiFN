function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

var navList = $("#nav_list");
var productTitle = $("#product_title");
var goBack = $("#goback");


function delegation(eventCallBack,selector){
    return function (evt){
        var e = evt || event;
        var target = e.target || e.srcElement;
        // console.log(target.nodeName);
        var _target = target;
        var targetFamily = [];
        // console.log(_target);
        var eleList = this.querySelectorAll(selector);
        
        var count = 0;
        while(true && count<100){
            if(_target === this) break;
            targetFamily.push(_target);
            _target = _target.parentNode;
            count++;
        }
        // console.log(targetFamily);
        for(var i = 0,ele ; ele = eleList[i++];){
            if(targetFamily.length===1 ? ele === targetFamily[0] : targetFamily.indexOf(ele)!==-1){
                eventCallBack.call(ele,e);
                // console.log(ele);
            }
        }
    }
}

function changeColor(){
    this.style.backgroundColor = "#000";
    this.style.color = "#ffe300";
    // console.log(this);
}

function returnColor(){
    this.style.backgroundColor = "";
    this.style.color = "";
}

window.onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var line = productTitle.offsetTop;
    console.log(scrollTop);
    // console.log(line);
    if(scrollTop>=603){
        productTitle.style.position = "fixed";
        productTitle.style.top = "0px";
    }else{
        productTitle.style.position = "static";
        // productTitle.style.top = "603px";
    }
    if(scrollTop>1200){
        goBack.style.display = "block";
    }
    if(scrollTop>2990){
        goBack.style.position = "absolute";
        goBack.style.top = "3645px";
    }
    if(scrollTop>1200 && scrollTop<2990){
        goBack.style.cssText = "display:block;position:fixed;"
    }
    if(scrollTop<1200){
        goBack.style.display = "none";
    }
}
navList.addEventListener("mouseover" , delegation(changeColor,".hover"));
// navList.addEventListener("mouseover" , changeTextColor("A","#ffe300"));
navList.addEventListener("mouseout" , delegation(returnColor,".hover"));
goBack.onclick = function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// var arr=navList.querySelectorAll("li");
// console.log(arr);