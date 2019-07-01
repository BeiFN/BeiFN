        var userName = $("#username");
        var passWord = $("#password");
        var Email = $("#email");

//有时候不用原字符有时候用
        function $(selector){
            var res = null;
            return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
        }

        function validateEmail(){
            var emailValue = Email.value;
            //数字字母下划线减号，@ 数字字母  .  com cn  net
            var reg = /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i;
            if(reg.test(emailValue)){
                Email.style.background = "yellowgreen";
            }else{
                Email.style.background = "red";
            }
        }
        function validatePassword(){
            var passwordValue = passWord.value;
            //数字字母下划线减号，
            var reg = /[\!\@\#\$\%\^\&\*\(\)\-\+0-9A-Z]/i;
            if(reg.test(passwordValue)){
                passWord.style.background = "yellowgreen";
            }else{
                passWord.style.background = "red";
            }
        }
        function validateUsername(){
            var usernameValue = userName.value;
            //数字字母下划线减号，@ 数字字母  .  com cn  net
            var reg = /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/i;
            if(reg.test(usernameValue)){
                userName.style.background = "yellowgreen";
            }else{
                userName.style.background = "red";
            }
        }
        



        userName.addEventListener("blur" , validateUsername);
        passWord.addEventListener("blur" , validatePassword);
        Email.addEventListener("blur" , validateEmail);