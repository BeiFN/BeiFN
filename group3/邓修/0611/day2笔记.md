# 语句

- 关键字 + () + {}；
- 关键字 : 表明语句用途；
- () 条件 : 布尔值；
- {} 作用 : 写代码; 一组代码放在大括号之中；
- 配合 else 和 else if 两组关键字实现复杂功能；

# 分支结构

1. 单分支结构
   - if结构
   - if else结构
   - if 和else if结构
2. 多分支结构：switch(var){case value: 语句}
   - 如果可能存在不合法的参数，对参数进行预处理；
   - 什么情况下选择switch 而不选择 else if；条件必须是具体值 , 而不能是范围。 推荐使用 switch ;
   - 特性1： 如果switch条件满足了某个case，然后我们的switch会继续向下执行下面所有的条件代码；也叫穿透特性；阻止穿透：break；
   - 特性2：小括号里的条件, 和case的比对是绝对比对"==="，如果数据类型不等那么不会继续比对了;

# 循环结构

## 单层循环

1. 解决的问题：多次重复执行某段程序的时候，我们会编写的非常慢，而且几乎无法更改；计算机帮你重复多次的执行某段代码 => 这种结构，我们叫做循环结构；

2. 死循环：

   ```javascript
   while(true){
   	console.log(1);
   }
   ```

3. 活循环：

   ```javascript
   while(count < 100){
       // 重复执行的代码;
       count ++;
       // console.log(1);
       document.write("Hello World<br>");
   }
   while(count++ < 10){
       // 重复执行的代码;
       // count ++;
       console.log(1);
       // document.write("Hello World<br>");
   }
   ```

4. 要点：

   - 循环执行次数；
   - 循环内部操作；

5. 测试程序性能

   ```javascript
   console.time("qiong");
   var count = 0;
   while(count ++ < 100){
       // console.log(count) ;// 1 ~ 100;
       // if(count % 2 == 0){
       //       console.log(count);
       // }
       //优化
       if(!(count % 2)){
       	console.log(count);
       }
   }  
   console.timeEnd("qiong");
               
   console.time("suan");
   var count2 = 0;
   while((count2 += 2) < 100 ){
   	console.log(count2);
   }
   console.timeEnd("suan");
   ```

6. n次方：`Math.pow(number , fang)`；

## 双层循环

1. 同样的变量只能存在一个变量；
2. 循环嵌套的时候会一个循环一个循环的执行；
3. 循环之中的关键字：break；continue；
   - break：终止循环，让循环不再执行了；
   - continue：略过本次循环；

## 循环语句

### do while语句

```javascript
do{
    // 无论如何都会先执行do里面代码;
    console.log("do ...");      
    // 如果while 条件为true ,那么 会循环执行do之中代码;
}while(false){
    // 一旦while循环条件为false,那么while代码块就执行了;
    console.log("while ...");
}
```

- do while 比 while 多执行一次；
- 多一个循环终止功能；

### for 循环语句

- for 循环：是高级循环封装；
- for(声明变量;循环逻辑;自增自减用){ }

```javascript
for(var i = 0 ; i < 10 ; i ++){
	console.log(i);
}
            
//简写;
for(var i = 0 ; i++ < 10 ; ){
	console.log(i);
}

for(var count = 0 ; true ; ){
    count ++;
    console.log(count);
    if(count === 10){
    	break;
    }
}
```

