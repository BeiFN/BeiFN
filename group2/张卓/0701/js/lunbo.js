/**
 * 2.0更新内容  
 * 优化代码  
 * 点击数字跳转到指定的图片
 * 定时自动改变图片 鼠标悬浮停止移动
 */
var left = $(".left")
var right = $(".right")
var changbox = $("#changbox")
var nums = $(".index")
var box = $("#box")
var images = changbox.children;
var count = 0;
var timer = null;
var autoTimer = null;
//初始为第一章图片为默认的1
nums.children[0].style.backgroundColor = "rgba(230,230,230,.5)"

window.onload = autoMove();
right.addEventListener("click", function () {
    count++;
    move("right");
    changeNum()
})

left.addEventListener("click", function () {
    count--;
    move("left")
    changeNum()
})
nums.addEventListener("click", delegation(handlerClick, "li"))
function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length == 1 ? ele[0] : ele
}
box.addEventListener("mouseenter",stopAutoMove)
box.addEventListener("mouseleave",continueMove)

//停止自动移动
function stopAutoMove(){
    console.log("111")
    clearInterval(autoTimer)
}
//继续自动移动
function continueMove(){
    console.log("222")
    autoMove() 
}


//事件委托的方式给下面的每一个元素绑定事件
function delegation(handlerClick, selector) {
    return function (evt) {
        var e = evt || event;
        //事件源
        var target = e.target || e.srcElement;
        //判断  
        var eleList = this.querySelectorAll(selector)
        //获取target的家族
        var _tamp = target;
        var targetFamily = []
        while (true) {
            if (_tamp == this) break;
            targetFamily.push(_tamp)
            _tamp = _tamp.parentNode;
        }
        //符合规则了就调用事件代理
        for (var i = 0, ele; ele = eleList[i++];) {
            //如果这个数组中只有一个元素就让他直接和元素进行比较 如果数组中有多个元素就看他们是不是有这个元素
            if (targetFamily.length == 1 ? target == ele : targetFamily.indexOf(ele) !== -1) {
                //满足条件 调用事件处理函数
                handlerClick.call(ele, e)
            }
        }
    }
}
//点击改变图片和数字的回调函数
function handlerClick() {
    // console.log()
    var n = parseInt(this.innerHTML) - 1
    changbox.style.left = n * (-600) + "px";
    count = n
}


//改变数字标志
function changeNum() {
    for (var i = 0, num; num = nums.children[i++];) {
        // console.log(num)
        num.style.backgroundColor = "white"
    }
    //这个 c是为了不影响全局变量count
    var c = count;
    // console.log(count)
    if (count == 5) {
        //下标是 0 1 2 3 4   
        c = 0;
    }
    nums.children[c].style.backgroundColor = "rgba(230,230,230,.5)"
}
//图片移动
function move(fangxiang) {
    count = count % 6;
    //当他等于0意味着他到了第一个图片的位置 下一次让他的count要符合第二张图片的count
    if (count == 0 && fangxiang == "right") {
        count = 1
        //图片移动的起始位置
        changbox.style.left = 0 + "px"
    }
    //当他等于-1意味着他到了第6-5图片的位置 下一次让他的count要符合第5张图片的count
    if (count == -1 && fangxiang == "left") {
        count = 4
        changbox.style.left = -3000 + "px"
    }
    var target = count * (-600);
    clearInterval(timer)
    timer = setInterval(function () {
        var speed = (target - changbox.offsetLeft) / 5
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
        if (target == changbox.offsetLeft) {
            clearInterval(timer)
        } else {
            changbox.style.left = changbox.offsetLeft + speed + "px";
        }
    }, 50)
    changeNum()
}

//图片自动移动函数
function autoMove() {
    autoTimer = setInterval(function(){
        count++;
        move("right")
    },2000)
}


