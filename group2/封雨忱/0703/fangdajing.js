//封装
function $(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
}
//获取节点距离
function getAbsPosition(dom){
    var position={
        left:dom.offsetLeft,
        top:dom.offsetTop
    }
    if(dom.offsetParent===document.body){
        return position;
    }else{
        var pos=getAbsPosition(dom.offsetParent);
        return {
            left:dom.offsetLeft+pos.left,
            top:dom.offsetTop+pos.top
        }
    }
}
//获取size
function getSize(dom){
    return{
        width:parseInt(getComputedStyle(dom)['width']),
        height:parseInt(getComputedStyle(dom)['height'])
    }
}
//事件委托封装
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
//构造函数
function Magnifier(){
    this.index=0;
    this.small_wrapper=$('.small-img');
    this.small_img=$('.small-img img');
    this.small_cube=$('.cube');
    // console.log(this.small_wrapper,this.small_img,this.small_cube)
    this.big_wrapper=$('.big-img');
    this.big_img=$('.big-img img');
    this.img_btn=$('.img-btn');
    // this.img_box=$('.img-box');
    this.img_box=this.img_btn.children;
    // console.log(this.img_box);
    this.list={
        1:{
            firstImg:"https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            secondImg:"https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            },
        2:{
            firstImg:"https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            secondImg:"https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },
        // 3:{
        //     firstImg:"https://img11.360buyimg.com/n1/s450x450_jfs/t1/74337/9/3553/149378/5d1c8f50Ecd9cdfe0/e79035cf3023f3ff.jpg",
        //     secondImg:"https://img14.360buyimg.com/n0/jfs/t1/74337/9/3553/149378/5d1c8f50Ecd9cdfe0/e79035cf3023f3ff.jpg"
        // }

}
    // console.log(this.img_btn);
    // console.log(this.big_img)

    //获取size值
    this.small_wrapper_position=getAbsPosition(this.small_wrapper);
    this.small_cube_size=getSize(this.small_cube);
    this.small_wrapper_size=getSize(this.small_wrapper);
    this.big_wrapper_size=getSize(this.big_wrapper);
    this.big_img_size=getSize(this.big_img);
    // console.log(this.small_wrapper_size)
    // console.log(this.small_cube_size)
    // console.log(this.small_wrapper_position)
    
    this.init();
}
//初始化
Magnifier.prototype.init=function(){
    // console.log(1)
    this.small_wrapper.addEventListener('mouseover',this.show.bind(this));
    this.small_wrapper.addEventListener('mouseout',this.hide.bind(this));
    this.small_wrapper.addEventListener('mousemove',this.hanlderMousemove.bind(this));
    // this.img_btn.onclick=delegation(this.changeImg.bind(this),'.img_box')
    this.img_btn.addEventListener("click" , delegation(this.changeImg.bind(this) , ".img-box"));
    this.img_btn.addEventListener('click',this.changeImgSrc.bind(this));

}
//div显示
Magnifier.prototype.show=function(){
    this.small_cube.style.display='block';
    this.big_wrapper.style.display='block';
    this.small_img.style.opacity = 0.3;
}
//div隐藏
Magnifier.prototype.hide=function(){
    this.big_wrapper.style.display='none';
    this.small_cube.style.display='none';
    this.small_img.style.opacity = 1;
}
//div移动
Magnifier.prototype.hanlderMousemove=function(evt){
    var e=evt||window.event;
    // console.log(e.pageX,e.pageY)
    var x=e.pageX-this.small_wrapper_position.left-this.small_cube_size.width/2;
    var y=e.pageY-this.small_wrapper_position.top-this.small_cube_size.height/2
    // console.log(x,y)
    // this.small_cube.style.left=x+'px';
    // this.small_cube.style.top=y+'px';
    var cube_position=this.boundary(x,y)
    var big_img_position=this.getBigPosition(x,y)
    this.move(cube_position,big_img_position)
}
//边界检测
Magnifier.prototype.boundary=function(x,y){
    x=x<=0?0:x;
    var maxX=this.small_wrapper_size.width-this.small_cube_size.width;
    x=x>=maxX?maxX:x;
    // console.log(maxX)
    y=y<=0?0:y;
    var maxY=this.small_wrapper_size.height-this.small_cube_size.height;
    y=y>=maxY?maxY:y;
    // console.log(maxY)
    // console.log(x,y)
    return{
        x:x,
        y:y
    }
}
//cube移动
Magnifier.prototype.move=function(cube_position,big_img_position){
    this.small_cube.style.left=cube_position.x+'px';
    this.small_cube.style.top=cube_position.y+'px';

    this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";

    this.big_img.style.left=-big_img_position.big_img_x+'px';
    this.big_img.style.top=-big_img_position.big_img_y+'px';
}
//获取大图片Position
Magnifier.prototype.getBigPosition=function(x,y){
    var propx=x/(this.small_wrapper_size.width-this.small_cube_size.width);
    var big_img_x=parseInt(propx*(this.big_img_size.width-this.big_wrapper_size.width))
    // console.log(propx,big_img_x)
    var propy=y/(this.small_wrapper_size.height-this.small_cube_size.height);
    var big_img_y=parseInt(propy*(this.big_img_size.height-this.big_wrapper_size.height))
    // console.log(big_img_x,big_img_y);
    return{
        big_img_x:big_img_x,
        big_img_y:big_img_y
    }
}
//更改图片样式
Magnifier.prototype.changeImg=function(evt){
    // console.log(ele)
    var e=evt||window.event;
    var target=e.target||e.srcElement;
    for( var i=0,be;be=this.img_box[i++];){
        if(target.parentNode===be){
            this.index=i;
        }
        be.className='img-box';
    }
    target.parentNode.className +=' active';
}
//更改图片地址
Magnifier.prototype.changeImgSrc=function(){
    // console.log(this.index)
    this.small_img.src=this.list[this.index].firstImg;
    this.big_img.src=this.list[this.index].secondImg;
    this.small_cube.style.backgroundImage="url("+this.list[this.index].firstImg+")"
}
new Magnifier();