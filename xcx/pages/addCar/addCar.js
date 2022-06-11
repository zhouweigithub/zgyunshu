function a(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var e = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), t = getApp();

Page({
    data: {
        items: [ {
            name: "车牌号",
            focus: !1,
            index: 0,
            value: ""
        }, {
            name: "挂车号",
            focus: !1,
            index: 1,
            value: ""
        }, {
            name: "车架号",
            focus: !1,
            index: 2,
            value: ""
        } ],
        arrays: [ {
            name: "载重",
            array: [ 13, 18, 22, 25, 27, 28, 31, 34, 35, 36, 39, 40, 42, 43, 46, 49 ],
            focus: 0,
            indexs: 0
        }, {
            name: "单双桥",
            array: [ "单桥", "双桥" ],
            focus: 1,
            indexs: 0
        }, {
            name: "轴数",
            array: [ "二轴", "三轴", "四轴", "五轴", "六轴" ],
            focus: 2,
            indexs: 0
        }, {
            name: "箱体类型",
            array: [ "低栏", "高栏", "平板" ],
            focus: 3,
            indexs: 0
        }, {
            name: "车厢长度",
            array: [ 4.2, 5, 6.2, 6.6, 6.8, 7.2, 7.7, 7.8, 8.2, 8.6, 8.7, 9.6, 11, 11.6, 12, 12.5, 13 ],
            focus: 4,
            indexs: 0
        }, {
            name: "燃料",
            array: [ "燃油车", "加气车", "电瓶车" ],
            focus: 5,
            indexs: 0
        }, {
            name: "环保类型",
            array: [ "国II", "国III", "国IV", "国V", "国VI" ],
            focus: 6,
            indexs: 0
        }, {
            name: "颜色",
            array: [ "红色", "蓝色", "白色", "黄色", "其他" ],
            focus: 7,
            indexs: 0
        } ],
        focus: ""
    },
    toFocus: function(e) {
        var t = this, r = "items[" + e.currentTarget.dataset.index + "].focus", n = "items[" + t.data.focus + "].focus";
        t.setData(a({}, r, !0)), r != n && t.setData(a({}, n, !1));
    },
    onFocus: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        e.setData({
            focus: t
        });
    },
    inputValue: function(e) {
        var t = this, r = e.currentTarget.dataset.index, n = e.detail.value, s = "items[" + r + "].value";
        t.setData(a({}, s, n));
    },
    bindPickerChange: function(e) {
        var t = this, r = "arrays[" + e.currentTarget.dataset.index + "].indexs";
        t.setData(a({}, r, e.detail.value));
    },
    putInfo: function() {
        var a = this;
        a.data.items[0].value || wx.showToast({
            title: "车牌号不可为空",
            icon: none,
            duration: 2e3
        }), a.data.items[1].value || wx.showToast({
            title: "挂车号不可为空",
            icon: none,
            duration: 2e3
        }), a.data.items[2].value ? a.data.items[2].value.length < 17 && wx.showToast({
            title: "车驾号格式不正确",
            icon: none,
            duration: 2e3
        }) : wx.showToast({
            title: "车架号不可为空",
            icon: none,
            duration: 2e3
        });
        var r = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, n = t.Encrypt(JSON.stringify(r)), s = {
            truck_licence: a.data.items[0].value,
            truck_trailer: a.data.items[1].value,
            truck_vin: a.data.items[2].value,
            carrige_length: a.data.arrays[4].array[a.data.arrays[4].indexs],
            carry_capacity: a.data.arrays[0].array[a.data.arrays[0].indexs],
            truck_bridge: a.data.arrays[1].array[a.data.arrays[1].indexs],
            truck_axle: a.data.arrays[2].array[a.data.arrays[2].indexs],
            carrige_type: a.data.arrays[3].array[a.data.arrays[3].indexs],
            fuel: a.data.arrays[5].array[a.data.arrays[5].indexs],
            protection: a.data.arrays[6].array[a.data.arrays[6].indexs],
            color: a.data.arrays[7].array[a.data.arrays[7].indexs]
        }, i = t.Encrypt(JSON.stringify(s));
        wx.request({
            url: e.bindTrucks,
            header: {
                minerva: n
            },
            method: "POST",
            data: {
                data: i
            },
            success: function(a) {
                "1" === JSON.parse(t.Decrypt(a.data)).code ? wx.showToast({
                    title: "添加成功",
                    icon: "success",
                    duration: 2e3
                }) : wx.showToast({
                    title: "添加失败",
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function(a) {}
        });
    }
});