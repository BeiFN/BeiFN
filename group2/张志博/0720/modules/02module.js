// // 1 export default
// let a = {name : "a"};
// let b = {name : "b"};
// export default{
//     a,
//     b
// }


// 02
// export let a = {name : "a"};
// export let b = {name : "b"}; 


// 3导出结构；
// let a = 10;
// let b = 20;

// export {
//     a,
//     b
// }

//4导出重命名
let a = 10;
let b = 20;
const c = 10;
export { a as aaa , b as bbb , c as ccc };