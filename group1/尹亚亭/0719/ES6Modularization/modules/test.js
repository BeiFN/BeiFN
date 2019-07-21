// 导出解构
// 导出解构 --- 可以导出多个对象
let a = 10;
let b = 20;
const y = 36;   //常量的特性不变，仍是不可更改
export{
    a,
    b,
    y
}
  // 导出重命名
   // 导出解构 --- 重命名用as
  export {
      a as aa,
      b as bb,
      y as yy
  }

  // 默认导出
  export default function foo(){
    let f = "I'm in a function";
    return f;
  }
 

  // 加载别人的模块进行导出
  export {publicname} from "./index.js"  // 注意路径的变更，这里test.js和index.js在同一个目录之下
