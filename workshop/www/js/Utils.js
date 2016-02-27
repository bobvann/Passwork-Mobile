Utils = {};

Utils.DEVICES = {
    IOS: 1,
    ANDROID: 2,
    WPHONE: 3
};

Utils.getDevice = function(){
    if( /(android)/i.test(navigator.userAgent) ) {
        return Utils.DEVICES.ANDROID;
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        return Utils.DEVICES.IOS;
    } else {
        return Utils.DEVICES.WPHONE;
    }
};