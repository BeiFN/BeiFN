//需要创建一个插件的基本结构 
; +function(window){
//我们需要创建选择器 一切根源是先获取到元素
    function $(selector){
        var res = null;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
    }
    //我们需要传入参数   selector 
    // 如果是给用户更好的体验需要自定义验证规则的话  我们需要另一个参数options json对象形式的
    function validate(selector,options,mustList){
        options ? Object.assign(strategyList ,options ) : "";
        var parent = $(selector);  //选中我们的表单。
        var inputList = parent.querySelectorAll("input[v-type]"); // 选中我们的input元素;
        //下一步是给每个元素都绑定事件
        for (var i = 0, input; input = inputList[i++];){
            input.addEventListener("blur",handlerBlur.bind(input,mustList));
        }
        // console.log(inputList);
    }
    // 下面是事件函数
    function handlerBlur(mustList){

        var value = this.value; //获取到当前元素的值
        // console.log(this);
        var type  = this.getAttribute("v-type");  //获取当前事件的v-type 类型；
        if(value == ""){
            return false;
        }
        validateText(value,type,this,mustList);//我们需要参数   当前元素、值、和属性值
        
        //验证密码强度
        type === "password" && this.getAttribute("v-strength") ? validateStrength(value,this) : "";

        // 是否需要开启纯数字 这个不仅可以用到用户名的限制   也是可以用到密码等地方的  所以不用限制使用的范围
        validatePurenumbers(value , this ,this.getAttribute("v-purenumbers") === "true" ? true : false);

        btn.onclick = function(){
            if(count == mustList.length){
                alert("提交成功");
            }else{
                alert("请您正确填写必填选项！");
            }
        }

    }

    //下一步创建验证函数
    var strategyList ={
        "email"   : {
            reg : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
        },
        "password" : {
            reg : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
        }
    } 
    function validateText(value,type,ele,mustList){
        //此时我们需要一个正则的列表，来告知我们需要执行的正则；
        if(strategyList[type].reg.test(value)){
        // console.log("true");    为了看可以自定义样式我们需要给元素添加不同的样式
        //规定这个验证成功的样式名称为success
            validateMustList(type,mustList);
            addValidateState(ele,"success");
            addCreateElement("success",ele,type);
        }else{
            // console.log("false");  所有我们需要 创建另外一个添加className的函数
            addValidateState(ele,"error");
            addCreateElement("error",ele,type);
            return false;
        }
    }
    var count = 0;
    var btn  = $("#btn");
    function validateMustList(type,mustList){
        for(var i = 0 ; i < mustList.length ; i ++){
            if(type == mustList[i]){
                count ++
            }
        }
    }
    
    //验证必填项
    var contentList = {
        "username" : {
            "success" :  "用户名合法" ,
            "error"   :  "用户名只能是汉字、字母、数字、下划线和-，最少四位，不能包含其他字符，不能是纯数字哦"
        },
        "password" :{
            "success": "密码输入成功！",
            "error" : "密码只能包含数字、字母和!@#$%^&*()字符，不能低于六位哦"
        },
        "email" : {
            "success" : "邮箱输入正确",
            "error"   :  "邮箱格式不正确，麻烦重新检查"
        }
    }
    
    function addCreateElement(content,ele,type){
        var parent_p = ele.parentNode;
        var parent_p_c = parent_p.children[0];
        if(parent_p_c.nodeName == "DIV"){
            parent_p.children[0].innerHTML = contentList[type][content];
        }else{
            var elements = document.createElement("div");
            elements.innerHTML = contentList[type][content];
            parent_p.insertBefore(elements,parent_p.children[0]);
        }
    }
    //下面的是验证成功之后添加样式
    function addValidateState(ele,type){
        if(/success|error/.test(ele.className)){
            ele.className = ele.className.replace(/success|error/g,type);
        }else{
            ele.className += " " + type;
        }
    }
    // 验证密码强度  密码强度是在失去焦点的时候判断的  所以我们需要在handlerBlur添加
    // 另外不是所有的input都需要验证密码强度所以    我们需要先有开启的条件 给需要的元素添加v-strength属性
    function validateStrength(value , ele){
        var score = 0 ;
        if(/\d/.test(value)){
            score ++;
        }
        if(/[a-z]/i.test(value)){
            score ++;
        }
        if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
            score ++;
        }
        switch(score){
            // v-strength-low
            // v-strength-middle
            // v-strength-high   给其添加相应的属性
            case 0 :
                  addStrengthState("low" , ele);
                  addStrengthShow("请输入正确的密码",ele);  
                  break;
            case 1 : 
                  addStrengthState("low" , ele);
                  addStrengthShow("密码强度比较低",ele);                    
                  break;
            case 2 : 
                  addStrengthState("middle" , ele);
                  addStrengthShow("密码强度中等",ele);  
                  break;
            case 3 : 
                  addStrengthState("high" , ele);
                  addStrengthShow("密码强度高",ele);  
                  break;
            default :
                  addStrengthState("low" , ele);
                  addStrengthShow(score,ele);  
        }
    }
    function addStrengthShow(content,ele){
        var parent_p = ele.parentNode;
        var parent_p_c = parent_p.children[3];
        if(parent_p_c){
            parent_p.children[3].innerHTML = content;
        }else{
            var elements = document.createElement("b");
            elements.innerHTML = content;
            parent_p.insertBefore(elements,parent_p.children[3]);
        }
        
    }
    function addStrengthState(level,ele){
        if(/v-strength-(low|middle|high)/.test(ele.className)){
            ele.className = ele.className.replace(/v-strength-(low|middle|high)/,"v-strength-"+level);
        }else{
            ele.className += " v-strength-" + level;
        }
    }
    // 是否允许纯数字 规则是允许纯数字的话 只要符合规则就行  不允许纯数字的话 需要进行变色提示  开启条件也是需要给元素添加新的属性 v-purenumbers

    function validatePurenumbers( value , ele ,bool){
        if(!bool){
            if(/^\d+$/.test(value)){
                addPurenumberState("nuemers_Red",ele);
            }else{
                addPurenumberState("nonuemers_green",ele);
            }
        }
    }
    function addPurenumberState(molds , ele ){
        if(/nuemers_Red|nonuemers_green/.test(ele.className)){
            ele.className = ele.className.replace(/nuemers_Red|nonuemers_green/g,molds);
        }else{
            ele.className += " " + molds;
        }
    }


    //当我们失去焦点判断之后 需要去创建一个元素  用来提示用户
    //那么我们需要在blur之后去创建添加元素

    window.validate = validate;
}(window)