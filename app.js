//app.js
var _js = require("./utils/util.js");
App({
  globalData: {
    userInfo: null,
    qrcode: '',
    token: '',
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;

    // 查看 session_key 是否过期
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        wx.getStorage({
          key: 'token',
          success: function(res) { // 如果本地有 token, 说明是登录过的用户
            console.log('第一次从本地获取 token: ' +  res)

            // 如果本地没有 token, 需要重新走登录流程, 目前就是获取到永不过期的 token, 并存在本地
            if (!res.data) {
              console.log('!!!!!')

              _js.login()
            } else {
              that.globalData.token = res.data // 取出 token, 赋给全局变量
              console.log('微信和第三方 session 都有, 获取到第三方 token:' + res.data)
            }
          },
          fail: function(res) {
            console.log('fail')
          }
        })
      },
      fail() {

        console.log('微信 session 失效')
        // session_key 已经失效，需要重新执行登录流程, 目前就是获取到永不过期的 token, 并存在本地
        _js.login()
      }
    })

  },
})
