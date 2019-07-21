import config from "../config/config.js"
export default function(){
    return $.ajax(config.url , { data:config.data , dataType:"json"})
}