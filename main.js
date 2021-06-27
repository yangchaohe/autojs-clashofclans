//载入模块
var am = require('attackMethod.js');

auto.waitFor();

if(currentPackage()!='com.supercell.clashofclans'){
    toastLog('打开部落冲突');
    launch('com.supercell.clashofclans');
}
sleep(5 * 1000);

var search = "./search.js";

if (!files.exists(search)) {
    toast("脚本文件不存在: " + path);
    exit();
}
var window = floaty.window(
    <frame gravity="center">
        <button id="action" text="自动搜鱼" w="90" h="45" bg="#77ffffff"/>
    </frame>
);
window.setPosition(device.width/2,0);
setInterval(() => {
    log(engines.all().length);
    if(engines.all().length>=2){
        window.action.setText('运行中..');
    }else{
        window.action.setText('自动搜鱼');
    }
}, 1000);

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                startScript(search);
            }
            return true;
    }
    return true;
});

function startScript(path) {
    if (window.action.getText() == '自动搜鱼') {
        execution = engines.execScriptFile(path);
        window.action.setText('停止运行');
    } else {
        if (execution) {
            execution.getEngine().forceStop();
        }
        window.action.setText('自动搜鱼');
    }
}