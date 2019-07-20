/****EMB字符串模板引擎
 *  Author:EMB
 *  Date:2019.6.28 
 *  Function:
 *      
 *          
 *  Version:V:D-0.0.1 
 *  
 * 
 *  Description:
 *      Version:
 *      ------------------
 *      V:D->Developer
 *      V:B->Bate   
 *      V:R->Release   
 *  
 * V : D -0.0.1 模板引擎
 */

export function Parser(content, data) {
    var html = "";
    var regExe = /<%[^=](.*?)%>/g;
    var regVar = /<%=(.*?)%>/g;
    var outExe = content.replace(regExe, `\`);$1 print(\``);
    outExe = outExe.replace(regVar, `\`); print($1); print(\``);
    outExe = `print(\`${outExe}\`)`;
    eval(outExe);

    function print(str) {
        html += str;
    }
    return html;
}