**问题1  怎么封装getAttribute() 方法？**
```javascript
        function myGetAttribute(ele){
            var attrList = ele.attributes;
            var arr = []
            for(var i = 0 ;i<attrList.length;i++){
                arr[i] = attrList[i]
            }
            return arr;
        }
```

**问题2  box.createAttribute("test");和this.createAttribute(key);的差别在哪？我的理解this指向的就是box，为什么第一个方法会报错，而第二个是正常的？**
```javascript
<body>
        <div id="box0" data-id="hello">
                <span>hello world</span>
        </div>
    <script>

        var box = document.getElementById("box0");

        // var test = box.createAttribute("test");
        // test.nodeValue = "testValue1";
        // console.log(box);
        /*
        attribute.html:19 Uncaught TypeError: box.createAttribute is not a function
        at attribute.html:19
        */
        function setAttribute(key,value){
			var myAttr = this.createAttribute(key);
			myAttr.nodeValue = value;
            // var test1 = document.createAttribute(key);
		    // test1.nodeValue = value1;
		    // this.setAttributeNode(test1);
		    // console.log(box);
		}
        box.setAttribute("test1","lulizhong1");
        // box.setAttribute("test2","lulizhong2");
        console.log(box);
// 解决： 创建属性的方式是： var attr = document.createAttribute("属性名")   attr.nodeValue = "test"    
//自定义的函数的调用的方式是  setAttribute(key,"value")   
    </script>
</body>
```


**问题3 外部函数的变量timer是否被内部函数引用？外部函数被调用时，内部函数是否立即执行，是否构成了闭包？timer赋值null后，数据被清空，timer这个变量是否还在？**
   ![image.png]https://upload-images.jianshu.io/upload_images/18429017-2a03b77d346fdfd5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
>解决：是被内部函数引用,内部函数在定时器设定的时间后执行,构成闭包,timer这个变量在赋值为null之后不久会被垃圾回收机制回收


**问题4 两种创建节点的区别**

添加属性节点
方法一:
var myAttr = document.createAttribute("data-hello");
myAttr.nodeValue = "helloWorld";
box.setAttributeNode(myAttr);
方法二:
box.setAttribute("data-hello","helloworld");
添加文本节点
方法一：
var textNode = document.createTextNode("hello world");
box.appendChild(textNode);
方法二：
box.innerHTML = "hello world"
box.innerText = "hello world" 
>解决：没有区别,只是一个是封装好的,一个是一步一步实现的


**问题5 跳转页面时，什么时候用open(),什么时候用location.href = ""；**
>解决：
* location.href   原页面改变
* open            打开新页面


**问题6 bind指向对象传false该怎么理解？是说它不固定指向吗？**
>解决：传入 false 就是不改变 this 指向。


