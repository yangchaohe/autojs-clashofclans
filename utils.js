
var utils={};

/**
 * 根据 x 坐标从小到大进行排序 组合
 * @param {Array} - MatchingResult
 * @returns {Number} 
 */
utils.sortByResource=function(arr){
    arr.sort(function(a, b) {
        if (a.point.x < b.point.x ) return -1;
        if (a.point.x > b.point.x ) return 1;
    })
    var num='';
    arr.forEach(function(e,i){
        num+=e.num;
    })
    return Number(num);
}

//https://www.autojs.org/topic/3466/%E6%92%AD%E6%94%BE%E6%89%8B%E6%9C%BA%E9%93%83%E5%A3%B0
utils.铃声=function(铃声类型, 是否循环播放, 播放时长) {
    var 播放时长 = 播放时长 || 5*1000
    var 是否循环播放 = 是否循环播放 || false
    if (是否循环播放) {
      播放时长 = 666 * 1000
    }
    var 铃声选择结果 = android.media.RingtoneManager.TYPE_NOTIFICATION
    switch (铃声类型) {
      case 0:
        铃声选择结果 = android.media.RingtoneManager.TYPE_RINGTONE
        break;
      case 1:
        铃声选择结果 = android.media.RingtoneManager.TYPE_ALARM
        break;
      case 2:
        铃声选择结果 = android.media.RingtoneManager.TYPE_ALL
        break;
      default:
        break;
    }
    var mp = new android.media.MediaPlayer();
    mp.setDataSource(context, android.media.RingtoneManager.getDefaultUri(铃声选择结果));
    if (是否循环播放) mp.setLooping(true);
    mp.prepare();
    mp.start();
    threads.start(function () {
      sleep(播放时长)
      if (mp.isPlaying()) {
        mp.stop()
      }
    });
    return mp;
  }
// (y-y2)/(y1-y2)=(x-x2)/(x1-x2)
utils.获取坐标=function([x1,y1],[x2,y2],num){
  var 坐标=[]
  var step=0, x;
  var y=求直线方程([x1,y1],[x2,y2]);
  if(x1-x2>0){
      step = (x1-x2)/num;
      x=x1;
  }else{
      x=x2
      step = (x2-x1)/num;
  }
  while(num){
      x=x-step;
      log('添加坐标'+x+','+y(x));
      坐标.push([x,y(x)]);
      num--;
  }
  return 坐标;
}
/**
 * 两点求方程式 
 *  
 * @returns 返回f(x)函数
 */
function 求直线方程([x1,y1],[x2,y2]){
  var k,b;
  if (x1 == x2) {
      log('这是一条直线，暂时不做处理');
      return null;
  } else {
      k = (y1 - y2) / (x1 - x2);
      b = y1 - k * x1;
  }
  return function(x){
      return k*x+b;
  }
}
/**
* 
* @param {string} postion - 可选值left, right, top, bottom, right-top, right-bottom
*/
utils.调整界面=function(postion){
  switch(postion){
      case "right-top":
            gestures([0, 500, [324, 94], [222, 708]],
              [0, 500, [1881, 96], [222, 708]]);
            sleep(1000);
            break;
      case "right-bottom":
          gestures([0, 500, [1869, 856],[254, 76]],
            [0, 500, [238, 754], [254, 76]]);
            sleep(1000);
          break;
  }
}

module.exports = utils;