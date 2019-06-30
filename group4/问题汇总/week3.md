#### 四组问题汇总 

小组成员 `吕赟飞`，`肖光瑞` ,`王鹏` , `谢鑫鹏` ,`祖莹` ,`郭森` ,组长 `谢宇航`

**目前存在问题**



1. ![图片1](<https://www.xyhthink.com/img/1.png>)

   ![图片2](<https://www.xyhthink.com/img/2.png>)

**直接让handlerMoving这个函数this指向存储坐标的obj，不用传参也可以直接通过this来获取offsetX，Y，这样做可以吗 ？为什么要避免this指向数据？**

- 以后编程会用到实例;
- 一般情况下函数内的this => 1. 不用 ; 2. this指向实例。

2.**柯里化和闭包有什么区别和联系？**

- 柯里化为什么存在 ？ 创建时改变函数特征(参数,this指向);
- 闭包            ？ 1. 延长变量声明周期 2. 保密
- 区别 : 在于最终目的和编程导向。
- 联系 : 柯里化使用闭包机制。



************

3. 

```javascript
   // 点个赞! 
   function handlerWriteText(){
       //this.outerHTML = this.value;
      this.outerText = this.value;
   }
   //可以防止修改内容时 将输入的<>里面的内容转化为HTML元素或者可执行的代码，导致再次点击无法修改或者页面崩溃的BUG。
```

4. 

```javascript
//04todoList
//on(ele_todoList , "change" , handlerWriteText , "input");
on(ele_todoList , "blur" , handlerWriteText , "input");
//是因为ele_todoList并未发生失去焦点的事件，从而没有触发上面的事件吗？
on(input , "blur" , handlerWriteText , "input");
   //如果在创建input节点之后添加事件绑定，又会发生input没有子节点而导致eleList = this.querySelectorAll(selector);为空的现象从而无法触发handlerClick函数，所以如果只使用blur，就要修改事件委托函数或者直接对input写addEventListener函数，哪种比较可取？

```

* 见三组问题解决

5. **

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

