var e = getApp();

Page({
    data: {
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        src1: "../../images/gage.png",
        src4: "../../images/carmain.png",
        src2: "../../images/customer.png",
        src3: "../../images/driver.png"
    },
    getUserInfo: function(n) {
        e.globalData.userInfo = n.detail.userInfo, this.setData({
            userInfo: n.detail.userInfo,
            hasUserInfo: !0
        });
    },
    navToOwner: function(e) {
        wx.navigateTo({
            url: "../owner/owner"
        });
    },
    navToDriver: function(e) {
        wx.navigateTo({
            url: "../driver/driver"
        });
    },
    navToCust: function(e) {
        wx.navigateTo({
            url: "../customer/customer"
        });
    },
    navToGate: function() {
        wx.navigateTo({
            url: "../gate/gate"
        });
    }
});