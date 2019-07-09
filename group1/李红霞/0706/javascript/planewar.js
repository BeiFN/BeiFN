/**
 * 飞机大战的实现分为四个部分
 * 1.核心部分 2.my_plane 3.bullet 4.enemy_plane
 * 在不同类中分别实现这几个不同部分的功能
 */
//首先实现核心部分
let{$} = Utils
class Core{
      //声明一个静态是数组存放bullet
      static bullet_list = [];
      //声明一个静态的数组存放enemy_plane;
      static enemy_plane_list = [];
      static main_width;
      static main_height;
      static main_top;
      static main_left;
      constructor(){
            this.main = $(".main"); 
            this.option = $(".options")
            this.hardLevel = 0;
            this.init();           
      }
      //在init中绑定选择难度的点击事件
      init(){
            //整个界面的运动应该添加一个定时器
            Core.main_width = this.main.offsetWidth;
            Core.main_height = this.main.offsetHeight;
            Core.main_left = this.main.offsetLeft;
            Core.main_top = this.main.offsetTop;
            let speed = 0;
            let count = 0;
            this.click = 0;
            let enemy_plane_ins = null;
            this.timer = setInterval(() => {
                  speed += 10;
                  this.main.style.backgroundPositionY = speed + "px";  
                  if(this.click == 1){
                        count++;
                  }
                  count++;
                  if(this.click == 1 && count >= 6){
                        let bullet_ins = new Bullet();
                        // console.log(bullet_ins.bullet)
                        Core.bullet_list.push(bullet_ins);
                        if(count%3 == 0 && Math.random()>0.3){
                              enemy_plane_ins = new EnemyPlane("small_plane");
                              Core.enemy_plane_list.push(enemy_plane_ins);
                        }
                        if(count%5 == 0 && Math.random() > 0.5){
                              enemy_plane_ins = new EnemyPlane("middle_plane");
                              Core.enemy_plane_list.push(enemy_plane_ins);
                        }
                        if(count%10 == 0 && Math.random() > 0.7){
                              enemy_plane_ins = new EnemyPlane("big_plane");
                              Core.enemy_plane_list.push(enemy_plane_ins);
                        }
                  }
                  this.collideCheck();
            },500);
            this.option.addEventListener("click", this.handlerClick.bind(this));
      }
      //处理选择难度的点击事件函数，获取下标作为难度的等级
      handlerClick(evt){
            this.click = 1;
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
      //创建完所有的子弹和敌机之后开始碰撞检测，对比的是两个数组内的元素的位置是否存在重合
      collideCheck(){
            if(Core.enemy_plane_list.length == 0 || Core.bullet_list.length == 0){
                  return false;
            }
            for(let i = 0, enemy_ins; enemy_ins = Core.enemy_plane_list[i]; i++){
                  for(let j = 0, bul_ins; bul_ins = Core.bullet_list[j]; j++){
                        //如果bul_ins.bullet.offetLeft + bul_ins.bullet.offetWidth > eneny_ins.offetLeft
                        //并且 bul_ins.bullet.offetLeft < enemy_ins.enemy_plane.offetLeft + enemy_ins.enemy_plane.offsetWidth即为碰撞
                        //如果bul_ins.bullet.offetTop + bul_ins.bullet.offetHeight > eneny_ins.offetTop
                        //或者 bul_ins.bullet.offetTop < enemy_ins.enemy_plane.offetTop + enemy_ins.enemy_plane.offsetHeight即为碰撞
                        // console.log(enemy_ins.enemy_plane.offsetWidth, bul_ins.bullet.offsetWidth);
                        if(bul_ins.bullet.offsetLeft + bul_ins.bullet.offsetWidth >= enemy_ins.enemy_plane.offsetLeft && bul_ins.bullet.offsetLeft <= enemy_ins.enemy_plane.offsetLeft + enemy_ins.enemy_plane.offsetWidth){
                              if(bul_ins.bullet.offsetTop + bul_ins.bullet.offsetHeight >= enemy_ins.enemy_plane.offsetTop && bul_ins.bullet.offsetTop <= enemy_ins.enemy_plane.offsetTop + enemy_ins.enemy_plane.offsetHeight){  
                                    //炮弹的死亡过程先关闭定时器再开始动画
                                    bul_ins.bullet.setAttribute("state","die");
                                    bul_ins.bullet.className += " die";

                                    // 等待动画完成;
                                    setTimeout( ()=>{
                                          bul_ins.bullet.remove();
                                    },500)   
                                    //敌机的死亡过程
                                    enemy_ins.enemy_plane.setAttribute("state","die");
                                    enemy_ins.enemy_plane.className += " die";
                                    //等待动画完成
                                    setTimeout( ()=>{
                                          enemy_ins.enemy_plane.remove();   
                                    },500);

                              }
                        }
                  } 
            }
      }
}

class MyPlane{
      static my_plane;
      constructor(){
            //在MyPlane的构造函数中1.创建飞机元素2.给飞机元素设置属性和定位 3.飞机随着鼠标进行移动
            this.my_plane = MyPlane.createElement("my_plane");
            MyPlane.my_plane = this.my_plane;
      }
      init(){
            //设置my_plane的属性和位置
            document.body.appendChild(this.my_plane);
            MyPlane.my_plane_width = this.my_plane.offsetWidth;
            MyPlane.my_plane_height = this.my_plane.offsetHeight;
            this.my_plane.style.left = document.documentElement.clientWidth/2 - this.my_plane.offsetWidth/2 + "px";
            MyPlane.startX = this.my_plane.offsetLeft;
            MyPlane.startY = this.my_plane.offsetTop;
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
            MyPlane.x = x;
            MyPlane.y = y;
            return [x , y];
      }
      static x;
      static y;
      static my_plane_width;
      static my_plane_height;
      static startX;
      static startY;
}

//创建按钮的类
class Bullet{
      constructor(){
            this.speed = 0;
            this.init();
      }
      //在bullet的类中需要用到定时器
      init(){
            this.bullet = MyPlane.createElement("bullet");
            document.body.appendChild(this.bullet);
            this.bulletStart();
            this.bulletMove();
      }
      bulletStart(){
            let x = MyPlane.x ? MyPlane.x : MyPlane.startX;
            let y = MyPlane.y ? MyPlane.y : MyPlane.startY;
            this.bullet.style.left = x + MyPlane.my_plane_width/2  +"px";
            this.bullet.style.top = y - this.bullet.offsetHeight + "px";
      }
      bulletMove(){
            if(this.bullettimer == undefined){              
                  this.bullettimer = setInterval(() => {
                        this.speed = -10;
                        if(this.bullet.getAttribute("state") == "die"){
                              clearInterval(this.bullettimer);
                        }
                        this.bullet.style.top  = this.bullet.offsetTop + this.speed + "px";  
                        if(this.bullet.offsetTop <= 20){
                              // console.log(Core.bullet_list)
                              // let bulletIndex = Core.bullet_list.indexOf(this.bullet);
                              // console.log(this.bullet)
                              // console.log(bulletIndex)
                              for(let i = 0; i < Core.bullet_list.length; i++){
                                    if(Core.bullet_list[i].bullet == this.bullet){
                                          Core.bullet_list.splice(i, 1);
                                          break;
                                    }
                              }
                              
                              this.bullet.className += " die";

                              // 等待动画完成;
                              setTimeout( ()=>{
                                    this.bullet.remove();
                              },500)   

                              clearInterval(this.bullettimer);

                        }
                  }, 50);
            }
      }
}

class EnemyPlane{
      constructor(sizeClassName){  
            //创建不同的大小的enemy_plane
            this.init(sizeClassName);
      }
      init(sizeClassName){
            this.enemy_plane = MyPlane.createElement(sizeClassName);
            // console.log(this.enemy_plane)
            document.body.appendChild(this.enemy_plane);
            //创建出enemy_plane之后设置enemy_plane的位置，敌机的位置应该是随机的
            //敌机的top的初始位置应该为0，下边的边界应该是main的height - 飞机height
            //敌机的left的初始位置应该是从main的clientLeft到
            //main的clientLeft+ main.offsetWidth-飞机的offsetWidth的之间的随机数
            //需要获取的值有 
            // console.log(Core.main_width,Core.main_height,Core.main_left,Core.main_top)
            this.enemy_plane.style.left = Core.main_left + Math.round(Math.random()*(Core.main_width  - this.enemy_plane.offsetWidth)) +"px";
            this.enemy_plane.style.top = 0;
            //创建好飞机并且出现在页面上的正确的位置之后开始运动
            this.enemyMove();
      }
      enemyMove(){
            //敌机运动时，敌机的left不变，只是改变敌机的top
            let speed = 10;
            let enemy_plane_timer = setInterval(() => {
                  if(this.enemy_plane.getAttribute("state") == "die"){
                        this.enemy_plane.style.top = this.enemy_plane.offsetTop;
                  }else{
                        this.enemy_plane.style.top = this.enemy_plane.offsetTop + speed + "px";
                  }
                  if(this.enemy_plane.offsetTop > Core.main_height- this.enemy_plane.offsetHeight){
                        
                        for(let i = 0; i < Core.enemy_plane_list.length; i++){
                              if(Core.enemy_plane_list[i].enemy_plane == this.enemy_plane){
                                    Core.enemy_plane_list.splice(i, 1);
                              }
                        }

                                    //敌机的死亡过程
                                    this.enemy_plane.setAttribute("state","die");
                                    this.enemy_plane.className += " die";
                                    //等待动画完成
                                    setTimeout( ()=>{
                                          this.enemy_plane.remove();   
                                    },500);


                        // this.enemy_plane.remove();
                        clearInterval(enemy_plane_timer);
                  }
            }, 100);
      }
}

//创建敌机时应该在定时器中进行创建，
// let enemy_plane_ins = new EnemyPlane();
//创建bullet应该在定时器中创建，
// let bullet_ins = new Bullet();
let core = new Core();
let my_plane_ins = new MyPlane();
