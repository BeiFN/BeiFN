/**
 * 飞机大战的实现分为四个部分
 * 1.核心部分 2.my_plane 3.bullet 4.enemy_plane
 * 在不同类中分别实现这几个不同部分的功能
 */
//首先实现核心部分
let{$} = Utils
class Core{
      constructor(){
            this.main = $(".main"); 
            this.option = $(".options")
            this.hardLevel = 0;
            this.init();           
      }
      //在init中绑定选择难度的点击事件
      init(){
            //整个界面的运动应该添加一个定时器
            let speed = 0
            this.timer = setInterval(() => {
                  speed += 10;
                  this.main.style.backgroundPositionY = speed + "px";

            }, 100);
            this.option.addEventListener("click", this.handlerClick.bind(this));
      }
      //处理选择难度的点击事件函数，获取下标作为难度的等级
      handlerClick(evt){
            let options = Array.from(this.option.children);
            let e = evt || window.event;
            let target = e.target || e.srcElement;
            this.hardLevel = options.indexOf(target);
            if(this.hardLevel == -1){
                  return false;
            }
            //用户点击选择难度之后进入loading界面，直接调用清场函数
            this.clearAll();
            //清场结束之后进入游戏界面，首先飞机入场
      }
      //处理点击选择完难度后清场的函数
      clearAll(){
            //移出难度选择的元素
            this.option.remove();
            //添加logo元素，添加飞机的loading图标
            let logo = document.createElement("div");
            logo.className = "logo";
            document.body.appendChild(logo);
            let loading = document.createElement("div");
            loading.className = "loading";
            document.body.appendChild(loading); 
            let count = 0;
            let loading_arr = [
                  "https://upload-images.jianshu.io/upload_images/18483085-005ac445289d320e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                  "https://upload-images.jianshu.io/upload_images/18483085-60e3981308e3ab0e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                  "https://upload-images.jianshu.io/upload_images/18483085-354fba30bc68098f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            ]
            let loading_timer = setInterval(()=>{
                  count++;
                  if(count >= 6){
                        clearInterval(loading_timer);
                        loading_timer = null;
                        //清空定时器之后直接跳转到下一个界面
                        logo.remove();
                        loading.remove();
                        my_plane_ins.init();
                  }
                  // console.log(`this.loading_arr[${this.count%3}]`)
                  loading.style.backgroundImage = `url(${loading_arr[count%3]})`;   
            },500);
            
      }
}


class MyPlane{
      constructor(){
            //在MyPlane的构造函数中1.创建飞机元素2.给飞机元素设置属性和定位 3.飞机随着鼠标进行移动
            this.my_plane = MyPlane.createElement("my_plane");
      }


      init(){
            //设置my_plane的属性和位置
            document.body.appendChild(this.my_plane);
            this.my_plane.style.left = document.documentElement.clientWidth/2 - this.my_plane.offsetWidth/2 + "px";
            document.addEventListener("mousemove", this.handlerMouseMove.bind(this));
      }
      static createElement(className){
            let ele = document.createElement("div");
            ele.className = className;
            return ele;
      }
      handlerMouseMove(evt){
            let e = evt || window.event;
            let {x, y} = this.getMyPlanePosition(e);
            //边界检测
            let my_plane_position = this.boundary(x, y);
            this.my_plane.style.left = my_plane_position[0] +"px";
            this.my_plane.style.top = my_plane_position[1] + "px";
      }
      getMyPlanePosition(e){
            let clientX = e.clientX - this.my_plane.offsetWidth/2;
            let clientY = e.clientY - this.my_plane.offsetHeight/2;
            return {x:clientX, y:clientY};            
      }
      //处理边界检测的函数
      boundary(x, y){
            x = x < core.main.offsetLeft ? core.main.offsetLeft : x;
            x = x > core.main.offsetLeft + core.main.offsetWidth - this.my_plane.offsetWidth ? 
            core.main.offsetLeft + core.main.offsetWidth - this.my_plane.offsetWidth : x;
            y = y < core.main.offsetTop ? y < core.main.offsetTop : y;
            y = y > core.main.offsetTop + core.main.offsetHeight - this.my_plane.offsetHeight ? 
            core.main.offsetTop + core.main.offsetHeight - this.my_plane.offsetHeight : y;
            return [x , y]
      }
}


class Bullet{
      constructor(){
            //构造函数中初始化元素的属性
            this.bullet = MyPlane.createElement("bullet");
            this.init()
      }
      //对bullet的处理有 1.创建bullet元素 2.将bullet添加到界面，给元素定位，3.元素的开始的位置随鼠标移动
      //                4.元素的位置随着定时器逐渐向上移动
      init(){
            document.body.appendChild(this.bullet);
            //定位时可以直接从MyPlane类中获得鼠标的位置，然后减去子弹的位置
            document.addEventListener("mousemove", this.getMousePosition.bind(this));
            this.bullet.style.left = this.clientX - this.bullet.offsetWidth + "px";
            this.bullet.style.top = this.clientY - this.bullet.offsetHeight +"px";
      }
      getMousePosition(evt){
            let e = evt || window.event;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
      }
}
new Bullet();
let core = new Core();
let my_plane_ins = new MyPlane();
// //子弹不应该只创建一个，应该放在定时器内循环进行创建，可以和背景共用定时器
// let bullet = new bullet;