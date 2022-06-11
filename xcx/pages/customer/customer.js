require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), getApp();

Page({
    data: {
        pointmsg: "身份提交审核页面，提交不可修改",
        src: "../../images/idcart1.png",
        src1: "../../images/idcart2.png",
        focus: !0,
        focusd: !1
    },
    signBtn: function() {
        this.setData({
            focus: !0,
            focusd: !1
        });
    },
    loginBtn: function() {
        this.setData({
            focusd: !0,
            focus: !1
        });
    },
    getPhoneNumber: function(t) {
        t.detail.encryptedDate;
        "getPhoneNumber:fail user deny" == t.detail.errMsg ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "未授权",
            success: function(t) {}
        }) : wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "同意授权",
            success: function(t) {}
        });
    },
    forgePwd: function() {
        wx.navigateTo({
            url: "../forgetpwd/forgetpwd"
        });
    }
});