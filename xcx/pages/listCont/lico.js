var t = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), a = getApp();

Page({
    data: {
        hasInfo: !1,
        array: "",
        cars: "",
        drivers: "",
        count: "",
        carId: [],
        driverId: [],
        multiArray: [],
        truck_licence: [],
        multiIndex: 0,
        latitude: 37.36621,
        ongitude: 111.17203,
        distance: "",
        disabled: !0,
        count_down: "",
        ruleDistance: "",
        animation: "",
        putInfo: !1
    },
    onLoad: function(e) {
        var r = this, n = getCurrentPages();
        console.log(n[n.length - 1].route);
        var i = JSON.parse(a.Decrypt(e.array));
        r.setData({
            array: i,
            count: i.order_left_car
        });
        var d = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, o = a.Encrypt(JSON.stringify(d));
        wx.request({
            url: t.CanTruck,
            header: {
                minerva: o
            },
            success: function(t) {
                var e = JSON.parse(a.Decrypt(t.data)).date, n = JSON.parse(a.Decrypt(t.data)).truckInfos;
                r.setData({
                    cars: n,
                    hasInfo: !0
                });
                var i = parseInt(e / 1e3), d = r.data.array.order_limit_time, o = i - Date.parse(new Date(d)) / 1e3;
                o = o < 30 ? 30 - o : 6, r.getInfo(), r.getTime(o);
            }
        });
    },
    getInfo: function() {
        var t = this, a = t.data.array.order_axle, e = t.data.array.order_bridge, r = t.data.array.order_railing, n = !1, i = !1, d = !1, o = t.data.cars, c = [], s = [], u = [];
        for (var l in o) if (i = "不限" == e || e == o[l].truck_bridge, d = "不限" == r || r == o[l].carrige_type, 
        n = "不限" == a || a == o[l].truck_axle, i & d & n) {
            c = t.data.carId, s = t.data.multiArray, u = t.data.truck_licence;
            var g = o[l];
            c.push(g.truck_id), u.push(g.truck_licence), s.push(g.truck_licence), t.setData({
                carId: c,
                multiArray: s
            });
        }
    },
    getTime: function(t) {
        var a = this, e = t;
        e > 0 ? setTimeout(function() {
            e -= 1, a.setData({
                count_down: e + "s"
            }), a.getTime(e);
        }, 1e3) : a.data.carId.length > 0 ? a.setData({
            count_down: "抢",
            disabled: !1
        }) : (a.setData({
            count_down: "抢"
        }), wx.showToast({
            title: "无合规车辆",
            duration: 6e3
        }));
    },
    bindPickerChange: function(e) {
        var r = this;
        r.setData({
            disabled: !0
        }), r.setData({
            multiIndex: e.detail.value
        });
        var n = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, i = a.Encrypt(JSON.stringify(n)), d = (t.sock, r.data.multiIndex), o = r.data.carId[d], c = r.data.truck_licence[d], s = r.data.multiIndex[1], u = (r.data.driverId[s], 
        {
            order_id: r.data.array.order_id,
            truck_id: o,
            truck_licence: c
        }), l = a.Encrypt(JSON.stringify(u));
        r.setData({
            hasInfo: !1,
            count_down: ""
        }), r.data.putInfo || (r.setData({
            putInfo: !0
        }), wx.request({
            url: t.placeonOrder,
            header: {
                minerva: i
            },
            method: "POST",
            data: {
                data: l
            },
            success: function(t) {
                if (401 == t.statusCode) {
                    getCurrentPages();
                    a.doLogin();
                }
                r.setData({
                    hasInfo: !0,
                    putInfo: !1
                });
                var e = JSON.parse(a.Decrypt(t.data));
                "1" == e.code ? (r.setData({
                    count: e.count,
                    carId: [],
                    multiArray: [],
                    count_down: "抢",
                    disabled: !1
                }), wx.showToast({
                    title: "抢单成功",
                    icon: "success",
                    duration: 1e3
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: "../mainOrder/mainorder"
                    });
                }, 2e3), r.getInfo()) : "0" == e.code && (wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 4e3
                }), r.setData({
                    count: e.count,
                    carId: [],
                    multiArray: [],
                    disabled: !1
                }), r.getInfo());
            }
        }));
    }
});