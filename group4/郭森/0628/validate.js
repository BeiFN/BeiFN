
class Validate {
    constructor(selector, options) {
        this.box = selector;
        this.defaultData = {
            "username": [
                {
                    reg: /^.{4,}$/i,
                    bool: true,
                    tip: '请输入4位以上的字符',
                },
                {
                    reg: /^\d+$/i,
                    bool: false,
                    tip: '不能输入纯数字',
                },
                {
                    reg: /^[a-zA-Z\u2E80-\u9FFF\-_0-9]{4,20}$/i,
                    bool: true,
                    tip: '支持中文，英文，数字，字母，-，_的4~20位字符',
                },
            ],
            "password": [
                {
                    reg: /^.{6,20}$/,
                    bool: true,
                    tip: '长度只能在6-20个字符之间',
                },
            ],
            "email": [
                {
                    reg: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9a-z]{2,9}\.[a-z]{2,6}(\.[a-z]{2,3})?$/i,
                    bool: true,
                    tip: '邮箱格式错误',
                },
            ],
            "strength": {
                "reg": [
                    /\d/,
                    /[a-zA-Z]/,
                    /[\!\@\#\$\%\^]/,
                ],
                "tip": [
                    '有被盗风险,建议使用字母、数字和符号两种及以上组合',
                    '安全强度适中，可以使用三种以上的组合来提高安全强度',
                    '您的密码很安全',
                ],
            }
        }
        options ? Object.assign(this.defaultData, options) : "";
        this.iptList = [].slice.call(this.box.querySelectorAll("input[v-type]"));
        this.tipBoxList = [].slice.call(this.box.querySelectorAll("[v-tip]"));
        this.binEvent();
    }
    // 事件绑定
    binEvent() {
        this.iptList.forEach(ipt => {
            ipt.addEventListener("blur", this.init.bind(this, ipt))
        });
    }
    // 初始化
    init(ipt) {
        this.ipt = ipt;                                     // 输入框
        this.type = this.ipt.getAttribute("v-type");        // 类型
        this.value = this.ipt.value;                        // 输入的值
        if (!(this.data = this.defaultData[this.type])) {   // 数据
            return false;
        }
        this.tipBoxList.forEach(tipBox => {
            if (tipBox.getAttribute("v-tip") === this.type) {
                this.tipBox = tipBox;                       // 提示框
            }
        })
        this.state = null;                                  // 验证状态
        this.errorTip = null;                               // 错误提示
        this.valiData();
        this.addValidateState();
        if (this.type === "password" && this.ipt.getAttribute("v-strength")) {
            this.strengthData = this.defaultData.strength;      // 密码强度验证数据
            this.strength = -1;                                  // 密码强度 
            this.strengthTip = null;                            // 密码强度提示
            this.valiStrenth();
            this.addValidateState();
            this.tipBox.innerHTML = this.strengthData.tip[this.strength];
        }
    }
    // 正则验证
    valiData() {
        for (var i = 0; i < this.data.length; i++) {
            var boolean = this.data[i].reg.test(this.value)//正则判断
            if (this.data[i].bool ? !boolean : boolean) {//boll值判断
                this.state = "error";
                this.tipBox.innerHTML = this.data[i].tip;
                return false;
            }
        }
        this.state = "success";
        this.tipBox.innerHTML = "";
    }
    // 验证状态的添加;
    addValidateState() {
        if (/success|error/.test(this.ipt.className)) {
            this.ipt.className = this.ipt.className.replace(/success|error/g, this.state)
        } else {
            this.ipt.className += " " + this.state
        }
    }
    // 密码强度验证
    valiStrenth() {
        for (var i = 0; i < this.strengthData.reg.length; i++) {
            if (this.strengthData.reg[i].test(this.value)) {
                this.strength++;
            }
        }
    }

}

