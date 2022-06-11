require("../../9060E9B44BA130CFF60681B31D5B9087.js"), require("../../5D80C6344BA130CF3BE6AE33378B9087.js");

var a = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), t = getApp();

Page({
    data: {
        pointmsg: "身份提交审核页面，提交不可修改",
        src: "../../images/idcart1.png",
        src1: "../../images/idcart2.png",
        focus: !1,
        keyInput: "",
        inputData: "",
        loading: !1,
        disabled: !1,
        array: [ "个人", "白福昌信息部", "薛林生信息部", "赵练生信息部" ],
        index: 0,
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    getUserInfo: function(a) {
        t.globalData.userInfo = a.detail.userInfo, this.setData({
            userInfo: a.detail.userInfo,
            hasUserInfo: !0
        });
    },
    onShow: function() {
        var a = wx.getStorageSync("id");
        "" != a && null != a || wx.showToast({
            title: "无设备号",
            duration: 6e3
        });
    },
    bindPickerChange: function(a) {
        this.setData({
            index: a.detail.value
        });
    },
    chooseImg: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths;
                a.setData({
                    src1: e[0]
                });
            }
        });
    },
    chooseFaceImg: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths;
                a.setData({
                    src: e[0]
                });
            }
        });
    },
    focusEvent: function() {
        this.setData({
            focus: !0
        });
    },
    unFocusEvent: function() {
        this.setData({
            focus: !1
        });
    },
    bingKeyInput: function(a) {
        this.setData({
            keyInput: a.detail.value
        });
    },
    upInfo: function() {
        var e = wx.getStorageSync("id");
        if ("" != e && null != e) {
            var n = this;
            if (n.setData({
                inputData: n.data.keyInput,
                loading: !0,
                disabled: !0
            }), 0 !== n.data.inputData.length) if (n.data.inputData.length < 11) t.showInfo("手机号长度不够"); else {
                var s = new Date(), i = [];
                i[0] = n.data.src, i[1] = n.data.src1;
                var o = [];
                o[0] = "idcard1", o[1] = "idcard2";
                var r = t.globalData.userInfo.avatarUrl, c = n.data.index, u = {
                    number: n.data.inputData,
                    idcart1: "idcard1",
                    idcart2: "idcard2",
                    type: "101",
                    avatar: r,
                    owner_department: c,
                    device_id: e,
                    time: s
                }, d = t.Encrypt(JSON.stringify(u));
                t.uploadimg({
                    url: a.checkUrl,
                    files: i,
                    name: o,
                    data: d
                }, function(a) {
                    n.setData({
                        loading: !1
                    }), "101" == a ? (wx.showToast({
                        title: "注册成功",
                        icon: "success",
                        duration: 2e3
                    }), wx.reLaunch({
                        url: "../main/main",
                        success: function(a) {},
                        fail: function(a) {}
                    })) : (wx.showToast({
                        title: a,
                        duration: 2e3
                    }), n.setData({
                        disabled: !1
                    }));
                });
            } else t.showInfo("手机号不可空");
        } else wx.showToast({
            title: "无设备号",
            duration: 6e3
        });
    }
});