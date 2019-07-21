// 01 export default 默认出口，默认功能单一
// let a = "i am index";
// let b = function(){
//     console.log("b")
// };
// let c = {
//     name : "li",
//     age  : "21",
//     sex  : "男"
// };
// let d =[1,2,3,5]

// export default {
//     a,b,c,d
// }

// 02 没有default 关键字 
// let a = "i am index";
// let b = function(){
//     console.log("b")
// };
// let c = {
//     name : "li",
//     age  : "21",
//     sex  : "男"
// };
// let d =[1,2,3,5];
// const name = "Mr.Du";
// class Person{}

// export {
//     a,b,c,d,name,Person
// }

// 03 导出重命名
// export let a = 21;
// export function foo(){
//     console.log("i am foo")
// }
let   a = "Tom";
let   b = 21;
const c = "男"
export{
    a as name,b as age,c as sex
}
