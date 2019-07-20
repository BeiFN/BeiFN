// 返回一个对象;

// 01 : export default

// let a = { name : "a"};
// let b = { name : "b"};

// export default{
//       a,
//       b
// }
// 弊端 : 我要把所有的数据进行二次的封装。 太繁琐了;

// 02 : export + 要返回的内容 ;  
// export let a = {name : "a"};
// export let b = {name : "b"};
// export const c = "hello i'm const";
// export class A {}
// 好处是非常灵活 
// 弊端 : 引入的时候要知道模块的名称;(引入的时候需要直到变量名)

// 03 导出结构;

// let a = 10;
// let b = 20;
// const c = 10;

// export {
//       a,
//       b,
//       c
// }

// 04 导出重命名;

// let a = 10;
// let b = 20;
// const c = 10;

// export {  a as aaa , b as bbb , c as ccc };

// 05 默认导出;

// export default function foo(){

// }

// function foo(){

// }
// export { foo as default }

// export {default} from "./index.js";

// 加载别人的模块进行导出;
export { name } from "./index.js";