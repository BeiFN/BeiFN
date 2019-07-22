import config from "../config/config.js"
//数据加载
export default function(){
    return $.ajax(config.url , {data : config.data , dataType : "json"});
}