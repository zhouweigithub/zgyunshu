var e = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), a = getApp();

Page({
    data: {
        src: "../../images/idcart1.png",
        disabled: !1
    },
    chooseImg: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                e.setData({
                    src: a.tempFilePaths[0]
                });
            },
            fail: function(e) {}
        });
    },
    updata: function() {
        var t = this;
        t.setData({
            disabled: !0
        });
        var i = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, s = a.Encrypt(JSON.stringify(i));
        wx.uploadFile({
            url: e.addDriver,
            filePath: t.data.src,
            name: "idcard1",
            header: {
                minerva: s
            },
            success: function(e) {
                1 == JSON.parse(a.Decrypt(e.data)).code ? (wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3
                }), wx.setStorageSync("isDriver", !0), wx.navigateTo({
                    url: "../driverMsg/driverMsg"
                })) : (wx.showToast({
                    title: "失败",
                    duration: 2e3
                }), t.setData({
                    disabled: !1
                }));
            },
            fail: function(e) {
                wx.showToast({
                    title: "失败",
                    duration: 2e3
                }), t.setData({
                    disabled: !1
                });
            }
        });
    }
});