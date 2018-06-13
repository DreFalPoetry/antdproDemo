
//获取当前日期
export function getDate(i){
    var myDate = new Date();
    var lw = new Date(myDate - 1000 * 60 * 60 * 24 * i);//最后一个数字30可改，30天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth()+1;
    var lastD = lw.getDate();
    var startdate=lastY+"-"+(lastM<10 ? "0" + lastM : lastM)+"-"+(lastD<10 ? "0"+ lastD : lastD);//三十天之前日期
    return startdate;
}

//获取当月第一天的日期
export function getTheFirstDay(){
    var myDate = new Date();
    var lw = new Date(myDate);//最后一个数字30可改，30天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth()+1;
    var firstDay=lastY+"-"+(lastM<10 ? "0" + lastM : lastM)+"-"+"01";//三十天之前日期
    return firstDay;
}

export function getDateWithoutYear(i){
    var myDate = new Date();
    var lw = new Date(myDate - 1000 * 60 * 60 * 24 * i);//最后一个数字30可改，30天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth()+1;
    var lastD = lw.getDate();
    var startdate=(lastM<10 ? "0" + lastM : lastM)+"-"+(lastD<10 ? "0"+ lastD : lastD);//三十天之前日期
    return startdate;
}

export function getProgressSpeed(startTime,endTime){
    var startTime = new Date(startTime);
    var endTime = new Date(endTime);
    var myDate = new Date();
    var speed = (myDate - startTime)/(endTime - startTime);
    var speedPoint = null;
    if(speed <= 0){
        speedPoint = 0;
    }else if(speed >0 && speed <1){
        speedPoint =  parseInt(speed*100) 
    }else{
        speedPoint = 100;
    }
    return speedPoint;
}

export function getParam(name) {
    var hash = window.location.hash;
    var search ="?"+hash.split('?')[1];
    console.log(search);
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
};

//拼接字符串
export function splicingCharacter(...args) {
    let arr1 = args;
    console.log(arr1);
    return arr1.filter(item=>item).join(',');
    // return items;
};