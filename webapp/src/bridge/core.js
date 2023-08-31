var callbackMap = {};
var eventCallMap = {};

var Bridge = {
    //核心方法
    open: function (msg, callback) {
        if (callback && typeof (callback) === 'function') {
            var callbackid = this.getNextCallbackID();
            callbackMap[callbackid] = callback
            msg.callback = 'window.callbackDispatcher'
            msg.callbackId = callbackid
        }
        if (this.isIOS()) {
            try {
                var resultIOS = prompt(JSON.stringify(msg))
                return resultIOS
            } catch (error) {
                console.log('error native message')
            }
        } else if (this.isAndroid()) {
            try {
                var resultAndroid = window.YourAndroidJsInterfaceName.prompt(JSON.stringify(msg))
                return resultAndroid
            } catch (error) {
                console.log('error native message')
            }
        }
    },

    //生成随机callbackId
    getNextCallbackID: function () {
        let timestamp = new Date().getTime();
        let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let maxPos = $chars.length;
        let randomStr = '';
        for (let i = 0; i < 32; i++) {
            randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return randomStr + timestamp;
    },

    //判断Android
    isAndroid: function () {
        let u = navigator.userAgent
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    },

    //判断iOS
    isIOS: function () {
        let u = navigator.userAgent
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },

};

//js to native 回调处理器
window.callbackDispatcher = function (callbackId, resultjson) {
    var callback = callbackMap[callbackId];
    if (callback && typeof (callback) === 'function') {
        console.log(resultjson);
        var resultObj = resultjson ? JSON.parse(resultjson) : {};
        callback(resultObj);
    }
}

//监听的API
window.onListenEvent = function (eventId, handler) {
    if (handler && typeof (handler) === 'function') {
        eventCallMap[eventId] = handler;
    }
}

//native to js 回调处理器
window.eventDispatcher = function (eventId, resultjson) {
    var handler = eventCallMap[eventId];
    if (handler && typeof (handler) === 'function') {
        var resultObj = resultjson ? JSON.parse(resultjson) : {};
        var returnData = handler(resultObj);
        return returnData;
    }
}

export default Bridge