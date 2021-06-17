let armsNum = [recog['兵0'],recog['兵1'],
recog['兵2'],recog['兵3'],
recog['兵4'],recog['兵5'],
recog['兵6'],recog['兵7'],
recog['兵8'],recog['兵9'],
recog['兵div']];
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
