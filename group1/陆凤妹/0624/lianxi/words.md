

1、事件监听函数
 
    element.addEventListener(事件名，事件处理函数，boolean[捕获|冒泡])   ;                 

2、移除监听函数

    element.removeEventListener(事件名, 事件处理函数);
    
3、event.stopPropagation(); 

   事件处理过程中，阻止了事件冒泡，但不会阻击默认行为（它就执行了超链接的跳转）

   return false;

   事件处理过程中，阻止了事件冒泡，也阻止了默认行为（比如刚才它就没有执行超链接的跳转）

 
   event.preventDefault(); 

   事件处理过程中，不阻击事件冒泡，但阻击默认行为（它只执行所有弹框，却没有执行超链接跳转）


4、open() 方法用于打开一个新的浏览器窗口或查找一个已命名的窗口。
 
   语法
   
    window.open(URL,name,features,replace)


5、call、apply、bind的作用是改变函数运行时this的指向


   call
  
  call 方法第一个参数是要绑定给this的值，后面传入的是一个参数列表。当第一个参数为null、undefined的时候，默认指向window。
   
   bind

  和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表。区别在于bind方法返回值是函数以及bind接收的参数列表的使用。
  
  apply
  
  apply接受两个参数，第一个参数是要绑定给this的值，第二个参数是一个参数数组。当第一个参数为null、undefined的时候，默认指向window。









