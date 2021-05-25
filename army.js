var cp=require('capture.js');
var army = {};

army.select = function(army,method){
    cp.clickOne(army,5,false);
    method();
}
