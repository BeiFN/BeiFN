
// 1.xport default*************
// let a = {name : "a"};
// let b = {name : "b"};
// export default {
//     a,b
// }
// 弊端 : 要把所有的数据进行二次的封装。 太繁琐了;


// 2. export + 要返回的内容*****************
// export let a = {name : "a"};
// export let b = {name : "b"};
// export const c = "hello i'm const";
// export class A {}



// 03 导出结构;*************************
let a = 10;
let b = 20;
const c = 10;
export {
      a,
      b,
      c
}