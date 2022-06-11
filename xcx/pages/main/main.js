var n = getApp();

require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), require("../../0F73C9C04BA130CF6915A1C7D96B9087.js");

Page({
    data: {
        imgUrls: "",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    getUserInfo: function() {
        var o = this;
        wx.getUserInfo({
            success: function(e) {
                n.globalData.userInfo = e.userInfo, o.setData({
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                });
            }
        });
    },
    toMap: function() {
        wx.navigateTo({
            url: "../map/map"
        });
    },
    toDrivers: function() {
        wx.navigateTo({
            url: "../driverMsg/driverMsg"
        });
    },
    toCars: function() {
        wx.navigateTo({
            url: "../carMsg/carMsg"
        });
    },
    toAddInfo: function() {
        wx.navigateTo({
            url: "../addInfo/addinfo"
        });
    },
    toSentry: function() {
        wx.navigateTo({
            url: "../sentry/sentry"
        });
    },
    toBroad: function() {
        wx.navigateTo({
            url: "../broad/broad"
        });
    }
});