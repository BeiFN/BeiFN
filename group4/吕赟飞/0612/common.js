/**
 * 计算数字的阶乘
 * @param {数字} n 
 */

function factorial(n) {
    var result = 1;
    for (var i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}