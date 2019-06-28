var bts = $("button");


// 1. 我们要给他按钮绑定可以创建按钮的事件 ，太麻烦。那么我们可以给他父元素添加啊？
// 那我到时候判断就好了。 


// // // ----------------------------------------- 我是代码段
// function createHandler(ev) {
//     var e = ev || window.event; //事件对象
//     var captureElemet = e.target || e.srcElement; //捕获到的点击对象
//     if (captureElemet.nodeName === "BUTTON") {
//         document.body.appendChild(createElement({
//             tagName: "button",
//             html: "我是创建的按钮"
//         }));
//     }
//     // console.log(captureElemet.nodeName);
// }


// document.body.addEventListener("click", createHandler);

// -------------------------------------------我是代码段


// 2. 我还嫌弃他，为啥？ 我觉的这样不够优雅（装 13） 这样我每次相同的操作时我都要这样去判断？

// > 那我觉的他很麻烦 我要封装 要成为通用的方法


// 那这个代码块哪里可以重用？
// 我们只要找哪里是不一样的就行了吧？
// 1. 那就是 选择的呀元素不一样吧？  下次就不一定是、按钮了吧？  很有可能是  相同的类 ， 和标签了吧？
//2.  我不会每次都绑定的事件都相同吧？ 功能不会都是创建一个按钮吧？ 

// 所以我们就可以 创建两个变量来替代对吧？
// 那像不像我不想自己喝水，累 ………… ，我就叫了个人，你去给我那杯水给我喝。。这个就是事件的代理
// 那我开始了！
function easyCreateHandler(ev) {
    document.body.appendChild(createElement({
        tagName: "button",
        html: "我是创建的按钮"
    }));
}



function delegation(executeHandler, targetSelector) {
    return function (ev) { // 我本人认为第一步应先给监听事件要的东西， 就是执行事件对吧？
        // 这个函数被作为传进去的执行者，那么他是不是接受了事件对象？嘿嘿
        var e = ev || window.event; // 获取到了事件对象
        // 获取当前捕获元素
        var captureElemet = e.target || e.srcElement;
        //获取要执行的目标元素
        var targetElemets = this.querySelectorAll(targetSelector);

        // console.log(captureElemet, this);

        // 那是不是 执行目标和捕获目标相同 就执行就好了？
        // 但是我们的目标元素不是一堆啊? 那是不是得一一辨认？
        for (var i = 0, targetItem; targetItem = targetElemets[i++];) {
            if (captureElemet == targetItem) { // 如果是这个目标 那就杠
                executeHandler.call(targetItem, e);
                //执行事务 ,并把执行事务 的参数给人家句柄 
                //指向执行的人，事件对象给执行句柄
            }
        }

    }
}



// document.body.addEventListener("click", delegation(easyCreateHandler, "button"));




// > 3 .但是还是有问题啊！！ 好烦啊对不？  在元素内部要是有嵌套那是不是 绑定的事件是不是就没用了啊？
// 就啊是啊？ 那怎么解决了？ 还是那样啊啊 判断，对不？ 给绑定事件的一家子 ，就是包括他在内的儿子，都认为是执行目标，都应该执行这个绑定的事件，对。。对吧
// 开始更新了》》



// 事件的委托的实现
function delegation(executeHandler, targetSelector) {
    return function (ev) { // 我本人认为第一步应先给监听事件要的东西， 就是执行事件对吧？
        // 这个函数被作为传进去的执行者，那么他是不是接受了事件对象？嘿嘿
        var e = ev || window.event; // 获取到了事件对象
        // 获取当前捕获元素
        var captureElemet = e.target || e.srcElement;
        //获取要执行的目标元素
        var targetElemets = this.querySelectorAll(targetSelector);
        var targetFamilay = [] //抓住一家子
        var _targetemp = captureElemet;
        while (true) {
            if (_targetemp === this) break;
            //如果是找到的父元素 放弃寻找
            targetFamilay.push(_targetemp);
            _targetemp = _targetemp.parentNode
        }
        if (!targetFamilay.length) return false;
        // console.log(captureElemet, this);
        // 那是不是 执行目标和捕获目标相同 就执行就好了？
        // 但是我们的目标元素不是一堆啊? 那是不是得一一辨认？
        for (var i = 0, targetItem; targetItem = targetElemets[i++];) {
            if (targetFamilay.length === 1 ? captureElemet == targetItem : targetFamilay.indexOf(targetItem) !== -1) { // 如果是这个目标 那就杠
                executeHandler.call(targetItem, e);
                //执行事务 ,并把执行事务 的参数给人家句柄 
                //指向执行的人，事件对象给执行句柄
            }
        }

    }
}



