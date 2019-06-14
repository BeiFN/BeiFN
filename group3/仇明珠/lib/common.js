/** 
 * 函数库
 * v 
 * 0.0.1
 * by qiumingzhu
 * data:2019/06/12
 */
/** 
 * @function randomRgba
 * 作用：返回rgba字符串 随机颜色
 * 
*/
function randomRgba(){
    var r=Math.round(Math.random()*255);
    var g=Math.round(Math.random()*255);
    var b=Math.round(Math.random()*255);
    var a=Math.random().toFixed(2);
    return 'rgba('+r+','+g+','+b+','+a+')';
}
/**
 * @function randomColor
 * 作用：返回16进制字符串 16进制随机颜色
 */
function randomColor(){
    var color="#"+Math.round((Math.random())*0xffffff).toString(16);
    if(color.length!=7){
        for(var i=0;i<(7-color.length);i++){
            color+=0;
        }
    }
    return color;
}