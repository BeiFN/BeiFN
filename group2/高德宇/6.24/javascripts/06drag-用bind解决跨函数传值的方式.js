var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");


var _tempDragMove = null;
//点击拖拽条,才可以实现拖拽运动。
function handlerDragStart(evt){
      // console.log("拖拽开始");
      // 在此要获取鼠标点击时,距离元素边缘的x值和y值;
      var e = evt || event;
      // * handlerDragStart 函数中的x值和y值，想要给DragMove进行使用,应该咋办?
      topBar.addEventListener("mousemove" , _tempDragMove = handlerDragMove.bind( false , {offsetX : e.offsetX , offsetY : e.offsetY}));
      // console.log(handlerDragMove);
}

// 点击第一次 handlerDragMove => 柯里化函数;

function handlerDragMove(_offset,evt){
      // console.log("拖拽进行中");
      var e = evt || event;
      // console.log(e);

      // 统一 ; 
      // 选择client,为了和box定位的元素统一; 

      // 出现了一个bug ,现在的元素跟着鼠标坐标的点去进行定位 。 鼠标在元素的左上角。
      // 让元素定位时将鼠标包含在内,向左移，向上移。
      // 向 左  ？ 向 上 ？

      // console.log(GLOBAL.offsetX,GLOBAL.offsetY);
      box.style.left = e.clientX - _offset.offsetX + "px";
      box.style.top = e.clientY - _offset.offsetY + "px";

}
function handlerDragEnd(){
      // console.log("拖拽结束");
      topBar.removeEventListener("mousemove" ,  _tempDragMove);
}



topBar.addEventListener("mouseup" , handlerDragEnd );
topBar.addEventListener("mousedown" , handlerDragStart);



// function foo(){
//       console.log("foo",this);
// }

// foo = foo.bind({say:"hello"})
// foo = foo.bind({say:"hillo"})
// foo = foo.bind({say:"hollo"})
// console.log(foo);
// foo();