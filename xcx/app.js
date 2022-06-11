var e, n, t = require("/6E9813C54BA130CF08FE7BC2013B9087.js"), c = require("/A2F371B04BA130CFC49519B7177B9087.js"), o = require("/06EB37274BA130CF608D5F20C14B9087.js");

App({
    onLaunch: function(t) {
        var o = this;
        1069 == t.scene && wx.setStorageSync("id", t.query.device_id), o.checkLoginStatus(), 
        wx.cloud.init(), wx.cloud.database().collection("aes").where({
            info: {
                c: "check"
            }
        }).get({
            success: function(t) {
                e = c.enc.Utf8.parse(t.data[0].info.a), n = c.enc.Utf8.parse(t.data[0].info.b);
            }
        });
    },
    checkLoginStatus: function() {
        var e = this;
        wx.getStorageSync("loginFlag") ? wx.checkSession({
            success: function() {
                var n = wx.getStorageSync("loginFlag"), t = wx.getStorageSync("token");
                n && ("101" == n ? wx.reLaunch({
                    url: "../../pages/main/main",
                    success: function(e) {},
                    fail: function(e) {}
                }) : "102" == n ? wx.reLaunch({
                    url: "../../pages/driverPage/driverpage",
                    success: function(e) {},
                    fail: function(e) {}
                }) : "103" == n && wx.reLaunch({
                    url: "../../pages/QR/qr",
                    success: function(e) {},
                    fail: function(e) {}
                }), e.globalData.loginFlag = n, e.globalData.token = t);
            },
            fail: function() {
                e.doLogin();
            }
        }) : e.doLogin();
    },
    doLogin: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.relaunch, n = this;
        wx.login({
            success: function(c) {
                var o = n.Encrypt(c.code);
                c.code && wx.request({
                    url: t.loginUrl,
                    method: "POST",
                    data: {
                        code: o
                    },
                    success: function(t) {
                        var c = JSON.parse(n.Decrypt(t.data));
                        "1" == c.code && (wx.setStorageSync("loginFlag", c.status), wx.setStorageSync("token", t.header.token), 
                        wx.setStorageSync("isDriver", c.is_driver), e());
                    },
                    fail: function(e) {}
                });
            }
        });
    },
    relaunch: function() {
        var e = wx.getStorageSync("loginFlag");
        e && ("101" === e ? wx.reLaunch({
            url: "../../pages/main/main",
            success: function(e) {
                wx.closeSocket();
                var n = this, c = wx.getStorageSync("token"), o = t.sock + "?token=" + c;
                wx.connectSocket({
                    url: o,
                    protocols: [ "protocol1" ],
                    header: {
                        token: c
                    },
                    success: function(e) {},
                    fail: function(e) {}
                }), wx.onSocketClose(function(e) {}), wx.onSocketOpen(function(e) {}), wx.onSocketMessage(function(e) {
                    var t = JSON.parse(e.data);
                    if ("401" == t.code && n.doLogin(), "1000" == t.cmd && t.datas.length > 0) {
                        wx.vibrateLong();
                        var c = wx.getBackgroundAudioManager();
                        c.title = "此时此刻", c.epname = "此时此刻", c.singer = "抢单", c.coverImgUrl = "http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000", 
                        c.src = "http://39.105.44.249:3100/remind.mp3";
                    }
                });
            },
            fail: function(e) {}
        }) : "102" === e ? wx.reLaunch({
            url: "../../pages/driverPage/driverpage",
            success: function(e) {},
            fail: function(e) {}
        }) : "103" === e && wx.reLaunch({
            url: "../../pages/QR/qr",
            success: function(e) {},
            fail: function(e) {}
        }));
    },
    checkUserInfoPermission: function() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] || wx.openSetting({
                    success: function(e) {},
                    fail: function(e) {}
                });
            },
            fail: function(e) {}
        });
    },
    globalData: {
        userInfo: null
    },
    upInfo: function(e, n) {
        wx.request({
            url: e,
            data: n,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {},
            fail: function(e) {}
        });
    },
    showInfo: function(e) {
        wx.showToast({
            title: e,
            duration: 2e3
        });
    },
    Decrypt: function(t) {
        var o = c.enc.Hex.parse(t), i = c.enc.Base64.stringify(o);
        return c.AES.decrypt(i, e, {
            iv: n,
            mode: c.mode.CBC,
            padding: c.pad.Pkcs7
        }).toString(c.enc.Utf8).toString();
    },
    Encrypt: function(t) {
        var o = c.enc.Utf8.parse(t);
        return c.AES.encrypt(o, e, {
            iv: n,
            mode: c.mode.CBC,
            padding: c.pad.Pkcs7
        }).ciphertext.toString().toUpperCase();
    },
    uploadimg: function(e, n) {
        var t = this, c = e.i ? e.i : 0, o = e.success ? e.success : 0, i = e.fail ? e.fail : 0, a = {
            data: e.data
        }, s = e.i === e.files.length - 1 ? a : null, r = {
            token: wx.getStorageSync("token")
        }, u = t.Encrypt(JSON.stringify(r)), f = e.code ? e.code : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.files[c],
            name: e.name[c],
            formData: s,
            header: {
                minerva: u
            },
            success: function(i) {
                "401" == i.statusCode && (console.log(), t.doLogin());
                var a = JSON.parse(t.Decrypt(i.data));
                o++, 200 === i.statusCode && (f++, c++, e.code = f), c === e.files.length - 1 && (s = e.infos), 
                e.i = c, e.success = o;
                var r = a.code;
                1 == r & f < e.files.length ? t.uploadimg(e, n) : 0 == r && "function" == typeof n && n(a.message), 
                o === e.files.length && f === e.files.length && (wx.setStorageSync("loginFlag", a.type), 
                "function" == typeof n && n(wx.getStorageSync("loginFlag")));
            },
            fail: function(e) {
                i++;
            },
            complete: function() {}
        });
    },
    getDistance: function(e, n) {
        new o.AMapWX({
            key: "e0cd5c699defc1d03995ab07324b9eee"
        }).getDrivingRoute({
            origin: "111.1720300000,37.3662100000",
            destination: e,
            success: function(e) {
                if (e.paths[0] && e.paths[0].distance) {
                    var t = e.paths[0].distance;
                    "function" == typeof n && n(t);
                }
            },
            fail: function(e) {}
        });
    }
});