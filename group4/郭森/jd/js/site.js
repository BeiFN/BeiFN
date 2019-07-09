// 地点
let
    myCity = document.getElementById('mycity'),
    waimyCity = document.getElementById('ttbar-mycity'),
    dd = waimyCity.querySelector('.dd');
function movecity() {
    myCity.style.cssText = 'background:#fff;padding-bottom:3px;border-bottom:none';
    dd.style.cssText = 'display:block';
}
function leavecity() {
    myCity.style.cssText = 'background: #e3e4e5;';
    dd.style.cssText = 'display:none';
}
myCity.addEventListener('mousemove', movecity);
myCity.addEventListener('mouseleave', leavecity);
dd.addEventListener('mousemove', movecity);
dd.addEventListener('mouseleave', leavecity);
// 我的京东
let
    ttbar_myjd = document.getElementById('ttbar-myjd'),
    myjd = document.getElementById('myjd');
    
function movemyjd() {
    ttbar_myjd.firstElementChild.style.cssText = 'background:#fff;padding-bottom:4px;border-bottom:none;height:27px';
    myjd.style.cssText = 'display:block';
}
function leavemyjd() {
    ttbar_myjd.firstElementChild.style.cssText = 'background: #e3e4e5;';
    myjd.style.cssText = 'display:none';
}
ttbar_myjd.addEventListener('mousemove', movemyjd);
ttbar_myjd.addEventListener('mouseleave', leavemyjd);
myjd.addEventListener('mousemove', movemyjd);
myjd.addEventListener('mouseleave', leavemyjd);
// 企业采购
let
    cai = document.getElementById('cai'),
    caigou = document.getElementById('caigou');
function movemycai() {
    cai.style.cssText = 'background:#fff;padding-bottom:3px;border-bottom:none';
    caigou.style.cssText = 'display:block';
}
function leavemycai() {
    cai.style.cssText = 'background: #e3e4e5;';
    caigou.style.cssText = 'display:none';
}
cai.addEventListener('mousemove', movemycai);
cai.addEventListener('mouseleave', leavemycai);
caigou.addEventListener('mousemove', movemycai);
caigou.addEventListener('mouseleave', leavemycai);
// 客户服务
let
    ttbar_serv = document.getElementById('ttbar-serv'),
    serv = document.getElementById('serv');
function movemyserv() {
    ttbar_serv.style.cssText = 'background:#fff;padding-bottom:3px;border-bottom:none';
    serv.style.cssText = 'display:block';
}
function leavemyserv() {
    ttbar_serv.style.cssText = 'background: #e3e4e5;';
    serv.style.cssText = 'display:none';
}
ttbar_serv.addEventListener('mousemove', movemyserv);
ttbar_serv.addEventListener('mouseleave', leavemyserv);
serv.addEventListener('mousemove', movemyserv);
serv.addEventListener('mouseleave', leavemyserv);
// 网站导航
let
daohang = document.getElementById('daohang'),
wangzhan = document.getElementById('wangzhan');
function movemywangzhan() {
    daohang.style.cssText = 'background:#fff;padding-bottom:3px;border-bottom:none';
    wangzhan.style.cssText = 'display:block';
}
function leavemywangzhan() {
    daohang.style.cssText = 'background: #e3e4e5;';
    wangzhan.style.cssText = 'display:none';
}
daohang.addEventListener('mousemove', movemywangzhan);
daohang.addEventListener('mouseleave', leavemywangzhan);
wangzhan.addEventListener('mousemove', movemywangzhan);
wangzhan.addEventListener('mouseleave', leavemywangzhan);
// 购物车
let
    settleup_t = document.getElementById('settleup_t'),
    settleup_b = document.getElementById('settleup_b');

    function movemyche(){
        settleup_b.style.cssText = 'display:block';
    }
    function leavemyche(){
        settleup_b.style.cssText = 'display:none';
    }
settleup_t.addEventListener('mousemove', movemyche);
settleup_t.addEventListener('mouseleave', leavemyche);
settleup_b.addEventListener('mousemove', movemyche);
settleup_b.addEventListener('mouseleave', leavemyche);
