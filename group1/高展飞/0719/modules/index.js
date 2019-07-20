//返回一个对象

//1
// export   default{
//     y : "gsgiusgui"
// }
// let a = { y : "dwddsd"};
// export default {
//     y
// }
//要将所有数据进行二次的封装，太过繁琐

//2
//export + 要返回的内容
// export let a = {name : "a"}
// export let b = {name : "b"}
// export let c = {name : "c"}

//优：非常灵活
//缺： 引入的时候要知道模块的名称

//3
//导出解构
// let a = 10;
// let b = 20 ;
// const c = 4;

// export {
//     a,b,c
// }
//4 导出重命名
// let a = 10;
// let b = 233;
// const c = 4;

// export {
//     a,b,c
// }


//5默认导出

export default function foo(){

}

// function foo(){

// }
// export {foo as default}

// export {default} from "."

//加在别人的模块进行导出
export {oo} from "./index2.js"