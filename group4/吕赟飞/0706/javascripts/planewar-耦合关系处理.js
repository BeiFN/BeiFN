/**
 * 1. 核心部分 => 难度选择，开场动画，计分，暂停...
 * 2. 飞机     => 跟随移动
 * 3. 子弹     => 飞行移动 , 和敌机的交互(击落)
 * 4. 敌机     => 分类 , 小中大。
 * 
 *  */ 

let { $ , on } = Utils;

 // 核心部分;
 // 1. logo入场 ;
 // 2. 飞机动画 ;
 // 3. 背景运动 ;

 class Core{
      constructor(){
            // 核心元素;
            this.option = $(".options");
            // 难度等级
            this.hardLevel = 0;
            // 初始化功能;
            this.init();
      }
      init(){
            // 绑定事件;
            on(this.option , "click" , this.hanlderClick.bind(this));
      }
      hanlderClick(evt){
            // 处理耦合关系;
            // 记录当前元素的下标;
            // 简单委托;
            let e = evt || window.event;
            let target = e.target || e.srcElement;
            if(target.nodeName !== "P") return false;
            // 获取下标;
            this.setHardLevel(target);
            // 清场;
            this.clearAll();
            // 显示logo;
            this.showAll();
            // 显示飞机动画;

      }
      clearAll(){
            this.option.remove();
      }
      setHardLevel(target){
            this.hardLevel = Array.from(target.parentNode.children).indexOf(target);
      }
      showAll(){
            this.logo = Core.createEle("logo");
            this.plane_loading = Core.createEle("plane-loading");
      }
      // showLogo(){
      //       let ele = document.createElement("div");
      //       ele.className = "logo";
      //       document.body.appendChild(ele);
      // }
      // showPlaneAnimate(){
      //       let ele = document.createElement("div");
      //       ele.className = "plane-loading";
      //       document.body.appendChild(ele);
      // }

      static createEle(className){
            let   ele = document.createElement("div");
                  ele.className = className;
                  document.body.appendChild(ele);
                  return ele;
      }
 }

// 功能调用;

 new Core();
