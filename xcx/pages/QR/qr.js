Page({
    data: {
        name: "刘力瑄"
    },
    qr: function() {
        wx.scanCode({
            onlyFromCamera: !0,
            success: function(a) {}
        });
    }
});