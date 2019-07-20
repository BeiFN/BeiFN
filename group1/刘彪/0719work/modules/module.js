

// 01:export default ,返回一个对象；

// let a = {name : "a"};
// let b = {name : "b"};
// export default{
//     a,
//     b,
// }

// 02:export +要返回的内容; 返回的就是变量的内容;

// export let a = {name : "a"};
// export let b = {name : "b"};
// export const c = "hello i'm const";
// export class A {};

// 03 导出特殊声明的变量;

// let a = 10;
// let b = 20;
// const c = 30;

// export {
//     a,
//     b,
//     c
// }

//04 导出重命名;

// let a = 10;
// let b = 20;
// const c = 30;

// export { a as aaa,b as bbb, c as ccc};

// 05 默认导出

//1.常规写法;
// export default function foo(){}

//2.优雅写法;
    // function foo(){}
    // export{
    //     foo as default
    // }


//06 加载别的模块进行导出;
// 1.
// export { default } from "./index.js";

// 2.
// export {name} from "./module2.js";
