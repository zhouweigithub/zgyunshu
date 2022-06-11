function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../06EB37274BA130CF608D5F20C14B9087.js"), a = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), i = getApp(), n = require("../../5D80C6344BA130CF3BE6AE33378B9087.js");

Page({
    data: {
        markers: [ {
            iconPath: "../../images/gray_north.gif",
            id: 0,
            latitude: 37.351504426104,
            longitude: 111.172906687322,
            width: 24,
            height: 34,
            callout: {
                content: " 车牌:晋AN067A \n 设备号:sfddsfsfs32  \n 地址:山西省吕梁市中阳县宁乡镇中阳钢铁集团运输处 \n 速度：20km/h",
                color: "#535353",
                fontSize: 12,
                borderRadius: 10,
                bgColor: "#ffffff",
                padding: 10,
                textAlign: "left",
                display: "BYCLICK"
            }
        } ],
        distance: "",
        cost: "",
        polyline: [],
        carid: "",
        array: "",
        scale: 9,
        lat: "",
        lon: ""
    },
    onLoad: function() {
        var t = this, e = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, n = i.Encrypt(JSON.stringify(e));
        wx.request({
            url: a.getTruck,
            header: {
                minerva: n
            },
            success: function(e) {
                var a = JSON.parse(i.Decrypt(e.data));
                t.setData({
                    array: a,
                    carid: a[0].truck_licence
                });
                var n = t.data.array[0].truck_id;
                t.getPosition(n), t.getTime(9);
            },
            fail: function(t) {}
        });
    },
    getTime: function(t) {
        var e = this, a = t;
        a < 16 && setTimeout(function() {
            a += 1, e.setData({
                scale: a
            }), e.getTime(a);
        }, 200);
    },
    showMap: function(t) {
        var a = this;
        new e.AMapWX({
            key: "e0cd5c699defc1d03995ab07324b9eee"
        }).getDrivingRoute({
            origin: "111.1720300000,37.3662100000",
            destination: t,
            success: function(t) {
                var e = [];
                if (t.paths && t.paths[0] && t.paths[0].steps) for (var i = t.paths[0].steps, n = 0; n < i.length; n++) for (var o = i[n].polyline.split(";"), r = 0; r < o.length; r++) e.push({
                    longitude: parseFloat(o[r].split(",")[0]),
                    latitude: parseFloat(o[r].split(",")[1])
                });
                t.paths[0] && t.paths[0].distance && a.setData({
                    distance: t.paths[0].distance + "米"
                }), t.taxi_cost && a.setData({
                    cost: "打车约" + parseInt(t.taxi_cost) + "元"
                });
            },
            fail: function(t) {}
        });
    },
    chooseCarid: function() {
        var t = this, e = t.data.array, a = [];
        for (var i in e) a.push(e[i].truck_licence);
        wx.showActionSheet({
            itemList: a,
            itemColor: "#535353",
            success: function(i) {
                var n = e[i.tapIndex].truck_id;
                t.getPosition(n), t.setData({
                    carid: a[i.tapIndex]
                });
            }
        });
    },
    getPosition: function(e) {
        var o = this, r = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, c = i.Encrypt(JSON.stringify(r)), s = {
            truck_id: e
        }, d = i.Encrypt(JSON.stringify(s));
        wx.request({
            url: a.getOnePosition,
            method: "POST",
            header: {
                minerva: c
            },
            data: {
                data: d
            },
            success: function(e) {
                var a, r = JSON.parse(i.Decrypt(e.data)), c = r.coordinate.location[0] + "," + r.coordinate.location[1], s = new Date(r.coordinate.time), d = n.formatTime(s), l = "车牌号：" + r.coordinate.truck_license + "\n设备号：" + r.coordinate.device_id + "\n地址：" + r.coordinate.address + "\n速度：" + r.coordinate.speed + "km/h\n时间：" + d;
                o.setData((a = {}, t(a, "markers[0].latitude", r.coordinate.location[1]), t(a, "markers[0].longitude", r.coordinate.location[0]), 
                t(a, "lat", r.coordinate.location[1]), t(a, "lon", r.coordinate.location[0]), t(a, "markers[0].callout.content", l), 
                a)), o.showMap(c);
            },
            fail: function(t) {}
        });
    }
});