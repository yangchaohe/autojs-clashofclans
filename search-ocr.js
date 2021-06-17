var cp = require('./capture.js');
var ut = require('./utils.js');
var recog = require('./recognizable.js');
let ocr = $plugins.load('com.hraps.ocr');

// ==== 初始化数据 =======
var 金 = '';
var 水 = '';
var 黑 = '';
var 预期_金 = 700000;
var 预期_水 = 700000;
var 预期_黑 = 6000;
if (!requestScreenCapture()) {
    toastLog("请求截图失败\n程序结束");
    exit();
}

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
}, 1000);

// threads.start(function(){
//     //在新线程执行的代码
//     搜索();
// });


function reflash() {
    let img = captureScreen();
    img = images.clip(img, 96, 130, 252 - 96, 302 - 130);
    images.save(img, "t1.png")
    img = images.grayscale(img);
    img = images.threshold(img, 210, 255, "BINARY_INV");
    //img = images.inRange(img,"#FF1C1B16","#ffffff")
    images.save(img, 'test.png')
    let bitmap = img.getBitmap();
    let results = ocr.detect(bitmap, 0.9);
    img.recycle();
    for (var i = 0; i < results.size(); i++) {
        var re = results.get(i)
        log("结果:" + i + "  文字:" + re.text + "  位置:" + re.frame + "  角度类型:" + re.angleType)
        log("区域置信度:" + re.dbScore + "  角度置信度:" + re.angleScore + "  文字置信度:" + re.crnnScore + "\n")
    }
    if (results.size() == 3) {
        金 = results.get(0).text;
        水 = results.get(1).text;
        黑 = results.get(2).text;
    }else{
        toastLog("识别错误");
    }
    //toastLog('金：'+金+'水：'+水+'黑水：'+ 黑);
}

function 搜索(callback) {
    i = 0;
    cp.clickOne("res/进攻.png", 10);
    cp.clickOne("res/搜索对手.png", 10);
    sleep(3000);
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
            sleep(500);
            cp.clickOne("res/下一个.png", 10);
        }
    }
}

function info() {
    return '金：' + 金 + '水：' + 水 + '黑水：' + 黑;
}