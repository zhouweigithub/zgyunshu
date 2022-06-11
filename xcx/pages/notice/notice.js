var e = require("../../6E9813C54BA130CF08FE7BC2013B9087.js");

Page({
    data: {
        arrays: [ {
            world: "中共中央政治局常委、国务院总理李克强，中共中央政治局常委、中央书记处书记王沪宁，中共中央政治局常委、国务院副总理韩正出席会议。",
            image: "../../images/camer.ong",
            time: "2018-10-12 12:23:45"
        } ]
    },
    onLoad: function() {
        var a = wx.getStorageSync("token");
        wx.request({
            url: e.getNotice,
            header: {
                token: a
            },
            success: function(e) {}
        });
    }
});