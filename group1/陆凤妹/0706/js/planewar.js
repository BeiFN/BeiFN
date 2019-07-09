// 核心部分
// 1、logo动画
// 2、飞机动画
// 3、背景运动



// 工具库的引用

let { $,on } = Utils;




class Core{
    constructor(){
// 元素事件绑定
//  核心元素
   this.main = $(".main"); 
   this.option  = $(".options");
//    难度等级
   this.hardLevel = 0;
        // 开始  初始化功能
      this.init();
    }
    init(){
        // 绑定事件
    on(this.option,"click",this.handlerClick.bind(this))
    }
    handlerClick(evt){  //点击的时候，要记录当前元素的下标
        // 处理耦合关系
       
        // 记录当前元素的下标  没有for循环  不适合闭包5

        // 简单委托

        let e = evt || window.event;
        let target = e.target || e.srcElement;
//    进行目标判定
        if(target.nodeName !=="P") return false;

        // 获取下标  
                           
     

   this.setHardLevel(target);  //放入target，就可以使用target的东西了
// console.log(this.hardLevel);
// 清场
    this.clearAll();
// 合并两个功能
    this.showAll();
    // 显示logo logo入场
    // this.showLogo();
    // 显示飞机动画
    // this.showPlaneAnimate();


    // 动画执行

    this.animate();

// 动画开始  动画不可能一直执行下去，需要停止进行游戏

   setTimeout(()=>{
       this.clearAll();
       this.gameStart();
   },3000)


    }
    clearAll(){
        this.option?this.option.remove():"";
        clearInterval(this.loading);
        this.logo?this.logo.remove():"";
        this.plane_loading?this.plane_loading.remove():"";
    }
    setHardLevel(target){
        // 找到父级里的所有自己
             //   转换成纯数组
        this.hardLevel = Array.from(target.parentNode.children).indexOf(target);
    }
    showAll(){

// l考虑删除
       this.logo = Core.createEle("logo");
       this.plane_loading = Core.createEle("plane-loading");
    }
    // showLogo(){
    //     let ele = document.createElement("div");
    //     ele.className = "logo";
    //     // 把div插入页面
    //     document.body.appendChild(ele);

    // }
    // // 放屁飞机
    // showPlaneAnimate(){
    //     let ele = document.createElement("div");
    //     ele.className = "plane-loading";
    //     document.body.appendChild(ele);

    // }
// 封装统一功能


animate(){
    // 开动定时器进行飞机放屁
 let index = 0;
    // this.loading = setInterval(() => {
    //     // 这个怎么写？
    //     // this.plane_loading.style.backgroundImage = `url(https://upload-images.jianshu.io/upload_images/14040632/loading${++index % 3 + 1}.png)`
      
    //     // this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3 + 1}.png)`;
    // },800);


    this.loading = setInterval(()=>{
        index ++;
        // console.log("loading",index);

        if(index%3 === 0){
            //   console.log("ss");
              this.plane_loading.style.backgroundImage = `url("https://upload-images.jianshu.io/upload_images/2845301-4483375ae7043942.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240")`;

        }else if(index%3 === 1){
            //   console.log("ss3");

              this.plane_loading.style.backgroundImage = `url("https://upload-images.jianshu.io/upload_images/2845301-c53b48a9025ef930.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240")`;

        }else{
            //   console.log("ss2");

              this.plane_loading.style.backgroundImage = `url("https://upload-images.jianshu.io/upload_images/2845301-ecb7640ccd9e7b77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240")`;

        }
        
        // console.log(index);
        // this.plane_loading.style.backgroundImage = `url(./images/loading${++index%3+1}.png)`;
  },500);




    // 背景动画

    let positionY = 0;
//    难度增加
let speed = 5;
switch(this.hardLevel){
    case 0 :speed = 20; break;
    case 1 :speed = 8; break;
    case 2 :speed = 5; break;
    case 3 :speed = 20; break;
}

    this.bg_moving = setInterval(()=>{
        positionY += speed;
        this.main.style.backgroundPositionY = positionY + "px";
        
    },50)
}

gameStart(){
    // 游戏开始
    // console.log("游戏开始")
 plane.init();
}
static createEle(className){
       let ele = document.createElement("div");
        ele.className = className;
        // 把div插入页面
        document.body.appendChild(ele); 

        return ele;



}
}

class Plane{
    constructor(){
        
}
init(){
    this.ele = this.createPlane();
    // 调用 // 1、创建元素并放入页面之中
    //   this.createPlane();
    on(document,"mousemove",this.planeMove.bind(this));
   

}
planeMove(evt){
    let e = evt || window.event;
    let [x,y] = [
        e.clientX ,
        e.clientY
    ]
    this.ele.style.left = x + "px";
    this.ele.style.top = y + "px";

}
createPlane(){
  
    let ele = document.createElement("div");
    ele.className = "plane";
    let cWidth = document.documentElement.clientWidth;
    document.body.appendChild(ele);
    ele.style.left = cWidth / 2  + "px";   //js控制飞机的位置
    // console.log(ele.offsetWidth )
    return ele;
    
}
}
// 功能调用
new Core();

let plane = new Plane();