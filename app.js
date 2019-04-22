//app.js

App({
  globalData: {
    userInfo: null,
    token: null,
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this

    // 查看 session_key 是否过期
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
      
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: res => {
            console.log(res)
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: 'http://127.0.0.1:8000/api/user-info', //接口地址
              data: { code: res.code },
              header: {
                'content-type': 'application/json' //默认值
              },
              success: function (res) {
                console.log(res.data)

                // 请求成功后, 把后台返回的 token 缓存起来
                wx.setStorage({
                  key: 'token',
                  data: res.data,
                })

                that.globalData.token = res.data
              }
            })
          }
        })
      }
    })

    // 获取用户信息, 头像, 昵称
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.globalData.userInfo = res.userInfo
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo,
              })
              console.log(res.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } 
      },
    })

    // 查看缓存中是否有获取用户信息的记录
    wx.getStorage({
      key: 'user',
      success: res => {
        if(!res) {
          // 可以将 res 发送给后台解码出 unionId
          wx.request({
            url: 'http://127.0.0.1:8000/api/user-store', //接口地址
            data: {
              nickname: that.globalData.nickName,
              avatar: that.globalData.avatarUrl,
              token: that.globalData.token,
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res.data)
            }
          })
          
          wx.setStorage({
            key: 'user',
            data: '1',
          })
        }
      },
    })
  },
})