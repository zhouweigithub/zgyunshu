var e = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), t = getApp();

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
        arrays: [],
        list: "",
        index: 0,
        listid: "",
        listindex: 0
    },
    onLoad: function() {
        var a = this, r = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, i = t.Encrypt(JSON.stringify(r));
        wx.request({
            url: e.getOrders,
            header: {
                minerva: i
            },
            success: function(e) {
                401 == e.statusCode && t.doLogin();
                var r = JSON.parse(t.Decrypt(e.data));
                if ("1" == r.code) {
                    var i = r.datas, s = [];
                    for (var d in i) {
                        var n = i[d].order_message.order_limit_time;
                        new Date().getTime() - new Date(n).getTime() < 864e5 ? i[d].checkTime = !0 : i[d].checkTime = !1, 
                        s.push(i[d]);
                    }
                    a.setData({
                        arrays: s
                    });
                }
            }
        }), wx.request({
            url: e.getDrivers,
            header: {
                minerva: i
            },
            success: function(e) {
                401 == e.statusCode && t.doLogin();
                var r = JSON.parse(t.Decrypt(e.data)).datas;
                if (r.length > 0) {
                    a.setData({
                        list: r
                    });
                    var i = [], s = [];
                    for (var d in r) i.push(r[d].driver_name), s.push(r[d].driver_id), a.setData({
                        list: i,
                        listid: s
                    });
                }
            },
            fail: function(e) {}
        });
    },
    bindPickerChange: function(a) {
        var r = this, i = a.currentTarget.dataset.id, s = a.detail.value;
        r.setData({
            listindex: s
        });
        var d = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, n = t.Encrypt(JSON.stringify(d)), c = {
            order_detail_id: i,
            driver_id: r.data.listid[r.data.listindex]
        }, o = t.Encrypt(JSON.stringify(c));
        wx.request({
            url: e.orderBindDriver,
            method: "POST",
            header: {
                minerva: n
            },
            data: {
                data: o
            },
            success: function(e) {
                "1" == JSON.parse(t.Decrypt(e.data)).code && wx.showToast({
                    title: "分配成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(e) {}
        });
    },
    toShow: function(e) {
        var t = "../ShowMeter/showmeter?date=" + JSON.stringify(e.currentTarget.dataset.id);
        e.currentTarget.dataset.id.driver_message && wx.navigateTo({
            url: t
        });
    }
});