
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