const promise = new Promise(function(resolve,reject){
    if(/* 异步操作成功 */){
        resolve(value);
    }else{
        reject(error);
    }
});
promise.then(function(value){},function(error){});