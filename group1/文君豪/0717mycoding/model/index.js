// alert("我被加载了");
// function foo(){
//       console.log("index1")
// }
define([/*路径列表*/],function(){ //、只要加载立即执行
    
      function foo1(){
            //console.log("index1");
            alert("1")
      }

      return foo1;
})