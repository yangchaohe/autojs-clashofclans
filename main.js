//载入模块
var cp = require('capture.js');
var ut = require('utils.js');
var am = require('attackMethod.js');
var recog = require('recognizable.js');
//let ocr = $plugins.load("com.hraps.ocr");

auto.waitFor();

if(currentPackage()!='com.supercell.clashofclans'){
    toastLog('打开部落冲突');
    launchApp('Clash of Clans');
}

if (!requestScreenCapture()) {
    toastLog("请求截图失败\n程序结束");
    exit();
}
sleep(5 * 1000);

// ==== 初始化数据 =======
var 金 = 0;
var 水 = 0;
var 黑 = 0;
var 预期_金 = 800000;
var 预期_水 = 800000;
var 预期_黑 = 6000;
// console.show();
// console.setPosition(706,5);
console.verbose('载入0-9字体库');
let resourceNum = [recog['金0'],recog['水1'],
        recog['金2'],recog['金3'],
        recog['水4'],recog['金5'],
        recog['金6'],recog['水7'],
        recog['水8'],recog['水9']];

let armsNum = [recog['兵0'],recog['兵1'],
recog['兵2'],recog['兵3'],
recog['兵4'],recog['兵5'],
recog['兵6'],recog['兵7'],
recog['兵8'],recog['兵9'],
recog['兵div']];
// ====== start =======
// while (1) {
    //let num = 判断军队数量();
    // if(1){
    //     toastLog('2s后开始搜索对手');
    //     sleep(2000);
搜索();
    //     一键补兵();
    // } else{
    //     toastLog('军队数量不足，等待5分钟后继续');
    //     sleep(600*1000);
    // }
// }
// ===== end ======
function reflash() {
    金 = cp.imageToStringOrNumber(resourceNum, {
        region: [89, 131, 158, 42]
    });
    水 = cp.imageToStringOrNumber(resourceNum, {
        region: [89, 185, 158, 42]
    });
    黑 = cp.imageToStringOrNumber(resourceNum, {
        region: [89, 246, 158, 42]
    })
    log('金：%d, 水：%d, 黑水：%d', 金, 水, 黑);
}
function 攻击方式(army, method, param) {
    cp.clickOne(army, 10, false);
    if(param){
        method.apply(this,param);
    }
}
function 搜索(callback) {
    cp.clickOne("res/进攻.png", 10);
    cp.clickOne("res/搜索对手.png", 10);
    while (1) {
        while (!cp.getOne(recog['金'].path)) {
            sleep(3000);
        }
        toastLog('获取当前资源信息...');
        reflash();
        if (黑 >= 预期_黑 || 水 >= 预期_水 || 金 >= 预期_金) {
            toastLog('满足设定条件');
            ut.铃声();
            sleep(120*1000);
            // TODO: attack
            if (callback) callback();
            break;
        } else {
            toastLog('不满足设定，搜索下一个');
            sleep(2000);
            cp.clickOne("res/下一个.png", 10);
            sleep(2 * 1000);
        }
    }
}
function 进攻() {
    sleep(5*1000);
    toast('开始进攻！！');
    //攻击方式("res/胖子.png", am.四列散花,[4]);
    am.四列散花(["res/超哥.png"],12);
    toastLog("部队部署完成, 等待60s后自动结束战斗");
    sleep(60 * 1000);
    console.hide();
    cp.clickOne("res/放弃.png");
    cp.clickOne("res/确定.png");
    cp.clickOne("res/回营.png");
    // TODO: if(获取5颗胜利
}
function 一键补兵() {
    toastLog('准备补兵');
    sleep(3 * 1000);
    cp.clickOne('res/军队.png');
    cp.clickOne('res/一键训练.png');
    if(cp.getOne("res/训练_灰.png",null,{threshold: 0.9})){
        toast('无法完成一键训练');
    }else{
        cp.clickOne("res/训练_绿.png", 10,true,{threshold: 0.9});
    }
    cp.clickOne('res/x.png');
}

function 判断军队数量(){
    cp.clickOne('res/军队.png');
    toastLog("识别军队数量中...");
    let str = cp.imageToStringOrNumber(armsNum,{
        region: [346,129,518-346,186-129]
    })
    let num = Number(str.split(/[\/]/)[0]);
    toastLog('当前数量为'+num);
    sleep(2000);
    cp.clickOne('res/x.png');
    return num;
}
