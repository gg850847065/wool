global["device"].__proto__ = global["device"].__proto__ || {};

let ext = {
    /**
     * device.keepScreenOn()
     * @memberOf setDeviceProto
     * @param [duration] {number} could be minute (less than 100) or second -- 5 and 300000 both for 5 min
     * @param [params] {object}
     * @param [params.debug_info_flag] {boolean}
     */
    keepOn: function (duration, params) {
        params = params || {};
        duration = duration || 5;
        if (duration < 100) duration *= 60000;
        device.keepScreenOn(duration);
        if (params.debug_info_flag !== false) {
            debugInfo("已设置屏幕常亮");
            debugInfo(">最大超时时间: " + +(duration / 60000).toFixed(2) + "分钟");
        }
    },
    /**
     * device.cancelKeepingAwake()
     * @memberOf setDeviceProto
     * @param [params] {object}
     * @param [params.debug_info_flag] {boolean}
     */
    cancelOn: function (params) {
        // click(Math.pow(10, 7), Math.pow(10, 7));
        params = params || {};
        device.cancelKeepingAwake();
        if (params.debug_info_flag !== false) {
            debugInfo("屏幕常亮已取消");
        }
    },
};

module.exports = Object.assign({
    load: () => Object.assign(global["device"].__proto__, ext),
}, ext);

// tool function(s) //

// updated: Dec 3, 2019
function debugInfo(msg, info_flag, forcible_flag) {
    global["$$flag"] = global["$$flag"] || {};
    let $$flag = global["$$flag"];

    let _showSplitLine = typeof showSplitLine === "undefined" ? showSplitLineRaw : showSplitLine;
    let _messageAction = typeof messageAction === "undefined" ? messageActionRaw : messageAction;

    let global_flag = $$flag.debug_info_avail;
    if (!global_flag && !forcible_flag) return;
    if (global_flag === false || forcible_flag === false) return;

    let classof = o => Object.prototype.toString.call(o).slice(8, -1);

    if (typeof msg === "string" && msg.match(/^__split_line_/)) msg = setDebugSplitLine(msg);

    let info_flag_str = (info_flag || "").toString();
    let info_flag_msg_level = +(info_flag_str.match(/\d/) || [0])[0];

    if (info_flag_str.match(/Up/)) _showSplitLine();
    if (info_flag_str.match(/both|up/)) debugInfo("__split_line__" + (info_flag_str.match(/dash/) ? "dash" : ""), "", forcible_flag);

    if (classof(msg) === "Array") msg.forEach(msg => debugInfo(msg, info_flag_msg_level, forcible_flag));
    else _messageAction((msg || "").replace(/^(>*)( *)/, ">>" + "$1 "), info_flag_msg_level);

    if (info_flag_str.match("both")) debugInfo("__split_line__" + (info_flag_str.match(/dash/) ? "dash" : ""), "", forcible_flag);

    // raw function(s) //

    function showSplitLineRaw(extra_str, style) {
        let _extra_str = extra_str || "";
        let _split_line = "";
        if (style === "dash") {
            for (let i = 0; i < 17; i += 1) _split_line += "- ";
            _split_line += "-";
        } else {
            for (let i = 0; i < 33; i += 1) _split_line += "-";
        }
        return ~console.log(_split_line + _extra_str);
    }

    function messageActionRaw(msg, lv, if_toast) {
        let _s = msg || " ";
        if (lv && lv.toString().match(/^t(itle)?$/)) {
            let _par = ["[ " + msg + " ]", 1, if_toast];
            return messageActionRaw.apply({}, _par);
        }
        let _lv = +lv;
        if (if_toast) {
            toast(_s);
        }
        if (_lv >= 3) {
            if (_lv >= 4) {
                console.error(_s);
                if (_lv >= 8) {
                    exit();
                }
            } else {
                console.warn(_s);
            }
            return;
        }
        if (_lv === 0) {
            console.verbose(_s);
        } else if (_lv === 1) {
            console.log(_s);
        } else if (_lv === 2) {
            console.info(_s);
        }
        return true;
    }

    // tool function(s) //

    function setDebugSplitLine(msg) {
        let _msg = "";
        if (msg.match(/dash/)) {
            for (let i = 0; i < 17; i += 1) _msg += "- ";
            _msg += "-";
        } else {
            for (let i = 0; i < 33; i += 1) _msg += "-";
        }
        return _msg;
    }
}