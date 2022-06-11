var t = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), e = getApp();

Page({
    data: {
        cars: ""
    },
    addCar: function() {
        wx.navigateTo({
            url: "../addCar/addCar"
        });
    },
    onLoad: function() {
        this.showInfo();
    },
    onShow: function() {
        this.showInfo();
    },
    showInfo: function() {
        var a = this, n = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, r = e.Encrypt(JSON.stringify(n));
        wx.request({
            url: t.getTruck,
            header: {
                minerva: r
            },
            success: function(t) {
                var n = JSON.parse(e.Decrypt(t.data));
                n.length > 0 && a.setData({
                    cars: n
                });
            },
            fail: function(t) {}
        });
    },
    choose: function(t) {
        var e = this, a = t.currentTarget.dataset.index, n = t.currentTarget.dataset.change;
        wx.showActionSheet({
            itemList: [ "查看" ],
            success: function(t) {
                0 == t.tapIndex ? wx.navigateTo({
                    url: "../TruckInfo/truckinfo?id=" + a
                }) : 1 == t.tapIndex && (1 == n ? e.delCar(a) : 0 == n && wx.showToast({
                    title: "无删除权限",
                    duration: 2e3
                }));
            },
            fail: function(t) {}
        });
    },
    delCar: function(a) {
        var n = this, r = a, i = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, c = e.Encrypt(JSON.stringify(i)), o = {
            truck_id: r
        }, s = e.Encrypt(JSON.stringify(o));
        wx.request({
            url: t.DelTruck,
            method: "POST",
            data: {
                data: s
            },
            header: {
                minerva: c
            },
            success: function(t) {
                JSON.parse(e.Decrypt(t.data));
                n.setData({
                    cars: ""
                });
            },
            fail: function(t) {}
        });
    }
});