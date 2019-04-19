//index.js
//获取应用实例
const app = getApp()

var _js = require("../../utils/util.js");

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    token: '',
    posts: [],
    age: '0 天',
    posts_count: 0,
    indicatorDots: false,
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 页面加载时触发 
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var that = this;

    // 请求书评列表
    wx.request({
      url: "http://127.0.0.1:8001/api/posts",
      
      success: function (res) {
        that.setData({
          'posts': res.data.data
        });
        app.globalData.posts = res.data.data
      },
      fail: function (err) {
        console.log(err)
      }
    })

    // 从缓存中取出 token
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          'token': res.data
        })

        console.log(that.data.token)
        console.log(res.data)

        // 请求用户表
        wx.request({
          url: "http://127.0.0.1:8001/api/user",

          data: {
            'token': that.data.token
          },
          success: function (res) {
            if (res.data.code == 202) {
              console.log('here it is')
              _js.login();
            } else {
              console.log(res.data.data.age)
              that.setData({
                'posts_count': res.data.data.posts_count,
                'age': res.data.data.age
              })
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
      },
    })
  },

  // login: function() {
  //   wx.login({
  //     success: res => {
  //       // console.log(res)
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       wx.request({
  //         url: 'http://127.0.0.1:8001/api/user-info', //接口地址
  //         data: { code: res.code },
  //         header: {
  //           'content-type': 'application/json' //默认值
  //         },
  //         success: function (res) {
  //           // console.log(res.data)

  //           // 请求成功后, 把后台返回的 token 缓存起来
  //           wx.setStorage({
  //             key: 'token',
  //             data: res.data,
  //           })

  //           that.globalData.token = res.data
  //         },
  //       })
  //     }
  //   })
  // }
})
