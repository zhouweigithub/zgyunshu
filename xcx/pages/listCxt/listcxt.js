var a = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), r = getApp();

Page({
    data: {
        array: [ {
            address: "石楼",
            time: "2018-10-20 12:30:12",
            price: 89,
            carMain: "刘力瑄",
            status: !0,
            carNumber: "晋J45673"
        }, {
            address: "石楼",
            time: "2018-10-20 12:30:12",
            price: 89,
            carMain: "刘力瑄",
            status: !1,
            carNumber: "晋J45673"
        } ],
        arrays: []
    },
    onLoad: function() {
        var e = this, t = wx.getStorageSync("token");
        wx.request({
            url: a.getDriverOrder,
            header: {
                token: t
            },
            success: function(a) {
                if (401 == a.statusCode && r.doLogin(), "1" == a.data.code) {
                    var t = a.data.datas, s = [];
                    for (var i in t) s.push(t[i]);
                    e.setData({
                        arrays: s
                    });
                }
            }
        });
    }
});