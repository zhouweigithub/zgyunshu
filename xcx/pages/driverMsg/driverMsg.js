var e = getApp(), t = require("../../6E9813C54BA130CF08FE7BC2013B9087.js");

Page({
    data: {
        focus: !1,
        searchName: "",
        array: "",
        noSearch: !1,
        list: "",
        have: !0
    },
    focus: function() {
        this.setData({
            focus: !0
        });
    },
    unfocus: function() {
        this.setData({
            focus: !1
        });
    },
    NameInput: function(e) {
        this.setData({
            searchName: e.detail.value
        });
    },
    searchDriver: function(a) {
        var n = this, r = n.data.searchName, i = wx.getStorageSync("token"), c = wx.getStorageSync("id"), s = new Date(), o = {
            name: r
        }, d = e.Encrypt(JSON.stringify(o)), u = {
            token: i,
            device_id: c,
            time: s
        }, f = e.Encrypt(JSON.stringify(u));
        wx.request({
            url: t.searchDriver,
            method: "POST",
            data: {
                data: d
            },
            header: {
                minerva: f
            },
            success: function(t) {
                var a = JSON.parse(e.Decrypt(t.data)).datas;
                null === a && n.setData({
                    noSearch: !0
                }), n.setData({
                    array: a,
                    have: !1
                });
            },
            fail: function(e) {}
        });
    },
    add: function(a) {
        var n = a.currentTarget.dataset.id, r = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, i = e.Encrypt(JSON.stringify(r)), c = {
            driver_id: n
        }, s = e.Encrypt(JSON.stringify(c));
        wx.request({
            url: t.bindDrive,
            method: "POST",
            header: {
                minerva: i
            },
            data: {
                data: s
            },
            success: function(t) {
                "1" == JSON.parse(e.Decrypt(t.data)).code && wx.showToast({
                    title: "请求信息已经发生",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(e) {}
        });
    },
    call: function(e) {
        var t = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    onLoad: function(a) {
        var n = this, r = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, i = e.Encrypt(JSON.stringify(r));
        wx.request({
            url: t.getDrivers,
            header: {
                minerva: i
            },
            success: function(t) {
                401 == t.statusCode && e.doLogin();
                var a = JSON.parse(e.Decrypt(t.data)).datas;
                a.length > 0 && n.setData({
                    have: !1,
                    list: a
                });
            },
            fail: function(e) {}
        });
    },
    del: function(a) {
        var n = a.currentTarget.dataset.id;
        wx.showActionSheet({
            itemList: [ "删除" ],
            success: function(a) {
                var r = {
                    token: wx.getStorageSync("token"),
                    device_id: wx.getStorageSync("id"),
                    time: new Date()
                }, i = {
                    driver_id: n
                }, c = e.Encrypt(JSON.stringify(i)), s = e.Encrypt(JSON.stringify(r));
                0 == a.tapIndex && wx.request({
                    url: t.Deldriver,
                    header: {
                        minerva: s
                    },
                    method: "POST",
                    data: {
                        data: c
                    },
                    success: function(e) {
                        wx.showToast({
                            title: "成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(e) {}
                });
            },
            fail: function(e) {}
        });
    }
});