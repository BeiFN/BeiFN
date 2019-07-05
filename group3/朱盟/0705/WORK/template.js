; + function () {
    function Parser(content, data) {
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
    window.Parser = Parser;
}();