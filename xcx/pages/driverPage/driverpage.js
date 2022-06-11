var e = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), a = getApp();

Page({
    data: function(e, a, t) {
        return a in e ? Object.defineProperty(e, a, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[a] = t, e;
    }({
        array: "",
        userInfo: "",
        access_token: "",
        id: "",
        src: "",
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        arrayinfo: [ {
            name: "棒材",
            format: "12*9M",
            num: "3",
            material: "热轧带肋钢筋",
            serial: "HRB400E"
        }, {
            name: "棒材",
            format: "12*9M",
            num: "6",
            material: "热轧带肋钢筋",
            serial: "HRB460E"
        } ],
        info: {
            address: "石楼",
            time: "2018-10-20 10:20:38",
            price: 85,
            carId: "晋J34901"
        },
        have: !1,
        arrays: [],
        hasUserInfo: !1
    }, "canIUse", wx.canIUse("button.open-type.getUserInfo")),
    onLoad: function() {
        var t = wx.getStorageSync("token"), n = this, r = void 0;
        wx.getUserInfo({
            success: function(e) {
                r = e.userInfo, n.setData({
                    userInfo: r
                }), wx.setStorageSync("userInfo", r);
            }
        }), wx.request({
            url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx90004ee6618aa5ce&secret=8f5e734d8eba62a58bbe72bca3434823",
            success: function(e) {
                n.setData({
                    access_token: e.data.access_token
                });
            }
        }), wx.request({
            url: e.getDriverOrder,
            header: {
                token: t
            },
            success: function(e) {
                401 == e.statusCode && a.doLogin();
                var t = JSON.parse(a.Decrypt(e.data));
                if ("1" == t.code) {
                    var r = t.datas;
                    for (var s in r) "waiting" == r[s].order_status && n.setData({
                        arrays: r[s],
                        id: r[s].order_detail_id,
                        have: !0
                    });
                }
            },
            fail: function(e) {}
        });
    },
    bindGetUserInfo: function(e) {
        var a = this, t = e.detail.userInfo;
        a.setData({
            userInfo: t,
            canIUse: !1
        }), wx.setStorageSync("userInfo", t);
    },
    showCode: function() {
        var a = this, t = a.data.access_token, n = wx.getStorageSync("token"), r = a.data.id;
        wx.request({
            url: e.getOr,
            method: "POST",
            header: {
                token: n
            },
            data: {
                access_token: t,
                id: r,
                page: "pages/checkOrderinfo/checkinfo"
            },
            success: function(e) {
                var t = e.data.img;
                a.setData({
                    src: t
                });
            },
            fail: function(e) {}
        });
    }
});