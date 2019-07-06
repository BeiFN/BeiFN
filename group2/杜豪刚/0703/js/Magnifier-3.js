// 　　　┏┓　　　┏┓
// 　　┏┛┻━━━┛┻┓
// 　　┃　　　　　　　 ┃
// 　　┃　　　━　　　 ┃
// 　　┃　┳┛　┗┳　┃
// 　　┃　　　　　　　 ┃
// 　　┃　　　┻　　　 ┃
// 　　┃　　　　　　　 ┃
// 　　┗━┓　　　┏━┛Codes are far away from bugs with the animal protecting
// 　　　　┃　　　┃    神兽保佑,代码无bug
// 　　　　┃　　　┃
// 　　　　┃　　　┗━━━┓
// 　　　　┃　　　　　 ┣┓
// 　　　　┃　　　　 ┏┛
// 　　　　┗┓┓┏━┳┓┏┛
// 　　　　　┃┫┫　┃┫┫
// 　　　　　┗┻┛　┗┻┛

// 构造函数
function Magnifier(){
    this.small_wrapper = $(".small-img");           //small外包围
    this.small_img     = $(".small-img img");       //small图片
    this.small_cube    = $(".cube");                //cube区域
    this.big_wrapper   = $(".big-img");             //big外包围
    this.big_img       = $(".big-img img");         //big图片
    this.btn_wrapper   = $(".img-btn");             //img-btn外包围
    this.btn_img       = this.btn_wrapper.children; //img-box列表图片
    // console.log(this.btn_img,this.btn_wrapper)

    this.small_wrapper_position = getAbsPosition(this.small_wrapper);        //获取wrapper的offset位置
    this.small_cube_size        = getSize(this.small_cube);                  //获取cube的宽高
    this.small_wrapper_size     = getSize(this.small_wrapper);               //获取wrapper的宽高
    this.big_img_size           = getSize(this.big_img);                     //获取big-img的宽高
    this.big_wrapper_size       = getSize(this.big_wrapper);                 //获取big-wrapper的宽高
    // 获取图片地址
    this.lists=[
        {
            small_src : "https://img13.360buyimg.com/n1/s450x450_jfs/t1/20934/9/14668/305219/5caac06cEb41f2374/a57323b77d9c53e5.jpg",
            big_src   : "https://img13.360buyimg.com//n0/jfs/t1/20934/9/14668/305219/5caac06cEb41f2374/a57323b77d9c53e5.jpg"
        },
        {
            small_src: "https://img14.360buyimg.com/n0/jfs/t1/28951/19/5068/77440/5c386b84Ebf737479/c662475c03b19b7f.jpg",
            big_src  : "https://img13.360buyimg.com/n0/jfs/t1/28951/19/5068/77440/5c386b84Ebf737479/c662475c03b19b7f.jpg"
        },
        {
            small_src: "https://img13.360buyimg.com/n1/s450x450_jfs/t1/290/20/3867/154209/5b99cbfbE1783d7d6/3499f69ce219df27.jpg",
            big_src  : "https://img13.360buyimg.com//n0/jfs/t1/290/20/3867/154209/5b99cbfbE1783d7d6/3499f69ce219df27.jpg"
        },
        {
            small_src: "https://img11.360buyimg.com/n1/jfs/t1/26537/33/167/153150/5c0794a5E49aa252c/c91e7dfbaa1d24af.jpg",
            big_src  : "https://img11.360buyimg.com//n0/jfs/t1/26537/33/167/153150/5c0794a5E49aa252c/c91e7dfbaa1d24af.jpg"
        },
        {
            small_src: "https://img10.360buyimg.com/n1/jfs/t25861/343/1155860826/116154/f7d0e519/5b8c8948Nd06b0047.jpg",
            big_src  : "https://img14.360buyimg.com/n0/jfs/t25861/343/1155860826/116154/f7d0e519/5b8c8948Nd06b0047.jpg"
        }
    ]
    this.init();
}

