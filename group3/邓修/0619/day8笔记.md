# window
 - 提醒框系列
    1. alert() 警告框
    2. confirm() 确认框
    3. prompt() 输入框
    ```javascript
    var bool = confirm("欢迎充值,是否充值那?");
    if(bool){
        // 已经充值;
        var res = prompt("亲，您在哪充值的那?");
        switch(res){
            case "腾讯"   : alert("腾讯:父亲大人"); break; 
            case "网易"   : alert("网易:儿子"); break; 
            case "西山居" : alert("西山居:主子"); break; 
            case "暴雪"   : alert("暴雪:叫爸爸"); break;
        }
    }else{
        alert("请充值");
    }
    ```
 - eval() JS解析器的调用装置
    ```javascript
    alert("hello");
    var jsString = 'alert("hello")'
    eval(jsString);
    ```
    1. eval()的报错：与直接解析JS代码报错一样
    2. eval返回值：JS代码执行的返回值，我们可以参考控制台上的JS代码执行结束后的返回值
 - this指针
    1. this指针是在执行环境之中存在的
    2. this指针可以在全局执行环境之中使用但是不建议这样使用
    3. 建议this使用地点在对象之中
    ```javascript
    function foo(){
        console.log(this);
    }
    // this =>  this指向调用者 ; 
    foo(); // === window.foo()  this => window
    var obj = {
        foo : foo
    }
    obj.foo(); // === obj.foo() this => obj;
    ```
    4. 当事件发生的时候,我们事件处理函数中的this会指向当前发生事件的元素
    5. 定时器中的this指针指向window
# DOM
 - DOM是js最有用的对象,但是是js设计最失败的对象
 - DOM一个复杂庞大消耗性能的很重要的对象
 - DOM的结构; document => 源
 - html => 根dom ; root
 **增删改查**
 1. 查：选择器，原生提供的选择器性能很差
    - id选择器：getElementById()
    - tag选择器：getElementsByTagName()
    - name选择器：getElementsByName()
    - class选择器：getElementsByClassName()
    - query选择器：
        - querySelector()       // 选择单个元素的
        - querySelectorAll()    // 选择多个重复元素的
**所有多个元素选择器;  获取来的元素一定是伪数组**
 2. 增
    createElement() 创建元素节点
    appendChild() 向后插入元素节点
    insertBefore() 向前插入元素节点
    **如果appendChild或insertBefore操作的元素是已经存在于页面上的元素，那么appendChild会做两件事：
        1.  删除掉页面上的这个元素
            2.  重新对元素进行插入
 3. 删
    - 兼容性良好的版本：
    ```javascript
    var box = document.getElementById("box");
    console.log(box);
    document.body.removeChild(box);
    //简化写法;
    //parentNode => 找到父级节点;
    console.log(box.parentNode); 
    box.parentNode.removeChild(box);
    ```
    - 语法升级：
    ```javascript
    box.remove();
    ```
 4. 改
    1. 内容
        - dom.innerHTML
        - dom.innerText
        **区别：使用标签字符串时，innerHTML会解析标签，而innerText不会
    2. 属性
    三个操作属性的API：setAttribute() getAttribute() removeAttribute()
    ```javascript
    box.setAttribute("hello","world");
    box.setAttribute("hello","world22222");
    box.removeAttribute("id");
    console.log(box.getAttribute("class"));
    ```
    3. 元素样式的获取
        - dom.style.属性：这样的形式赋值还行，但是取值尽量不用，因为只能获取行内样式；而且对性能消耗及其严重
        - offset系列：对于线上图片无法获取宽高(获取到的是盒模型的宽高，包含填充和边框)
        ```javascript
        // 如果是一张图片 ; img => onload;
        img.onload = function(){
            console.log(img.offsetWidth)
        }
        //多张图片使用 window.onload
        window.onload = function(){
            console.log(img.offsetWidth);
        }
        ```
        - 为啥offset系列方法耗性能？ 因为会导致回流和重绘
        - 准确获取css内部宽度的方法
        ```javascript
        img.onload = function(){
            console.log(getComputedStyle(img)["width"]);
        }
        ```