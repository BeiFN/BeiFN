# 什么是事件委托
 *常规的事件绑定会导致大量冗余事件;我们解决这样的问题时通常会使用事件的委托*
 1. 多次绑定事件时使用事件委托 , 防止事件冗余;
 2. 动态生成元素的事件绑定;
 #### 事件委托:
 1. 我们把原本绑定(监听)给多个元素的事件，监听给这些元素的父级
 2. 在触发阶段验证事件源的身份，来辨别事件触发是否合法
 ```javascript
 var ul = document.querySelector("ul");
 ul.addEventListener("click",function(evt){
    // console.log("hello");
    // 做一个判断;
    // 当前发生事件的事件源，是不是我们想要绑定事件的元素;
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    // 要求 , 事件源是 li;
    if(target.nodeName === "LI"){
        console.log("hello world");
        // target即为当前发生事件的元素;
        target.style.background = "yellowgreen";  
    }
 });
 ```
 #### 事件委托的封装
 *事件委托在封装啥呢 ? ===> 我们在封装判定*
 - 问题 ： 事件绑定时不太好传递参数
 - 解决 ,函数内部返回一个函数不就可以了么
 *delegation => 整合两个函数 ; 1. 匿名函数; 2. 事件处理函数(handlerClick);*
 1. 事件执行的时候,匿名函数会执行;
 2. 匿名函数的作用是判定是不是应该调用事件处理函数;
 ```javascript
 var ul = document.querySelector("ul");
 ul.addEventListener("click",delegation(handlerClick,"LI"))
 function delegation(handlerClick , selector ){
    return function(evt){
        // console.log(this); // 永久指向ul
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        // console.log("匿名函数",target);
        if(target.nodeName === selector){
            handlerClick.call(target,e);
        }
    }
 }
 ```
 - 优化点:解决点击子元素事件不触发的bug
 ```javascript
 var ul = document.querySelector("ul");
 ul.addEventListener("click", delegation(handlerClick, ".lilili"))
 function delegation(handlerClick, selector) {
    return function (evt) {
        var eleList = this.querySelectorAll(selector);
        // console.log(eleList);
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        var targetFamily = [];
        var _temp = target;
        var count = 0;
        while (true && count++ < 100) {
            if (_temp === this) {
                break;
            }
            targetFamily.push(_temp)
            _temp = _temp.parentNode
        }
        // console.log(targetFamily ,target) ;
        // 判定target是不是在这个数组之中;
        for (var i = 0, ele; ele = eleList[i++];) {
            if (targetFamily.length === 1 ? (target === ele) : (targetFamily.indexOf(ele) !== -1)) {
                handlerClick.call(ele, e);
                break;
            }
        }
    }
 }
 function handlerClick(e) {
    // console.log("事件执行",this,e);
    this.style.background = "yellowgreen";
 }
 ```
 [案例-todolist](..\随堂\0625\04todolist.html)
# ES5
 *是目前公认的我们稳定兼容的版本*
 1. 严格模式;  
    - 开启 "use strict"
    - 1. 全局严格 2. 局部严格
    - 划分
        1. 变量的严格:严格模式下变量必须先声明再赋值
        2. 参数的严格:形参被赋值不会影响到arguments里面的参数
        3. 函数的严格:函数之间必须用分号隔开
        4. *一个语法的注意事项:不允许使用arguments.callee*
 2. 扩展了数组类型的方法;
    - forEach:会接受一个函数作为参数,并在方法内调用*参数函数*数组项数次;没有返回值 返回值为undefined
    - map:返回一个新数组，新数组之中装的是参数函数的返回值
    - filter:返回新数组.会根据参数函数的返回值判定是否该讲具体的项加入新数组
    - some:判定数组中是否存在某个符合条件的;一旦找到符合条件的值,那么就会终止循环，并且返回true,否则返回false
    - every:判定数组中是否存在不符合条件的;一旦找到不符合条件的值,那么就会终止循环，并且返回false,否则返回true
    - flat:对数组进行扁平化,即将二维或多维数组转化为一维数组
 3. 扩展了部分对象里的方法;
    Object.defineProperty():1. 属性拦截器形态;2. 设置属性的各个特性;
    ```javascript
    Object.defineProperty( obj , "a" , {
        // 不可删除;
        configurable : true,
        // 不可枚举;
        enumerable : true,
        value : "hello world",
        //可写入
        writable : true
    });
    ```
    ```javascript
    var obj = {
        $data : {}
    }
    Object.defineProperty( obj , "a" , {
        get : function(){
            // this => obj 当前对象;
            // console.log(this);
            return this.$data.a;
        },
        set : function(val){
            // val => 设置的参数
            // console.log("hello");
            // 因为在a设置值的时候已经被作为一个拦截器而进行set处理了,那么这时候我们不能给a直接赋值;
            return this.$data.a = val;
        }
    });
    ```
    ```javascript
    var obj = {
        $data : {}
    }
    Object.defineProperty( obj , "a" , {
        get : function(){
            return this.$data.a++;
        },
        set : function(val){
            return this.$data.a = val;
        }
    })   
    // console.log(obj);
    obj.a = 1;
    console.log(obj.a === 1 && obj.a === 2 && obj.a === 3 && obj.a === 4);
    ```
 4. 提供了新的对象 JSON;