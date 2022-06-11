var a = require("../../9060E9B44BA130CFF60681B31D5B9087.js"), e = require("../../5D80C6344BA130CF3BE6AE33378B9087.js"), t = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), s = getApp();

Page({
    data: {
        pointmsg: "身份提交审核页面，提交不可修改",
        src: "../../images/idcart1.png",
        src1: "../../images/idcart2.png",
        src2: "../../images/carid.png",
        keyInput: ""
    },
    chooseImg: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths;
                a.setData({
                    src1: t[0]
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
            success: function(e) {
                var t = e.tempFilePaths;
                a.setData({
                    src: t[0]
                });
            }
        });
    },
    chooseCarImg: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths;
                a.setData({
                    src2: t[0]
                });
            }
        });
    },
    bingKeyInput: function(a) {
        this.setData({
            keyInput: a.detail.value
        });
    },
    upInfo: function() {
        var i = this;
        i.setData({
            inputData: i.data.keyInput,
            loading: !0
        }), 0 === i.data.inputData.length ? s.showInfo("手机号不可空") : i.data.inputData.length < 11 && s.showInfo("手机号长度不够");
        var r = e.formatTime(new Date()), c = (a.hexMD5(r + i.data.inputData), []);
        c[0] = i.data.src, c[1] = i.data.src1, c[2] = i.data.src2;
        var n = [];
        n[0] = "idcard1", n[1] = "idcard2", n[2] = "driverLicence";
        var o = {
            avatar: s.globalData.userInfo.avatarUrl,
            number: i.data.inputData,
            type: "102"
        };
        s.uploadimg({
            url: t.checkDriver,
            files: c,
            name: n,
            infos: o
        }, function(a) {
            i.setData({
                loading: !1
            }), "102" === a && wx.reLaunch({
                url: "../driverPage/driverpage",
                success: function(a) {},
                fail: function(a) {}
            });
        });
    }
});