var tip = document.getElementById("tip");
var outName = document.getElementById("nameOut");
var login_bt = document.getElementById("login");
var register_bt = document.getElementById("register");
var updata_bt = document.getElementById("updata");
var name_in = document.getElementById("userName");
var pw_in = document.getElementById("passWord");
login_bt.addEventListener("click", clickHandler);
register_bt.addEventListener("click", clickHandler);
updata_bt.addEventListener("click", clickHandler);

function clickHandler(ev) {
    var e = ev || window.event;
    var captureE = e.target || e.srcElement;

    login_bt.disabled = "disabled";
    register_bt.disabled = "disabled";
    updata_bt.disabled = "disabled";

    login_bt.innerHTML = "loading...";
    register_bt.innerHTML = "loading...";
    updata_bt.innerHTML = "loading...";

    switch (captureE.id) {
        case "login":
            formAction("login");
            console.log("login");
            break;
        case "register":
            formAction("register");
            console.log("register");
            break;
        case "updata":
            formAction("updata");
            console.log("updata");
            break;
        default:
            formAction("login");
            console.log("login");
            break;
    }


    function formAction(type) {
        outName.text("验证中..");
        ajax("./index.php", {
            type: "post",
            data: {
                name: name_in.value,
                pw: pw_in.value,
                type: type
            },
            dataType: "json",
            success: data => {
                if (data.statusCode === "11") {
                    outName.text("Name: " + data.name + "已登录！ 点击退出登录");
                } else {
                    outName.text("验证失败");
                }
                Tip(data.msg);

            }
        });

        login_bt.removeAttribute("disabled");
        register_bt.removeAttribute("disabled");
        updata_bt.removeAttribute("disabled");

        login_bt.innerHTML = "登陆";
        register_bt.innerHTML = "注册";
        updata_bt.innerHTML = "修改";

    }



}

function Tip(str) {
    tip.innerHTML = str;
}


function validateTocken() {
    outName.text("请验证");
    ajax("./index.php", {
            dataType: "json",
            data: {
                type: "tocken"
            }
        })
        .then(res => {
            if (res.status === "error") {
                outName.text("账户过期，请重新登录！");
            } else {
                
                outName.text("欢迎您登录，尊敬的" + JSON.parse(res.name).name + "大人！ 点击退出登录");
            }

        })
}

validateTocken();

outName.onclick = function () {
    outName.text("请验证,已退出登录");
    removeCookie("TOCKEN");
}