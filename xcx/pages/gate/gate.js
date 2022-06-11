var a = require("../../6E9813C54BA130CF08FE7BC2013B9087.js"), e = getApp();

Page({
    data: {
        pointmsg: "身份提交审核页面，提交不可修改",
        src: "../../images/idcart1.png",
        src1: "../../images/idcart2.png"
    },
    chooseImg: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var c = e.tempFilePaths;
                a.setData({
                    src1: c[0]
                });
            }
        });
    },
    chooseFaceImg: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var c = e.tempFilePaths;
                a.setData({
                    src: c[0]
                });
            }
        });
    },
    upInfo: function() {
        var c = this, s = [];
        s[0] = c.data.src, s[1] = c.data.src1;
        var i = [];
        i[0] = "idcard1", i[1] = "idcard2";
        var r = {
            idcart1: "idcard1",
            idcart2: "idcard2",
            type: "103"
        };
        e.uploadimg({
            url: a.gateSign,
            files: s,
            name: i,
            infos: r
        }, function(a) {
            c.setData({
                loading: !1
            }), "103" === a && wx.navigateTo({
                url: "../QR/qr"
            });
        });
    }
});