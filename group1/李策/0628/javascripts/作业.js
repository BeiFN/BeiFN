; +function (window) {
      var strategyList = {
            "email": {
                  reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
            },
            "password": {
                  reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
            },
            "username": {
                  reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
            }
      }

      // 给用户一个高级选项;
      function validate(selector, options) {
            options ? Object.assign(strategyList, options) : "";
            // console.log(strategyList , options);
            var parent = $(selector);
            var inputList = parent.querySelectorAll("input[v-type]");
            // console.log(inputList);
            for (var i = 0, input; input = inputList[i++];) {
                  input.addEventListener("blur", handlerBlur.bind(input, input.getAttribute("v-type")))
            }
      }

      // tip : 耦合关系一定有一个函数进行统一的处理;

      function handlerBlur(type) {
            if (!strategyList[type]) {
                  return false;
            }
            var value = this.value;
            validateText(type, value, this);
            type === "password" && this.getAttribute("v-strength") ? validateStrength(value, this) : "";

            // 1.判断元素内部是否含有 v-purenumbers , 即判断该元素是否需要使用纯数字验证功能
            // 2.如果需要蠢使用纯数字验证功能，调用函数；

            this.getAttribute("v-purenumbers") === null ? "" : validatePurenumbers(value, this, this.getAttribute("v-purenumbers") === "true" ? true : false);
      }

      function validateText(type, value, ele) {
            if (strategyList[type].reg.test(value)) {
                  addValidateState("success", ele);
            } else {
                  addValidateState("error", ele)
            }
      }

      function addValidateState(type, ele) {
            if (/success|error/.test(ele.className)) {
                  ele.className = ele.className.replace(/success|error/g, type)
            } else {
                  ele.className += " " + type
            }
      }

      function validateStrength(value, ele) {
            var score = 0;
            if (/\d/.test(value)) {
                  score++;
            }
            if (/[a-z]/i.test(value)) {
                  score++;
            }
            if (/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)) {
                  score++;
            }
            switch (score) {
                  case 0:
                        addStrengthState("low", ele);
                        addSpan("low", ele);
                        break;
                  case 1:
                        addStrengthState("low", ele);
                        addSpan("low", ele);
                        break;
                  case 2:
                        addStrengthState("middle", ele);
                        addSpan("middle", ele);
                        break;
                  case 3:
                        addStrengthState("high", ele);
                        addSpan("high", ele);
                        break;
                  default:
                        addStrengthState("low", ele);
                        addSpan("low", ele);
                        break;
            }
      }

      function addStrengthState(level, ele) {
            if (/v-strength-(low|middle|high)/.test(ele.className)) {
                  ele.className = ele.className.replace(/v-strength-(low|middle|high)/, "v-strength-" + level);
            } else {
                  ele.className += " v-strength-" + level;
            }
      }

      function validatePurenumbers(value, ele, bool) {
            var res = "";
            (bool) ^ (/^\d+$/.test(value)) ? res = "失败" : res = "成功";
            addSpan(res, ele)
      }

      function addSpan(res, ele) {
            var _t = ele.parentNode.querySelectorAll("span[targ]").length === 0 ? null : ele.parentNode.querySelectorAll("span[targ]");
            if (!_t) {
                  var span = document.createElement("span");
                  span.setAttribute("targ", 1)
                  span.innerHTML = res;
                  ele.parentNode.insertBefore(span, ele)
            } else {
                  _t[0].innerHTML = res;
            }
      }

      function $(selector) {
            var res = null;
            return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
      }
      window.validate = validate;
}(window)




