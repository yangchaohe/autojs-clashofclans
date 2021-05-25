
var capture = {};

/** 
 * 当前界面里找小图，自动回收，返回该图坐标，支持回调函数, 参数是小图坐标
 * 
 * @param {string} imgPath - 匹配图片路径
 * @callback callback  找到则执行该函数
 * @param {Objcet} [threshold=0.6] - 图片相似度。取值范围为0~1的浮点数
 * @return {Point|null} - 找到返回Point对象，否则null
*/
capture.getOne = function (imgPath, callback, options) {
    var tar = images.read(imgPath);
    var p = findImage(captureScreen(), tar, {
        threshold: options && options.threshold || 0.6
    });
    tar.recycle();
    if (p) {
        if(callback && typeof callback === "function"){
            var fn = callback;
            res = fn(p);
            if (res) return res;
        }
        return p;
    } else {
        console.warn('没有找到图' + imgPath);
        return null;
    }
}
/** 
 * 当前界面匹配一组小图，可执行回调函数并返回执行结果
 * @param   {string} imgPaths -      匹配图片路径
 * @param   {Objcet}    [threshold=0.6] - 图片相似度。取值范围为0~1的浮点数
 * @returns                             找到返回MatchingResult，否则null
 * @callback callback                   找到则执行该函数，返回结果
*/
capture.getArray = function (imgPath, callback, options) {
    var tar = images.read(imgPath);
    var result = images.matchTemplate(captureScreen(), tar, {
        threshold: options && options.threshold || 0.6,
        region: options && options.region || []
    });
    tar.recycle();
    if (result) {
        if (callback && typeof callback === "function") {
            return callback(result);
        }
        return result;
    } else {
        console.warn('没有找到图' + imgPath);
        return null;
    }
}
/**
 * 传递多个recognizable对象，匹配多组小图, 将image.text通过匹配的坐标(x or y)从小到大的组成字符串。
 * 如果是纯数字，则返回Number
 * @param   {Object} 
 * @param   {String} xory - 'x'或者'y', 默认x
 * @returns {String|Number}
 */
capture.imageToStringOrNumber = function (recognizable, options,xory) {
    var results = [];
    let str = '';
    xory = xory || 'x';
    options = options || {};
    recognizable.forEach((re) => {
        capture.getArray(re.path,(res) => {
            res.matches.forEach((match) => {
                // log(re.text+':'+match.similarity);
                results.push({
                    text: re.text,
                    point: match.point,
                    similarity: match.similarity
                })
            });
        }, options)
    })
    if(xory == 'x'){
        results.sort(function (a, b) {
            if (a.point.x < b.point.x) return -1;
            if (a.point.x > b.point.x) return 1;
        })
    } else {
        results.sort(function (a, b) {
            if (a.point.y < b.point.y) return -1;
            if (a.point.y > b.point.y) return 1;
        })
    }
    results.forEach(function (e, i) {
        str += e.text;
    })
    if(isNaN) return str;
    return Number(str);
}
/**
 * 
 * 随机点击小图的某个位置
 * @param {Number} pixel - 偏移像素最大值, 默认10
 * @param {Boolean} check - 是否检测点击情况，默认是
 */
capture.clickOne = function (imgPath, pixel, check, options) {
    //取得随机值<=pixel
    var i = 0;
    pixel = pixel || 10;
    var pix = Math.floor(Math.random() * pixel);
    check = options && options.check || true;
    if (check) {
        while (!capture.getOne(imgPath, function (p) {
            click(p.x + pix, p.y + pix);
            // log('点击了%d,%d', p.x + pix, p.y + pix);
            sleep(2000);
        }, options)) {
            if (i > 3) {
                console.error('尝试三次无法点击%s，可能是网络问题或者有悬浮窗遮挡\n请手动解决', imgPath);
                sleep(5 * 1000);
                break;
            }
            console.warn("没有找到%s。2s后重新点击", imgPath);
            sleep(2 * 1000);
            i++
        }
    } else if (!capture.getOne(imgPath, function (p) {
        click(p.x + pix, p.y + pix);
        //log('点击了%d,%d', p.x + pix, p.y + pix);
        sleep(2000);
    }, options)) return null;
}
module.exports = capture;
