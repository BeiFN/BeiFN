// 
//------------------- 1.export default
// var b = 30;
// var a = 10;
// function foo(){
// 	console.log("foo")
// }

// export default a
// export default foo
// export default {
// 	a,
// 	b
// }
// export default function(){
// 	console.log(1)
// }

//-----------------------2.export

// export let a =10;
// export let a = {
// 	b: 10,
// 	c: 20
// };

// let a = 10;
// let b = {};
// function c(){};
// export {
// 	a,b,c
// }

// export {
// 	a as aa,
// 	b as bb
// }

//-----------------------3.导出别的模块
export {a as default} from "./test.js"