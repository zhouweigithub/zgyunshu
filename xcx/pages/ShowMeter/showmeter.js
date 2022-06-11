require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), getApp();

Page({
    data: {
        array: "",
        userInfo: "",
        access_token: "",
        id: "",
        have: !0,
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
    onLoad: function(e) {
        var a = this, r = JSON.parse(e.date);
        a.setData({
            arrays: r
        });
    }
});