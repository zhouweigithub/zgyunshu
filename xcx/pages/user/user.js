var a = getApp();

Page({
    data: {
        header: "",
        username: "",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        isDriver: !1
    },
    getUserInfo: function() {
        var e = this;
        wx.getUserInfo({
            success: function(r) {
                a.globalData.userInfo = r.userInfo, e.setData({
                    userInfo: r.userInfo,
                    hasUserInfo: !0,
                    header: r.userInfo.avatarUrl,
                    username: r.userInfo.nickName
                });
            }
        });
    },
    onLoad: function() {
        var e = a.globalData.userInfo, r = wx.getStorageSync("isDriver");
        this.setData({
            header: e.avatarUrl,
            username: e.nickName,
            isDriver: r
        });
    },
    onShow: function() {
        var a = this, e = wx.getStorageSync("isDriver");
        a.setData({
            isDriver: e
        });
    },
    navToCar: function() {
        wx.navigateTo({
            url: "../carMsg/carMsg"
        });
    },
    navToDriver: function() {
        wx.navigateTo({
            url: "../driverMsg/driverMsg"
        });
    },
    navTolist: function() {
        wx.navigateTo({
            url: "../mainOrder/mainorder"
        });
    },
    navToNow: function() {
        wx.navigateTo({
            url: "../mainList/mainlist"
        });
    }
});