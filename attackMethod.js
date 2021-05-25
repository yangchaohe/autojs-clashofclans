var ut = require("./utils.js");
var cp = require('./capture.js');

var attackMethod = {};

attackMethod.四列散花 = function(armys, a, b, c, d) {
    a = a || 10;
    b = b || a;
    c = c || a;
    d = d || a;
    var 第一列 = ut.获取坐标([1015, 114], [154, 742], a);
    var 第二列 = ut.获取坐标([1015, 114], [1867, 732], b);
    toastLog('调整界面-->右上');
    ut.调整界面('right-top');
    armys.forEach((a) => {
        cp.clickOne(a);
        第一列.forEach(function(e) {
           // click(e[0], e[1]);
            press(e[0],e[1],300);
        })
        第二列.forEach(function(e) {
            //click(e[0], e[1]);
            press(e[0],e[1],400);
        })
    })

    toastLog('调整界面-->右下');
    ut.调整界面('right-bottom');
    var 第三列 = ut.获取坐标([1040, 842], [290, 290], c);
    var 第四列 = ut.获取坐标([1040, 842], [1834, 256], d);
    armys.forEach((a) => {
        cp.clickOne(a);
        第三列.forEach(function(e) {
            //click(e[0], e[1]);
            press(e[0],e[1],200);
        })
        第四列.forEach(function(e) {
           // click(e[0], e[1]);
            press(e[0],e[1],350);
        })
    })
}
module.exports = attackMethod;