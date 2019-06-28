一、location
   
   1、 window
       
      location  地址栏

      href           整条地址栏替换|更改

      hostname       替换|更改域名

      hash           更改|获取哈希值

      protocol       获取协议

      port           获取端口号

      pathname       获取|更改路径名

      文档阅读地址：      // http://nodejs.cn/api/url.html
                    
      location阅读文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Location/assign
     
      

   2、 location.assigin()
        
     location.assign()方法会触发窗口加载并显示指定的URL的内容。

    如果由于安全原因无法执行跳转，那么会抛出一个SECURITY_ERROR类型的DOMException。当调用此方法的脚本来源和页面的Location对象中定义的来源隶属于不同域的时候，就会抛出上述错误。

    如果传入了一个无效的URL，则会抛出一个SYNTAX_ERROR类型的DOMException。


  3、 location.replace()

     location.replace()方法以给定的URL来替换当前的资源。 与assign() 方法 不同的是调用replace()方法后，当前页面不会保存到会话历史（session History），这样用户点击回退按钮将不会再跳转到该页面。

    因违反安全规则导致的赋值失败，浏览器将会抛出类型为SECURITY_ERROR的DOMException 异常。当调用该方法的脚本所属的源与拥有Location对象所属源不同时，通常情况会发生这种异常,此时通常该脚本是存在不同的域下。

    如果URL不合法，浏览器也会抛出SYNTAX_ERROR类型DOMException 的异常。


  4、location.reload()
    location.reload() 方法用来刷新当前页面。该方法只有一个参数，当值为 true 时，将强制浏览器从服务器加载页面资源，当值为 false 或者未传参时，浏览器则可能从缓存中读取页面。

    该方法在跨域调用（执行该方法的脚本文件的域和 Location 对象所在页面的跨不同）时，将会抛出 DOMException 异常。  



二、属性节点

  节点属性只能获取行间样式

  在HTML DOM 中，Attr对象表示HTML属性

   HTML属性始终属于HTML元素

   NamedNodeMap对象

   在HTML DOM 中，NameNodeMap对象表示元素属性节点的无序集合

   NameNodeMap 中的节点可以通过名称或索引（数字）来访问



    1、什么是属性

      对象身上保存的变量就是属性

    2、如何操作属性

      对象.属性名称 = 值;
      
      对象.属性名称;

      对象["属性名称"] = 值;

      对象["属性名称"];

    3、节点：dom对象的细化

        dom对象：document对象下所有的子集
  
    4、什么是属性节点

      <span name = "box"></span>

      在编写HTML代码时，在HTML标签中添加的属性就是属性节点

      在浏览器中找到span这个DOM元素之后，展开看到的都是属性

      在attributes属性中保持的所有内容都是属性节点

    5、如何操作属性节点

     setAttribute()  创建或改变某个新的属性，如果指定属性已经存在，则只设置该值，该属性没有返回值
     Dom.setAttriibute("属性名称",“值”);
      
     getAttribute()  通过名称获取属性的值
     Dom.getAttribute("属性名称")
    
     removeAttribute() 删除指定的元素
     Dom.removeAttribute("属性名称")

    6、nodeName  节点名称   返回元素的标记名（大写）

     <①span id = "fruit" name = "水果" ②width = "80px">③点我</span>

     ① 元素节点  一般是拥有一对开闭合标签的元素整体
     ② 属性节点  一般是元素节点的属性   
     ③ 文本节点

      noneName属性可以依据节点的类型返回其名称

      如果节点是一个元素节点，nodeName属性将返回标签名

      如果节点是一个属性节点，nodeName属性将返回属性名

      其他节点类型，nodeName属性将根据不同的节点类型返回不同节点名称


        var oDiv = document.getElementById("box");
        var boxAttr = box.attributes;
        // console.log(boxAttr);    //nodeNameMap
          
        // 遍历维数组

        for(var i=0,res; res = boxAttr[i++];){
            console.log(attr);    //id = "box"
            console.log(attr.nodeName);  // id 
            console.log(attr.nodeValue)   // box
        }
   
       
      7、nodeType 返回元素的节点类型

        nodeType 属性返回节点类型。

        如果节点是一个元素节点，nodeType 属性返回 1。

        如果节点是属性节点, nodeType 属性返回 2。

        如果节点是一个文本节点，nodeType 属性返回 3。

        如果节点是一个注释节点，nodeType 属性返回 8。

        该属性是只读的。

      8、nodeValue  返回元素的节点值

        nodeValue 属性根据节点的类型设置或返回节点的值。

        注意： 如果你想返回元素的文本，记住文本通常是插入到文本节点中，所以返回的是文本节点的节点值(element.childNodes[0].nodeValue)。


      9、textContent

      textContent 属性设置或者返回指定节点的文本内容。  
      返回值：	字符串, 表示的文本节点及所有节点

      如果设置了 textContent 属性, 任何的子节点会被移除及被指定的字符串的文本节点替换。

      提示： 某些时候 textContent 属性可以被 nodeValue 属性取代，但是请记住这个属性同样可以返回所有子节点的文本。


     10、createAttribute()    用于创建一个指定名称的属性，并返回Attr 对象属性。

       

     11、setAttributeNode()   设置元素节点的方法，用于添加新的属性节点。

如果元素中已经存在指定名称的属性，那么该属性将被新属性替代。如果新属性替代了已有的属性，则返回被替代的属性，否则返回 NULL。

    12、attributes 属性返回指定节点属性的集合。

    提示： 可以使用 length 属性确定属性的数量，然后可以遍历所有的属性节点提取想要的信息。

    提示： 每个属性都是可用属性节点对象。




   12、 HTMLCollection 与 NodeList 的区别

      HTMLCollection 是 HTML 元素的集合。

      NodeList 是一个文档节点的集合。

      NodeList 与 HTMLCollection 有很多类似的地方。

      NodeList 与 HTMLCollection 都与数组对象有点类似，可以使用索引 (0, 1, 2, 3, 4, ...) 来获取元素。

      NodeList 与 HTMLCollection 都有 length 属性。

      HTMLCollection 元素可以通过 name，id 或索引来获取。

      NodeList 只能通过索引来获取。

      只有 NodeList 对象有包含属性节点和文本节点。


    13、节点列表不是一个数组！

      节点列表看起来可能是一个数组，但其实不是。

      你可以像数组一样，使用索引来获取元素。

      节点列表无法使用数组的方法： valueOf(), pop(), push(), 或 join() 。


  二、
  