// 添加事件 mouseenter,mouseleave,mousemove
Magnifier.prototype.init = function (){
    this.small_wrapper.addEventListener("mouseenter",this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave",this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove", this.mouseMove.bind(this));
    this.btn_wrapper.addEventListener("click",delegation(this.changeImg.bind(this),".img-box"))
}
// 切换图片
Magnifier.prototype.changeImg = function (ele){
    for(let i=0; i<this.btn_img.length;i++){
        removeClassName(this.btn_img[i],"active");
        ele.className += " active";
        //点击下标时更换对应图片
        this.btn_img[i].onclick = function(){
            // console.log(this.lists[i].small_src);
            // console.log(this.small_img.src);
            this.small_img.src                    = this.lists[i].small_src;              //切换小图片
            this.big_img.src                      = this.lists[i].big_src;                //切换大图片
            this.small_cube.style.backgroundImage = 'url('+this.lists[i].small_src+')';   //切换cube背景图
            // getComputedStyle(this.small_cube)["background-image"] = this.lists[i].small_src            
            // console.log(getComputedStyle(this.small_cube)["background-image"],this.lists[1].small_src);
        }.bind(this);
    }
}
// 显示cube，big-img
Magnifier.prototype.show = function (){
    this.small_cube.style.display  = "block";
    this.big_wrapper.style.display = "block";
    this.small_img.style.opacity   = "0.3";
}
// 隐藏cube，big-img
Magnifier.prototype.hide = function (){
    this.small_cube.style.display  = "none";
    this.big_wrapper.style.display = "none";
    this.small_img.style.opacity   = "1";
}
// 移动cube
Magnifier.prototype.move = function (cube_position,big_position){
    // 小图移动的位置
    this.small_cube.style.left = cube_position.x + "px"; 
    this.small_cube.style.top  = cube_position.y + "px";
    // 大图移动的位置
    this.big_img.style.left = -big_position.width + "px";
    this.big_img.style.top  = -big_position.height + "px";
    // cube移动的位置
    this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
}
// 获取cube位置
Magnifier.prototype.mouseMove = function (evt){
    var e = evt ||window.event;
    // console.log(e.offsetX,e.offsetY);
    var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;            //获取当前的位置
    var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height/ 2;
    // this.move(x,y);
    var cube_position = this.border(x,y);                         //设置当前cube的边界
    var big_position  = this.getBigPosition(x,y);                 //确定大图的位置
    this.move(cube_position,big_position);                        //把当前获取的cube_position传给move   
}
// 边界检测
Magnifier.prototype.border = function (x,y){
    if(x <= 0){
        x = 0
    }
    if(x >= this.small_wrapper_size.width - this.small_cube_size.width){
        x = this.small_wrapper_size.width - this.small_cube_size.width;
    }
    if(y <= 0){
        y = 0
    }
    if(y >= this.small_wrapper_size.height - this.small_cube_size.height){
        y = this.small_wrapper_size.height - this.small_cube_size.height;
    }
    return {
        x : x,
        y : y
    }
}
// 根据移动比例来确定大图位置
Magnifier.prototype.getBigPosition = function (x,y){
    var proX = x / (this.small_wrapper_size.width - this.small_cube_size.width);                //proX为cube在小图移动的比例
    var proY = y / (this.small_wrapper_size.height - this.small_cube_size.height);              //proX为cube在小图移动的比例
    // console.log(proX,proY)
    // console.log(this.small_wrapper_size.width , this.small_cube_size.width,proX,proY)
    var bigX = parseInt(proX * (this.big_img_size.width - this.big_wrapper_size.width));             //bigX为大图的实际宽度
    var bigY = parseInt(proY * (this.big_img_size.height - this.big_wrapper_size.height));           //bigY为大图的实际宽度
    // console.log(bigX,bigY,this.big_img_size.height , typeof(this.big_wrapper_size.height));
    return {
        width  : bigX,
        height : bigY,
    }
}

new Magnifier();

// 封装选择器
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
// 获取offset值
function getAbsPosition(dom){
    var position = {
        left : dom.offsetLeft,
        top  : dom.offsetTop,
    }
    // 判断dom.offsetParent是否等于body
    if(dom.offsetParent === document.body){
        return position;
    }else{
        var res = getAbsPosition(dom.offsetParent);
        return {
            left : dom.offsetLeft + res.left,
            top  : dom.offsetTop  + res. top,
        }
    }
}
// 获取元素大小
function getSize(dom){
    return {
        width : parseInt(getComputedStyle(dom)["width"]),
        height: parseInt(getComputedStyle(dom)["height"])
    }
}
// 事件委托函数
function delegation( handlerClick , selector ){
    return function(evt){
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        var eleList = this.querySelectorAll(selector);
        var targetFamily = [];
        var _tempTarget = target;
        var count = 0;
        while(true && count ++ < 100){
            if(_tempTarget === this || _tempTarget === null){
                    break;
            }
            targetFamily.push(_tempTarget);
            _tempTarget = _tempTarget.parentNode;
        }
        for(var i = 0 , ele ; ele = eleList[i++]; ){
            if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                    handlerClick.call(ele , e , ele);
                    break;
            }
        }
    }
}
// 删去多余CSS样式
function removeClassName(dom , className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
}
