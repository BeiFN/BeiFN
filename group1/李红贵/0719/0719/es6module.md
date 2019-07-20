## ES6 模块化规范

* 特征 : 原生支持 , 原生的内容可以配套使用。  const | let | class ....

- import => 导入  AMD => require

```javascript
      核心语法 : import xxx from "./xxx";
```
tip : import 的内容必须是符合模块定义规范的一个模块(js文件); 如果不符合规范，那么直接报错;

- export => 导出  AMD => define

```javascript
      核心语法 : export default {}
```

应用 : 
      不会应用在实际项目之中 ,  而是把它当成构建项目的过程。
      不把ES6模块化当成加载工具 , 当成程序分割的工具。 
      本地进行分割 => 只是在开发过程之中分割 => 打包 => 合并成一个文件;

* 已经变成了现代开发的一个标准

* 支持的端 : web (高级的Chrome浏览器) | webpack(工程化构建工具) | gulp (工程化构建工具);

