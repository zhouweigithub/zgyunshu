require("../../6E9813C54BA130CF08FE7BC2013B9087.js");

Page({
    data: {
        username: "",
        header: ""
    },
    onLoad: function() {
        var e = this, a = wx.getStorageSync("userInfo");
        wx.getStorageSync("token");
        e.setData({
            username: a.nickName,
            header: a.avatarUrl
        });
    },
    navToCont: function() {
        wx.navigateTo({
            url: "../listCxt/listcxt"
        });
    },
    navToMsg: function() {
        wx.navigateTo({
            url: "../driverGetMsg/drivermsg"
        });
    }
});