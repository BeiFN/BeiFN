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
//构造函数
function Magnifier(){
    this.small_wrapper=$('.small-img');
    this.small_img=$('.small-img img');
    this.small_cube=$('.cube');
    // console.log(this.small_wrapper,this.small_img,this.small_cube)
    this.big_wrapper=$('.big-img');
    this.big_img=$('.big-img img');
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
}
//div显示
Magnifier.prototype.show=function(){
    this.small_cube.style.display='block';
    this.big_wrapper.style.display='block';
}
//div隐藏
Magnifier.prototype.hide=function(){
    this.big_wrapper.style.display='none';
    this.small_cube.style.display='none';
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
new Magnifier();