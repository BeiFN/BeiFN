
        // Tip: 需要打印在页面上的作业在页面的Js上 ，否则在main.js 外部js !!!!

// var count =0;
// while(count++ <5){
// console.log(count);
// } 


// 案例 输出100个数字  




function method1() {
    var count = 0;
    while (count++ < 100) {
        console.log(count);
    }
}
// method1();




function method2() {
    for (var i = 0; i < 100; i++) {
        console.log(i);
    }
}
// method2();

function method3() {
    for (let index = 0; index++ < 100;) {
        console.log(index);
    }
}

// method3();




// 案例  打印100以内 7的倍数   

function print(number, b, off) {

    for (let index = 0; index++ < number;) {
        if (arguments.length === 3) {
            if (index % b + off === 0) console.log(index);
        } else {
            if (index % b === 0) console.log(index);
        }

    }
}
//   print(100,7);




// 打印出1-100里所有的偶数
// print(100,2);

// 打印出1-100里所有的奇数
// print(100,2,-1);

// 案例  打印100以内所有偶数的和  
function add() {
    var _temp = 0;
    for (let index = 0; index++ < 100;) {
        if (index % 2 === 0) _temp += index;
    }
    console.log(_temp);
    return _temp;
}
// add();


// 打印100–200之间所有能被3或者7整除的数



function div37() {
    for (let index = 99; index++ < 200;) {
        if (index % 3 === 0 || index % 7 === 0)
            console.log(index);
    }
}

// div37();

// 计算100的阶乘   100!



function outmuil() {
    var _temp = 1;
    for (let index = 0; index++ < 100;) {
        _temp *= index;
    }
    console.log(_temp);
}
// outmuil();

// 计算1+3+5+...+99的和
function outoddAdd() {
    var _temp = 1;
    for (let index = 0; index++ < 100;) {
        if (index % 2 !== 0) _temp += index;
        // console.log(index);
    }
    console.log(_temp);
}
// outoddAdd();


// 求100-999之间的水仙花数




function sxh() {
    for (let index = 99; index++ < 999;) {
        var g = index % 10;
        var s = parseInt(index % 100 / 10);
        var b = parseInt(index / 100);
        if (Math.pow(g, 3) + Math.pow(b, 3) + Math.pow(s, 3) === index)
            console.log(index);
    }
}
// sxh();


// 输出100-200之间所有的素数   



function sushu() {
    //遍历100-200之间的数
    for (let index = 99; index++ < 200;) {
        // console.log("_______"+index+"------------------");
        var _flag = true; //设置标识符
        for (let i = 1; i++ < index - 1;) {
            if (index % i === 0) { //如果可以被 其他数整除
                _flag = false; //flag 为假的 不是素数
                break; //不在继续找下去，没有意义的计算
            }
        }
        if (_flag) console.log(index); //通过验证那么就是！输出
    }

}

//   sushu();



// 求s=a+aa+aaa+aaaa+….+aa...a的值，其中a是一个数字。例如2+22+222+2222
//  *答案
// var n = 5;
// var count = 10;
// var sum = 0;
// for (var i = 0; i < count; i++) {
//     var num = 0;
//     for (var j = 0; j < i; j++) {
//         num += n * Math.pow(10, j);
//     }
//     console.log(num);
//     sum += num;
// }

// ——self do

function s(number, length) {
    var _temp = number;
    var _number = number;
    var number_pri = "";

    // for(;;){

    // }
    for (var i = 0; i++ < length;) {
        // console.log(number);
        number = parseInt(number += _number + ""); // 先生成数字
        console.log(_temp);
        _temp += number; // 累加数字
        console.log("+" + number + "=" + _temp);
    }
    // console.log(_temp);
}
// s(3,10);





// 求1+2!+3!+...+10!的值

// * idea 求阶乘 然后累加
function s(number) {
    var sum = 0,
        muil = 1;
    for (var i = 0; i++ < number;) {
        // console.log(i);
        muil *= i;
        console.log(i + "! ->:" + muil + "");
        sum += muil;
    }
    console.log(sum);
}
// s(10);




// 求出1/1-1/2+1/3-1/4…..1/100的和 var i=1;  i*-1*-1
function s(number) {
    var _temp = 0;
    for (var i = 0; i++ < number;) {
        // console.log(parseFloat(Math.pow(number,-1)));
        // _temp+=((1/i)*Math.pow(-1,i+1));
        _temp += parseFloat(Math.pow(i, -1)) * Math.pow(-1, i + 1);
    }
    console.log(_temp);
}
// s(100);


// 操场上 100 多人排队 ,3 人一组多 1 人 ,4 人一组多 2 人 ,5 人一组多 3 人 , 共多少人

function playGround() {
    for (var i = 99; i++ < 199;) {
        if (i % 3 === 1 && i % 4 === 2 && i % 5 === 3) {
            // console.log(i);
            console.log(i + " 3人 组 ：分了" + parseInt(i / 3) + "组; 4人 组 :" + parseInt(i / 4) + "组; 5人 组 :" + parseInt(i / 5));
        }
    }

}
// playGround();


// 两个自然数相除 , 商 3 余 10, 被除数 , 除数 , 商 , 余数的和是 163, 求被除数 , 除数

function asd() {
    // console.log(1);
    var one = 0;
    var two = 0;
    while (true) {
        one++;
        two = 150 - one;
        if (parseInt(one / two) === 3 && one % two === 10) {
            console.log(one + "/" + two);
            break;
        }
    }
}

// asd();

// 假设某人有 100,000  现金。 每经过一次路口需要进行一次交费。 交费规则为当他现金大于50,000  时每次需要交 5%如果现金小于等于 50,000  时每次交 5,000 。 请写一程序计算此人可以经过多少次这个路口
function by11Road(m) {  
var money = m;
var count = 0;
while (true) {
    if (money > 50000) {
        money *= 0.95;
        count++;
    } else {
        if (money >= 5000) {
            money -= 5000;
            count++;
        } else  break;
    }
}
console.log("我走过万水千山，踏过了"+count+"次马路，兜里还有："+money+"块！ 世界太大,走不完！");
}

// by11Road(100000);




// 《张丘建算经》 成书于公元 5  世纪， 作者是北魏人． 书中最后一道题堪称亮点， 通常也被称为 “ 百钱买百鸡 ” 问题，民间则流传着县令考问神童的佳话书中原文如下：今有鸡翁一， 值钱五； 鸡母一， 值钱三； 鸡雏三， 值钱一； 百钱买鸡百只， 问鸡翁、 母、雏各几何？



function hundredHen() {
    var cock = -1;
    var count = 0;
    while (cock++ < 20) {
        var hen = -1;
        while (hen++ < 33) {
            var chick = 100 - cock - hen;
            if (100 === (chick / 3 + hen * 3 + cock * 5)) {
                count++;
                console.log("方案" + count + ": 公鸡可以有" + cock + ",母鸡也可以有" + hen + ",小鸡估计还可以买：" + chick);
            }
        }
    }
}

// hundredHen();