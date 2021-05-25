auto.waitFor();
var cp = require('capture.js');
var ut = require('utils.js');
var am = require('attackMethod.js');
var recog = require('recognizable.js');
if (!requestScreenCapture()) {
    toast("请求截图失败\n程序结束");
    exit();
}
sleep(2 * 1000);
// log(cp.getOne("res/训练_灰.png",null,{threshold: 0.9}));
// if(cp.getOne("res/训练_灰.png",function(p){
//     press(p.x,p.y,2000);
// },{threshold: 0.9})){
//     toast('无法完成一键训练');
// }else{
//     cp.clickOne("res/训练_绿.png", 10,true,{threshold: 0.9});
// }
// am.四列散花();

let recogList = [recog['兵0'],recog['兵1'],
            recog['兵2'],recog['兵3'],
            recog['兵4'],recog['兵5'],
            recog['兵6'],recog['兵7'],
            recog['兵8'],recog['兵9'],
            recog['兵div']
            ];
//let str = cp.imageToStringOrNumber(recogList,{
 //       region: [346,129,518-346,186-129]
//})
//log(str);
// log(cp.getArray('res/兵div.png'));
// 
// log(cp.getArray('res/兵div2.png'));
//ut.调整界面('right-bottom');
ut.铃声();