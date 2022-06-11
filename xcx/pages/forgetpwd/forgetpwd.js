Page({
    data: {
        time: 60,
        disabled: !1,
        loading: !1,
        updisab: !1
    },
    gettime: function() {
        var t = this, e = t.data.time;
        e > 0 ? setTimeout(function() {
            e -= 1, t.setData({
                time: e
            }), t.gettime();
        }, 1e3) : t.setData({
            disabled: !1,
            time: 60
        });
    },
    getCode: function() {
        var t = this;
        t.setData({
            disabled: !0
        }), t.gettime();
    },
    checkinfo: function() {
        this.setData({
            loading: !0,
            updisab: !0
        }), wx.navigateTo({
            url: "../newPwd/newPwd"
        });
    }
});