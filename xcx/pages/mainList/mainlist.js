var e = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), t = getApp();

Page({
    data: {
        array: "",
        userInfo: "",
        access_token: "",
        id: "",
        have: !1,
        src: "",
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
        arrays: [],
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        tabBar: {
            color: "#888",
            selectedColor: "#888",
            backgroundColor: "#fff",
            borderStyle: "#ccc",
            list: [ {
                pagePath: "/pages/driverPage/driverpage",
                text: "首页",
                iconPath: "../../images/main.png",
                selectedIconPath: "../../images/main_focus.png",
                selectedColor: "#535353",
                color: "#888",
                active: !0
            }, {
                pagePath: "/pages/driverList/driverlist",
                text: "我的",
                iconPath: "../../images/userinfo.png",
                selectedIconPath: "../../images/userinfo_focus.png",
                selectedColor: "#535353",
                color: "#888",
                active: !1
            } ]
        }
    },
    onLoad: function() {
        var a = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, r = t.Encrypt(JSON.stringify(a)), n = this, s = void 0;
        wx.getUserInfo({
            success: function(e) {
                s = e.userInfo, n.setData({
                    userInfo: s
                }), wx.setStorageSync("userInfo", s);
            }
        }), wx.request({
            url: e.getDriverOrder,
            header: {
                minerva: r
            },
            success: function(e) {
                401 == e.statusCode && t.doLogin();
                var a = JSON.parse(t.Decrypt(e.data));
                if ("1" == a.code) {
                    var r = a.datas;
                    r.length > 0 && n.setData({
                        have: !0
                    });
                    for (var s in r) "waiting" == r[s].order_status && n.setData({
                        arrays: r[s],
                        id: r[s].order_detail_id
                    });
                }
            },
            fail: function(e) {}
        });
    },
    bindGetUserInfo: function(e) {
        var t = this, a = e.detail.userInfo;
        t.setData({
            userInfo: a,
            canIUse: !1
        }), wx.setStorageSync("userInfo", a);
    },
    showCode: function() {
        var a = this, r = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, n = t.Encrypt(JSON.stringify(r)), s = {
            id: a.data.id,
            page: "pages/checkOrderinfo/checkinfo"
        }, i = t.Encrypt(JSON.stringify(s));
        wx.request({
            url: e.getOr,
            method: "POST",
            header: {
                minerva: n
            },
            data: {
                data: i
            },
            success: function(e) {
                var r = JSON.parse(t.Decrypt(e.data)).img;
                a.setData({
                    src: r
                });
            },
            fail: function(e) {}
        });
    },
    closeInfo: function() {
        this.setData({
            src: ""
        });
    }
});