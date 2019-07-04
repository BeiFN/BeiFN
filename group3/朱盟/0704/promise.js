// Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大
// Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
// 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。


// Promise对象有以下两个特点

// 1. 对象的状态不受外界影响

// Promise对象代表一个异步操作
//      有三种状态：
//      pending（进行中）
//      fulfilled（已成功）
//      rejected（已失败）
//      只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
//      Promise “承诺”


// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'done');
//     });
// }

// timeout(100).then((value) => {
//     console.log(value);
// });