var e = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), t = getApp();

require("../../5D80C6344BA130CF3BE6AE33378B9087.js");

Page({
    data: {
        items: "",
        src: !1,
        hideHeader: !0,
        scrolltop: 50
    },
    onShow: function() {
        wx.showNavigationBarLoading();
        var e = this, t = wx.getStorageSync("loginFlag");
        t && "100" != t || wx.navigateTo({
            url: "../owner/owner"
        }), e.getData();
    },
    getData: function() {
        var a = this, i = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, r = t.Encrypt(JSON.stringify(i));
        wx.request({
            url: e.OrderList,
            header: {
                minerva: r
            },
            success: function(e) {
                if (401 == e.statusCode) {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                    var i = getCurrentPages();
                    console.log(i), t.doLogin();
                }
                var r = JSON.parse(t.Decrypt(e.data)).datas;
                r.length > 0 ? a.setData({
                    items: r.reverse(),
                    src: !0,
                    scrolltop: 100
                }) : a.setData({
                    src: !1,
                    items: []
                }), a.setData({
                    hideHeader: !0
                }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    listCont: function(e) {
        var a = this, i = e.currentTarget.dataset.index, r = "../listCont/lico?array=" + t.Encrypt(JSON.stringify(a.data.items[i]));
        wx.navigateTo({
            url: r
        });
    },
    refresh: function(e) {
        wx.showNavigationBarLoading();
        var t = this;
        setTimeout(function() {
            new Date();
            t.setData({
                hideHeader: !1
            }), t.getData();
        }, 300);
    },
    onPullDownRefresh: function(e) {
        this.refresh();
    }
});