var e = require("../../6E9813C54BA130CF08FE7BC2013B9087.js");

Page({
    data: {
        owner: "",
        arrays: "",
        id: ""
    },
    onLoad: function() {
        var a = this, t = wx.getStorageSync("token");
        wx.request({
            url: e.getBindOwner,
            header: {
                token: t
            },
            success: function(e) {
                "1" == e.data.code && a.setData({
                    owner: e.data.datas
                });
            },
            fail: function(e) {}
        }), wx.request({
            url: e.getBindInfo,
            header: {
                token: t
            },
            success: function(e) {
                var t = e.data.bind_info;
                "1" == e.data.code & t.length > 0 && a.setData({
                    arrays: t
                });
            },
            fail: function(e) {}
        });
    },
    callPhone: function() {
        var e = this;
        wx.makePhoneCall({
            phoneNumber: e.data.owner.phone
        });
    },
    bindOwner: function(a) {
        var t = this, n = wx.getStorageSync("token"), r = a.currentTarget.dataset.id, o = a.currentTarget.dataset.index, d = t.data.arrays[o];
        wx.request({
            url: e.bindOwner,
            header: {
                token: n
            },
            method: "POST",
            data: {
                owner_id: r
            },
            success: function(e) {
                "1" == e.data.code && t.setData({
                    owner: d,
                    arrays: ""
                });
            },
            fail: function(e) {}
        });
    }
});