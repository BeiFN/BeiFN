/**
 * 封装函数
 * 0.0.0.1
 * 2019.6.12 
 * 
 */

/**
 * 
 * 这是一个计算器 功能为加减乘除求余的函数封装
 * 功能是获取第一个输入框的值(num1),第二个输入框的值(num2),和下拉菜单的运算符 对两个数进行运算
 * 计算结果存入第三个输入框中
 * @param {第一个输入框的值} num1 
 * @param {第二个输入框的值} num2 
 * @param {下拉菜单的符号} symbol 
 */
function calculator(num1, num2, symbol) {
    switch (symbol) {
        case "+":
            return Number(num1) + Number(num2);
            break;
        case "-":
            return num1 - num2;
            break;
        case "*":
            return num1 * num2;
            break;
        case "/":
            return num1 / num2;
            break;
        case "%":
            return num1 % num2;
            break;
    }
}