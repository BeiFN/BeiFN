// 对班级进行分组 ;
// 6 人一组编号;
// 共 55 人有多少组; 
// 55 / 6 = 9 余 1 
// 如果有余数就多加一组;
// 10 组;

// 1.  1 ~ 6 
// 2.  7 ~ 12
// 3. 13 ~ 18
// 4. 19 ~ 24 
// n. 6(n - 1) + 1 ~ 6n


// 渲染 ;   box , 按钮;   ejs;  
// ejs.render( template , data);
// // 事件 ;   事件委托;
// 数据根据页码不同 => 页码影响数据;
// // 重新渲染 ; 
// ejs.render( template , data);
// 页码 ; 


class Pagination{
    
    group(arrP,n){
        //arrP放图片,n为每页图片数量
        let arrG = new Array;//放每一组
        
        let num = arrP.length/n == 0?
    }
}