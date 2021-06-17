var cp = require('./capture.js');
var ut = require('./utils.js');
var recog = require('./recognizable.js');
let ocr = $plugins.load('com.hraps.ocr');

// ==== 初始化数据 =======
var 金 = '';
var 水 = '';
var 黑 = '';
var 预期_金 = 600000;
var 预期_水 = 600000;
var 预期_黑 = 6000;
console.verbose('载入0-9字体库');
let resourceNum = [recog['金0'],recog['水1'],
        recog['金2'],recog['金3'],
        recog['水4'],recog['金5'],
        recog['金6'],recog['水7'],
        recog['水8'],recog['水9']];
if (!requestScreenCapture()) {
    toastLog("请求截图失败\n程序结束");
    exit();
}
sleep(4000);
var window = floaty.window(
    <frame>
        <text id="resource" w='*' text="资源信息" textSize="16sp" textColor="#ffffff" bg="#000000"/>
    </frame>
);
window.setPosition(device.width / 2, 150);
window.resource.click(() => {
    window.setAdjustEnabled(!window.isAdjustEnabled());
});
setInterval(() => {
    //对控件的操作需要在UI线程中执行
    ui.run(function() {
        window.resource.setText(info());
    });
}, 2000);

 threads.start(function(){
     //在新线程执行的代码
     搜索();
 });


function reflash() {
    金 = cp.imageToStringOrNumber(resourceNum, {
        region: [89, 131, 158, 42]
    });
    水 = cp.imageToStringOrNumber(resourceNum, {
        region: [89, 185, 158, 42]
    });
    黑 = cp.imageToStringOrNumber(resourceNum, {
        region: [89, 246, 158, 42]
    });
    //toastLog('金：'+金+'水：'+水+'黑水：'+ 黑);
}

function 搜索(callback) {
    i = 0;
    cp.clickOne("res/进攻.png", 10);
    cp.clickOne("res/搜索对手.png", 10);
    while (1) {
        while (!cp.getOne(recog['金'].path)) {
            toast("搜索中..");
            sleep(1000);
        }
        reflash();
        if (黑 >= 预期_黑 || 水 >= 预期_水 || 金 >= 预期_金) {
            toastLog('满足设定条件');
            ut.铃声();
            // TODO: attack
            if (callback) callback();
            exit();
        } else {
            cp.clickOne("res/下一个.png", 10);
        }
    }
}

function info() {
    return '金：' + 金 + '水：' + 水 + '黑水：' + 黑;
}