document.body.addEventListener("click", delegation(easyCreateHandler, "button"));



Node.prototype.on = function (eventType, handler, isCapture) {
    arguments.length > 2 && isCapture ? "" : isCapture = false;
    if (this.addEventListener) {
        this.addEventListener(eventType, handler, isCapture);
    } else if (this.attachEvent) {
        this.attachEvent(eventType, handler);
    } else {
        this["on" + eventType] = handler;
    }
}

// some 判定数组中是否存在某个符合条件的; 一旦函数返回true那么some就会终止循环，并且返回true ;  
// Some 封装

var arr = [15000, 20000, 21000, 26000, 3000, 2000, 8000];
var boolean = arr.some(function (item, index, arr) {
    // console.log(item);
    return item === 3000
})
// console.log(boolean);

Array.prototype.iSome = function (fn) {
    for (var i = 0, item; item = this[i++];) {
        if (fn(item, i, arr)) {
            return true;
        }
    }
}

var Iboolean = arr.iSome(function (item, index, arr) {
    // console.log(item);
    return item === 3000
})
// console.log(Iboolean);
// [35841,30475,35841,26159,20667,23376].forEach(e=>console.log(String.fromCharCode(e)));




// bind 的原型实现封装实现 ！！！
Function.prototype.ibind = function (_this) {
    var __this = this; // 获取使用ibind 的对象
    var fixedArgs = [].slice.call(arguments).slice(1); //固定的参数
    return function () {
        __this.apply(_this, fixedArgs.concat([].slice.call(arguments))); //拼接参数
    }
}


function foo() {
    console.log(this, arguments);
}

// foo.ibind();
var poo = foo.ibind({
    name: "ok"
}, 1, 2, 33, 3333);

// poo(3, 4);


// poo();
// foo(=]



var arr = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [6, 5, 4, 3, 2, 1]
]

function flat(arr) {


    if (!flat.resArray) {
        flat.resArray = [];
    }
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] instanceof Array)) {
            flat.resArray.push(arr[i])
        } else {
            flat(arr[i])
        }
    }
    return flat.resArray;
}

// console.log(flat(arr));

// // console.log(Array.prototype);
// Array.prototype.iflat = function () {
//     if (!this.resArray) {
//         this.resArray = [];
//     }
//     for (var i = 0; i < this.length; i++) {

//         if (!(this[i] instanceof Array)) {

//             this.resArray.push(this[i]);

//         } else {
//             this[i].iflat();
//         }
//     }
//     return this.resArray;
// }
// console.log(arr.iflat());


var obj = {
    $data: {}
};

Object.defineProperty(obj, "b", {
    get: function (param) {
        return this.$data.b;
    },
    set: function (val) {

        return this.$data.b = val;
    }
});
Object.defineProperty(obj, "a", {
    get: function () {
        // this => obj 当前对象;
        // console.log(this);
        console.log("正在获取a..")
        return this.$data.a;
    },
    set: function (val) {
        // val => 设置的参数
        // console.log("hello");
        // 因为在a设置值的时候已经被作为一个拦截器而进行set处理了,那么这时候我们不能给a直接赋值;
        console.log("a设置：" + val)
        return this.$data.a = val;
    }
})



console.log(obj);