var e = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), t = getApp();

Page({
    data: {
        list: "",
        arr: ""
    },
    toCont: function(e) {
        var a = this, r = e.currentTarget.dataset.id, n = JSON.stringify(a.data.arr[r]), i = t.Encrypt(n);
        wx.navigateTo({
            url: "../boardCont/boardcont?arr=" + i
        });
    },
    onShow: function() {
        var a = this, r = {
            token: wx.getStorageSync("token"),
            device_id: wx.getStorageSync("id"),
            time: new Date()
        }, n = t.Encrypt(JSON.stringify(r));
        wx.request({
            url: e.getRelease,
            header: {
                minerva: n
            },
            success: function(e) {
                var r = JSON.parse(t.Decrypt(e.data)), n = new RegExp("<.+?>", "g"), i = new RegExp("&nbsp;", "g"), c = new RegExp(" ", "g"), o = new RegExp("↵", "g"), g = new RegExp("{.+?}", "g"), s = r.data, p = [];
                s.forEach(function(e, t) {
                    var a = {};
                    a.tit = e.title, e.content && (a.cont = e.content.replace(n, "").replace(i, "").replace(c, "").replace(o, "").replace(g, "")), 
                    a.time = e.time.split(" ")[0], p.push(a);
                }), a.setData({
                    list: p,
                    arr: s
                });
            },
            fail: function(e) {}
        });
    }
});