var t = require("../../5D80C6344BA130CF3BE6AE33378B9087.js");

Page({
    data: {
        logs: []
    },
    onLoad: function() {
        this.setData({
            logs: (wx.getStorageSync("logs") || []).map(function(a) {
                return t.formatTime(new Date(a));
            })
        });
    }
});