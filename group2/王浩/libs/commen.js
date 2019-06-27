function $(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector))===1?ele[0]:ele;
}


//myForEach的封装
    function myForEach(arr , fn){
        for(var i=0;i<arr.length;i++){
            fn(arr[i],i,arr);
        }
    }
    // myForEach( [1,2] , function( item , index , arr){ 
    //     console.log(item , index , arr);
    // })