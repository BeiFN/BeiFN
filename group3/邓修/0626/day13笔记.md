# 正则表达式
 - 正则的使用规则:
    - 如何创建一个正则;
    ``var reg = new RegExp("规则","g");``
        1. 规则简写 => \d ;  数字
        2. 量词     =>  + ;  最少一个最多不限制;
        3. 修饰符   =>  表示正则整体的匹配规则;
    - match => 在字符串之中匹配所有符合规则的字符，并以数组的形式进行返回;如果匹配到的结果只有一个; 那么他会返回这个合格匹配内容的下标,匹配字符串，组别等......
    - 惰性匹配 => 找到一个就完了
    - 贪婪匹配 => 尽可能多的进行匹配
    -exec => 正则的方法 => 在字符串之中找到一个符合规则的内容
    - 如果有修饰符g 那么下一次匹配的时候会在上一次匹配终止处继续
    - 元字符 =>  是正则之中 | 写法的简写,元字符之中所有的字符都可以和前面或者后面的规则进行匹配，得到一组匹配结果
        ``var reg = /[^杨刘张]彦祖/g;``
        1. 第一个符号 - =>  用来告知数字和字母的范围;
        2. 第二个符号 ^ =>  用来除了元字符之中的字符;
    - 用正则匹配所有标签,并删除所有标签
    *正则之中的 **+** 会以贪婪形式进行匹配,尽可能多的进行一个结果匹配*
    ```javascript
    // var reg = /<[^><]+>/g;
    // 惰性 => 一旦匹配到符合规则的字符就立即终止;
    var reg = /<(.*?)>/g;
    // . => 是不包含换行符的;
    var btn = document.getElementById("btn");
    var input = document.getElementById("input");
    var output = document.getElementById("output");
    btn.addEventListener("click",deleteTag);
    // deleteTag => 删除标签;
    function deleteTag(){
        var inputValue = input.value;
        // console.log(inputValue.match(reg));
        console.log(inputValue.replace(reg , ""));
        output.value = inputValue.replace(reg , "");
    }
    ```