/* 
*
*
*
*/
function $(selector) {
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
function getAstposition(ele) {
    var pos = {
        left : ele.offsetLeft,
        top : ele.offsetTop
    }
    while(ele.offsetParent !== document.body) {
        ele = ele.offsetParent;
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop
    }
    return pos;
}
function delegation(handlerClick , selector) {
    return function(evt) {
        var e = evt || event;
        var target  = e.target || e.srcElement;
        var ele_list = document.querySelectorAll(selector);
        var targetFamily =[];
        var _tempTarget = target;
        while(true) {
            if(_tempTarget === this || _tempTarget === null) {
                break;
            }
            targetFamily.push(_tempTarget);
            _tempTarget = _tempTarget.parentNode;
        }

        for(var i=0, ele; ele = ele_list[i++];) {
            if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1) {
                handlerClick.call(ele , e , ele);
                break;
            }
        }
    }
}
function removeClassName(dom , className) {
    return dom.className = dom.className.replace(new RegExp("\s?" + className) , "");
}
function Magnifier() {
    this.small_img = $(".small-img");
    this.cube = $(".cube");
    this.big_img = $(".big-img");
    this.sImg = $(".small-img img");
    this.bImg = $(".big-img img");
    this.img_btn = $(".img-btn");

    this.cubeWidth = parseInt(getComputedStyle(this.cube)["width"]);
    this.cubeHeight = parseInt(getComputedStyle(this.cube)["height"]);
    this.small_img_width = this.small_img.offsetWidth;
    this.small_img_height = this.small_img.offsetHeight;
    this.small_img_left = getAstposition(this.small_img).left;
    this.small_img_top = getAstposition(this.small_img).top;
    this.big_img_width = parseInt(getComputedStyle(this.big_img)["width"]);
    this.big_img_height = parseInt(getComputedStyle(this.big_img)["height"]);
    this.bImg_height = parseInt(getComputedStyle(this.bImg)["height"]);
    this.bImg_width = parseInt(getComputedStyle(this.bImg)["width"]);

    this.picAddress = {
        0 : "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        1 : "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
    }
    // console.log(this.small_img_left , this.small_img_top);
    this.init();
}
Magnifier.prototype.init = function() {

    this.small_img.addEventListener("mouseenter" , this.show.bind(this));
    this.small_img.addEventListener("mouseleave" , this.hide.bind(this));
    this.small_img.addEventListener("mousemove" , this.handlermove.bind(this));
    this.img_btn.addEventListener("click" , delegation(this.changeImg.bind(this) , ".img-box"));
}
Magnifier.prototype.changeImg = function(evt , ele) {
    for(var i=0, allEle; allele = ele.parentNode.children[i++];) {
        allele.index = i-1;
        removeClassName(allele , "active");
    }
    ele.className += " active";

    this.sImg.src = this.picAddress[ele.index];
    this.bImg.src = this.picAddress[ele.index];
    this.cube.style.backgroundImage = "url(" + this.picAddress[ele.index] + ")";
}
Magnifier.prototype.handlermove = function(evt) {
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    
    var x = e.pageX;
    var y = e.pageY;

    var cubePos = this.move(x , y);
    this.getBigImgPos(cubePos);
}
Magnifier.prototype.show = function() {
    this.big_img.style.display = "block";
    this.cube.style.display = "block";

    this.sImg.style.opacity = 0.3;
}
Magnifier.prototype.hide = function() {
    this.big_img.style.display = "none";
    this.cube.style.display = "none";

    this.sImg.style.opacity = 1;

}

Magnifier.prototype.move = function(pagex , pagey) {
    var x = Math.min(Math.max(pagex - this.small_img_left - this.cubeWidth / 2 , 0) , this.small_img_width - this.cubeWidth);
    var y = Math.min(Math.max(pagey - this.small_img_top - this.cubeHeight / 2 , 0) , this.small_img_height - this.cubeHeight);

    this.cube.style.left = x + "px";
    this.cube.style.top = y + "px";
    this.cube.style.backgroundPosition = -x + "px " + -y + "px";


    return {x : x , y : y};
}
Magnifier.prototype.getBigImgPos = function(pos) {
    var left = (pos.x / (this.small_img_width - this.cubeWidth)) * (this.bImg_width - this.big_img_width);
    var top = (pos.y / (this.small_img_height - this.cubeHeight)) * (this.bImg_height - this.big_img_height);
    // console.log(left , top);
    this.bImg.style.left = -left + "px";
    this.bImg.style.top = -top + "px";

}


new Magnifier();








