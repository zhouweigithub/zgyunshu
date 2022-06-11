var t = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), r = getApp();

Page({
    data: {
        array: {
            "车牌号": "truck_licence",
            "挂车号": "truck_trailer",
            "车架号": "truck_vin",
            "载重": "carry_capacity",
            "单双桥": "truck_bridge",
            "轴数": "truck_axle",
            "箱体类型": "carrige_type",
            "车箱长度": "carrige_length",
            "燃料": "fuel",
            "环保类型": "protection"
        },
        cont: ""
    },
    onLoad: function(t) {
        var r = this, e = t.id;
        r.carInfo(e);
    },
    carInfo: function(e) {
        var a = this, c = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, i = r.Encrypt(JSON.stringify(c)), n = {
            truck_id: e
        }, o = r.Encrypt(JSON.stringify(n));
        wx.request({
            url: t.getTruckInfo,
            method: "POST",
            data: {
                data: o
            },
            header: {
                minerva: i
            },
            success: function(t) {
                var e = JSON.parse(r.Decrypt(t.data));
                1 == e.code && a.setData({
                    cont: e.datas
                });
            },
            fail: function(t) {}
        });
    }
});