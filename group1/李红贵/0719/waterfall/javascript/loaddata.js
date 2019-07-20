import {url,data} from "./config.js";
// console.log(url,data);
let { ajax  } = Utils;

let res = ajax(url,{data : data,dataType : "json"});

export {res}