**问题7 事件委托封装里的创建按钮函数里传不传参数e,有什么区别和影响吗？啥时候该传，啥时候不用传？**
![image.png](https://upload-images.jianshu.io/upload_images/12728563-ac3ff12e234d0226.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>解决  当事件处理函数中需要使用事件对象的时候就需要传过去,如果不需要就可以不传


**问题8 这段代码看不太懂。**
![image.png](https://upload-images.jianshu.io/upload_images/2845301-15ce0512765d711b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> 面向对象 ; 构造函数,原型实例。 稍后会学习。


**问题9 正则表达式中的全局修饰符g和贪婪匹配的关系，有全局修饰符，一定是贪婪吗？**
> 贪婪      是和量词有关的。  +  *  ?  
> 尽可能多的匹配符合规则的字符。   一次尽可能匹配更多;
> 修饰符 g  驱动方法多次匹配;      在整条字符串上多次进行匹配;


**问题10 提问在图中 代码如下**
![image.png](https://upload-images.jianshu.io/upload_images/12728563-ebac1f33e890622d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```javascript
			var arr = [[1,2,3,4,5],[3,4,5,6,7],5,6];
			function flat(arr){
				// if(!flat.res){
				if(arguments.length === 1){
					flat.res = [];
				}

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script type="text/javascript">
			var arr = [[1,2,3,4,5],[3,4,5,6,7],5,6];
			function flat(arr){
				if(!flat.res){
					flat.res = [];
				}
				
				for(var i = 0 ; i<arr.length;i++){
					if( !(arr[i] instanceof Array) ){
						flat.res.push(arr[i]);
					}else{
						flat(arr[i] , false);
						flat(arr[i]);
					}
				}
				return flat.res;
			}	
			var arr2 = [1,2,3,4]
			console.log(flat(arr));
			console.log(flat(arr2));
```
* 递归时我们去进行区分，是外部调用 ; 还是内部递归用。 根据两种情况进行区分操作。

**问题11 智哥，问两个 VScode的快捷键。  超出可视区域的代码或者注释 是怎么自动换行的？怎么同时选中相同的函数名一起修改？**
* ALT + Z 
* CTRL + D


**问题12 智哥，replace()如何替换多个内容，比如我能在输入框里一下子输入 ：术语、正则，然后替换吗？**
* 匹配到了更多内容。 => 规则允许更多内容; 
* 把规则写好，写全那么replace 会自动帮你进行匹配的;
var reg = /术语|正则/g; 

**问题13**
![QQ截图20190629081155.png](https://upload-images.jianshu.io/upload_images/14040632-322f62a373dfaefd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
* 组 : 在正则表达式中 `()` 代表组 , 你在后面进行使用的时候 可以用 $n 去替代 , n是怎么去赋值的那 ? 从左到右第一个组为1(第一个括号之中的内容)

**问题14 在高级查找中，再次查找前如何清除清除上次查找到的高光标记？？？**
```html
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <style>
            span{
                  background: yellowgreen;
            }
      </style>

</head>
<body>
      <input type="text" id="search"> 
      <p id="content">
                  <span>正则</span>  表达式的“鼻祖”或许可一直追溯到科学家对人类神经系统工作原理的早期研究。美国新泽西州的Warren McCulloch和出生在美国底特律的Walter Pitts这两位神经生理方面的科学家，研究出了一种用数学方式来描述神经网络的新方法，他们创造性地将神经系统中的神经元描述成了小而简单的自动控制元，从而作出了一项伟大的工作革新。
                  在1951 年,一位名叫Stephen Kleene的数学科学家，他在Warren McCulloch和Walter Pitts早期工作的基础之上，发表了一篇题目是《神经网事件的表示法》的论文，利用称之为正则集合的数学符号来描述此模型，引入了正则表达式的概念。正则表达式被作为用来描述其称之为“正则集的代数”的一种表达式，因而采用了“正则表达式”这个术语。
                  之后一段时间，人们发现可以将这一工作成果应用于其他方面。Ken Thompson就把这一成果应用于计算搜索算法的一些早期研究，Ken Thompson是 Unix的主要发明人，也就是大名鼎鼎的Unix之父。Unix之父将此符号系统引入编辑器QED，然后是Unix上的编辑器ed，并最终引入grep。Jeffrey Friedl 在其著作《Mastering Regular Expressions (2nd edition)》（中文版译作：精通正则表达式，已出到第三版）中对此作了进一步阐述讲解，如果你希望更多了解正则表达式理论和历史，推荐你看看这本书。
                  自此以后，正则表达式被广泛地应用到各种UNIX或类似于UNIX的工具中，如大家熟知的Perl。Perl的正则表达式源自于Henry Spencer编写的regex，之后已演化成了pcre（Perl兼容正则表达式Perl Compatible Regular Expressions），pcre是一个由Philip Hazel开发的、为很多现代工具所使用的库。正则表达式的第一个实用应用程序即为Unix中的 qed 编辑器。
                  然后，正则表达式在各种计算机语言或各种应用领域得到了广大的应用和发展，演变成为计算机技术森林中的一只形神美丽且声音动听的百灵鸟。
                  以上是关于正则表达式的起源和发展的历史描述，如今正则表达式在基于文本的编辑器和搜索工具中依然占据着一个非常重要的地位。
                  在最近的六十年中，正则表达式逐渐从模糊而深奥的数学概念，发展成为在计算机各类工具和软件包应用中的主要功能。不仅仅众多UNIX工具支持正则表达式，近二十年来，在WINDOWS的阵营下，正则表达式的思想和应用在大部分 Windows 开发者工具包中得到支持和嵌入应用！从正则式在Microsoft Visual Basic 6 或 Microsoft VBScript到.NET Framework中的探索和发展，WINDOWS系列产品对正则表达式的支持发展到无与伦比的高度，几乎所有 Microsoft 开发者和所有.NET语言都可以使用正则表达式。如果你是一位接触计算机语言的工作者，那么你会在主流操作系统（*nix[Linux, Unix等]、Windows、HP、BeOS等）、主流的开发语言（delphi、Scala、PHP、C#、Java、C++、Objective-c、Swift、VB、Javascript、Ruby以及Python等）、数以亿万计的各种应用软件中，都可以看到正则表达式优美的舞姿。
      </p>

      <script>
            var content = document.getElementById("content");
            var search = document.getElementById("search");
            search.addEventListener("keydown" , function(evt){
                  var e = evt || window.event;
                  var keyCode = e.keyCode || e.which;
                  if(keyCode === 13){
                        heighLight();
                  }
            })
            
            function heighLight(){
                  var value = search.value ; 
                  var contentText = content.innerHTML;
                  // console.log()
                  var nowReg = new RegExp("("+value+")","g");
                  // content.innerHTML = contentText.replace(nowReg  , "<span>"+ value +"</span>")
                  // console.log(nowReg);
                  // 在替换时得到匹配的内容(匹配的结果);
                  content.innerHTML = contentText.replace(nowReg  , "<span> $1 </span>")
            }        
      </script>
</body>
</html>
```
```javascript
      var regSpan = /<\/?span>/g
```


**问题15 为什么要在表单验证里的匿名函数传入window对象,有什么作用?我试过,不传window也行**
* 减少原型链访问的次数,优化性能; 我们只会传window , 或者jQuery 。


**问题16 这两个设置属性的语句有啥区别么?**
![img](https://upload-images.jianshu.io/upload_images/18300474-5a22c85611781f7e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>解决:li[i].index = i 设置的属性是不会在标签中显示的 而li[i].setAttribute("index",1)是在标签中设置了属性为index值为1的属性


**问题17 上面删掉之后  下面还能获取到rec.ele么?**
![img](https://upload-images.jianshu.io/upload_images/18300474-e68a66db54778fa4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>解决：rec.ele已经获取到了数组中元素的引用,下面的操作是在数组中删除记录,但是rec.ele已经获取到了引用,所以不会影响到


**问题18 border-radius: 5px;加上这条属性mouseup失效**
  ![](https://upload-images.jianshu.io/upload_images/18300474-d866a350fbf73e68.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>解决：因为元素的位置随着鼠标移动,元素的位置设置是将左上角挨着鼠标,.当元素的设置border-radius之后,鼠标的位置没有元素,所以移动会失效


**问题19 事件绑定范围太小，border-radius 设置之后事件无法触发;**
> 更改 事件触发范围为document即可;


**问题20 获取事件源，目标阶段的那个元素不用绑定事件也能获取到吗？**
   ![image.png](https://upload-images.jianshu.io/upload_images/18300474-492c7dbdada04613.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>所有document或者window接受到的事件都是冒泡|捕获来的;


**问题21 为什么类型判断的时候不能用Number判断呢?**
```javascript
    function myFlat(arr) {
    if (!myFlat.newArr) {
        myFlat.newArr = [];
    }
    for (var i = 0; i < arr.length; i++) {
        // if(new Number(arr[i]) instanceof Number);//为啥不能用Number判断？
        // typeof => 基本类型;
        if (!(arr[i] instanceof Array)) {
            myFlat.newArr.push(arr[i]);
        } else {
            myFlat(arr[i]);
        }
    }
    return myFlat.newArr;
    }
```
> instance => 实例;
> of        
> 实例 : new Number(); => 构造函数构造出来的对象。
> 基本类型和构造函数构造出来的类型。
> 基本类型 : 是一个纯数据;  不存在太多高级引用关系。
> 构造出来的基本类型 : 因为是一个对象，所以具备所有js对象的特征，比较复杂。


**问题22 如下图,给密码设置完密码强度之后,当需要判断密码强度时,起始的密码正则(策略列表里的password)长度就会失效**
![image.png](https://upload-images.jianshu.io/upload_images/18300474-c2da4bf5fd8e6423.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
* 优化逻辑判定文字符合规则之后终止程序。


**问题23 输出的是什么意思？为什么上面是length是2，下面显示是**
![img.png](https://upload-images.jianshu.io/upload_images/18306946-7d6c11dbc011b138.png?imageMogr2/auto-orient/)

> 输出的是  box元素的所有属性节点。 以列表的形式存在(伪数组) ;  
> 后面的代码没有注意到 ，要注意看整体代码呦 !  js没有灵异现象呦!


**问题24 DOM 、Document、Bom 、Location接口和Window对象中的location 的关系是啥？Location,Document接口、Window对象、元素和DOM 元素和Document他们之间到底是什么关系呐？就是这一大串，关系傻傻分不清楚。。。是JS 中Window 是实现他们的载体吗？还是什么？ 还有那个元素的类型根元素是HTMLElement,他们分别又是一种类型，那些属性，ID 好像又不一样是继承谁的啊？ 搞不懂 在打印属性节点的时候 上面显示所有属性，但是详情就没有，是为啥？**

![DOM结构](https://upload-images.jianshu.io/upload_images/16960494-55ba94ac99f843b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**问题25**
```javascript
    function createElement(type, attr, value) {
    var ele = document.createElement(type);
    ele[attr] = value;
    ele.innerHTML = "hello world";
    return ele;
}
console.log(createElement("p", "innerHTML", "hello world"));
// 为什么打印的结果为<p>hello world</p>而不是<p innerHTML="hello world"></p>？？
// ele.innerHTML是节点属性 , ele[attr]对象属性;
```


**问题26**
```javascript
    var li = createElement({
        type: "li",
        children: [{
                type: "input",
                attr: {
                    type: "checkbox"
                }
            },
            {
                type: "p",
                html: iptValue
            },
            {
                type: "a",
                html: "-"
            }
        ]
    })
    for (var i = 0, childEle; domJson.children && (childEle = domJson.children[i++]);) {
    childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild(createElement(childEle));
    // 这句话还是不太懂，此时的childEle不应该只是三个对象{type: "p",html: iptValue}吗？怎么判断一个对象的nodeType值？
    // 为什么判定nodeType值 ?   判定是不是元素节点; 
    //解决：如果是元素  那么ele就直接appendChild,如果是对象,那么就递归再进行一次处理再append,nodeType是1就是元素节点
    }
```


**问题27 bind怎么使用**
>解决
```javascript
      // 1. 具名函数bind用法 :
      function foo(){}
      var newFoo = foo.bind();
      // 2. 匿名函数bind用法
      var foo = function(){

      }.bind()
```


**问题28 拖拽里面的柯里化再讲一遍。**
* bind封装的柯里化;
* 函数嵌套，函数调用函数。
```javascript
      function myBind( fn , _this ){
            return function(){
                  fn.call(_this)
            }
      }
```


**问题29 为什么移动回放的时候 没有回到原来的位置？**
https://github.com/embaobao/webstudy/tree/master/2019.6.24._2.js.EventBubble/work-favoriteMuse
* 第一次记录位置时，元素位置已经发生改变。因为记录的地点在move事件之中。


**问题30 offsetLeft , offsetTop,   事件对象 e.clientX; e.clintY, e.offsetX,e.offsetY, e.screenX,e.pageY;区别**
* offsetLeft , offsetTop 获取元素距离可视区域的left值和top值; 是否有存在position属性的父级;
* client 可视区到鼠标点的x轴距离。
* offset 事件源到鼠标点的x轴距离。
* screen 屏幕到鼠标点x轴距离。
* page   文档到鼠标点x轴距离。


**问题31 事件委托封装时候 在执行循环之前判断点击了父元素，是否会有优化？**
   ![img.png](https://upload-images.jianshu.io/upload_images/15342731-18eb18d581aadfa8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
* 减少循环执行次数性能一定优化，优化逻辑提前去根据需求定制。


**问题32 Object ,新方法 设置的时候，如果属性多的话，难到要一个个设置吗？ 有没有简写什么的？**
```javascript
      Object.defineProperties( {
            "a":{
                  get : function(){},
                  set : function(){}
            },
            "b":{

            }
      } )
```


**问题33 计时器如果作为独立的异步方法 ，那他是怎么访问到函数中的局部变量的？过程不太清楚**
```javascript
      function foo(){
            var a = 10;
            setInterval(function(){
                  console.log(a);
            },20)
      }
      var a = 10;
      setInterval(function(){
            console.log(a);
      },20)
```


**问题34 Object ,中的this 指向，说过后，还是不太清楚。**
* this指向当前属性所属的obj;


**问题35 todolist事件委托的事件类型为change，这样input里面内容不变时，就不能触发函数了，怎么解决**
* 给 input 绑定独立的事件;
```javascript
    todolist高级封装里面的这段代码看不懂
     // 判定是否存在子集;
     // 利用短路运算节省性能 , 如果没有传递 domJson.children 属性，那么我们直接跳出for循环不进行其他判断操作;
     // domJson.children && (childNode = domJson.children[i++]);
      for(var i = 0 , childNode ; domJson.children && (childNode = domJson.children[i++]);){
            // childNode => 子节点;
            // 函数的使用者定义的参数; 
            // 1. 元素节点; => 直接插入父级
            // 2. 结构对象; => 创建成元素 再插入父级;
            childNode.nodeType === 1 ? ele.appendChild(childNode) : ele.appendChild( createElement(childNode) )
      }
      return ele ;
}
```


**问题36 toString为什么能实现数组只有字符串的扁平化.**
> 扁平化的骚操作;
> var arr = [1,[2,3,4,5],6];
> arr.toString().split(",");

* 因为数组在调用 toString 的过程中,会忽略数组的结构,把所有的数据以 `,` 为间隔拼接成一个字符串;


**问题37 浅拷贝和深拷贝的区别.**
* 对象的深浅拷贝。
* 深拷贝 引用传递|克隆地址
	    var cloneObj = obj
		引用传递  obj和cloneObj指向同一个地址，一模一样  obj===cloneObj
* 浅拷贝
    创建全新的引用类型，根据源类型进行赋值
	简单的深克隆
		var cloneObj = {}
        for(var attr in obj){
            cloneObj[attr]  = obj[attr]
        }
	对象合并方式
		var  cloneObj = Object.assign({} , obj)
	JSON的方式
		var cloneObj = JSON.parse(JSON.stringify(obj))


**问题38 表单验证事件处理函数为什么要用bind.**
* 因为要传递参数 


**问题39 正则表达式什么时候用小括号，什么时候用中括号？**
* () 组;       => 需要获取到匹配字符;
* [] 元字符;   => 匹配多个或的时候使用元字符; 


**问题40 直接让handlerMoving这个函数this指向存储坐标的obj，不用传参也可以直接通过this来获取offsetX，Y，这样做可以吗 ？为什么要避免this指向数据？**
   ![图片1](https://www.xyhthink.com/img/1.png)
   ![图片2](https://www.xyhthink.com/img/2.png)
- 以后编程会用到实例;
- 一般情况下函数内的this => 1. 不用 ; 2. this指向实例。


**问题41 柯里化和闭包有什么区别和联系？**
- 柯里化为什么存在 ？ 创建时改变函数特征(参数,this指向);
- 闭包            ？ 1. 延长变量声明周期 2. 保密
- 区别 : 在于最终目的和编程导向。
- 联系 : 柯里化使用闭包机制。


**问题42 柯里化和闭包有什么区别和联系？**
- 柯里化为什么存在 ？ 创建时改变函数特征(参数,this指向);
- 闭包            ？ 1. 延长变量声明周期 2. 保密
- 区别 : 在于最终目的和编程导向。
- 联系 : 柯里化使用闭包机制。


**问题43 可以将代码中的this.outHTML改为this.outerText**
```javascript
   // 点个赞! 
   function handlerWriteText(){
       //this.outerHTML = this.value;
      this.outerText = this.value;
   }
   //可以防止修改内容时 将输入的<>里面的内容转化为HTML元素或者可执行的代码，导致再次点击无法修改或者页面崩溃的BUG。
```


**问题44**
   ```javascript
       function Foo() {
           getName = function () {
               console.log(1);
           };
           return this;
       }
       Foo.getName = function () {
           console.log(2);
       };
       Foo.prototype.getName = function () {
           console.log(3);
       };
       var getName = function () {
           console.log(4);
       };
       function getName() {
           console.log(5);
       }
   
       Foo.getName();                      
       getName();                          
       Foo().getName();                    
       getName();                          
       new Foo.getName();                  
       new Foo().getName();                
       new new Foo().getName();    
   ```
- 后面再说


**问题44**
![Q1](https://www.xyhthink.com/img/0628.png)
   为什么倒数第二行obj1里面c是3
> assign 第一层为深复制，后面为浅复制。