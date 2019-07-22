//01.
// let a = {name : "a"};
// let b = {name : "b"};

// export default{
//     a,
//     b
// }


//02
// export let a = {name : "a"};
// export let b = {name : "b"};
// export const c = "hello word";
// export class A {};

//03
let a = 10;
let b = 20;
const c = 10;
export {
    a,
    b,
    c
}

//04
// let a = 10;
// let b = 20;
// const c = 10;
// export {a as A , b as B , c as C};

//05
// export default function foo(){

// }


// export {name} from "./test.js";

function foo(){
    console.log(1);
}
let f = foo()
export default f;