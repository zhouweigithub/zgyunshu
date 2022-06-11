require("../../6E9813C54BA130CF08FE7BC2013B9087.js");

var r = getApp(), a = require("../../wxParse/wxParse.js");

Page({
    data: {
        arr: ""
    },
    onLoad: function(e) {
        var t = this, s = JSON.parse(r.Decrypt(e.arr)), i = s.content;
        t.setData({
            arr: s
        }), a.wxParse("article", "html", i, t, 20);
    }
});