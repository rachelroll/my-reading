const app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    var that = this;

    // 在应用生命周期中, 无论如何获取到 token 了, 也就是拿到了用户的 openid, 已实现用户登录
    // 之后在 login 页面查询一下用户是否授权了 "scope.userInfo" 这个 scope, 如果已授权, 就直接拿到用户信息, 并存储在本地缓存, 然后跳转到 index 页面
    wx.getSetting({
      success(res) {
        console.log('get setting:')
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success(res) {
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo,
              })

              app.globalData.userInfo = res.userInfo;

              console.log(app.globalData.userInfo)

              //用户已经授权过
              wx.redirectTo({
                url: "../index/index"
              })

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
  },

  // 如果页面加载时, 用户没有授权过, 程序就会走到这里, 显示让用户授权的 button
  bindGetUserInfo: function (e) {
    //用户按了允许授权按钮, 就拿到用户的信息了
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: 'https://reading-api.oeaudio.com/api/user-store', //接口地址
        data: {
          nickname: e.detail.userInfo.nickName,
          avatar: e.detail.userInfo.avatarUrl,
          token: app.globalData.token,
        },
        header: {
          'content-type': 'application/json' //默认值
        },
        method: 'POST',
        success: function (res) {
          console.log('保存用户信息' + res.data.msg)
          wx.setStorage({
            key: 'userInfo',
            data: e.detail.userInfo,
          })

          // 同时把用户信息给全局变量, 方便后面用
          app.globalData.userInfo = e.detail.userInfo
        }
      })

      //授权成功，保存数据之后, 就会跳转进入小程序首页 index 页面, 此时, 缓存中已经有了用户的微信相关的信息
      wx.redirectTo({
        url: "../index/index"
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

})
