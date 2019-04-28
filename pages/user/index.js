//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    age: '0 天',
    posts_count: 0,
    likes_count: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data
        })
      },
    })

    wx.getStorage({
      key: 'age',
      success: function(res) {
        that.setData({
          age: res.data
        })
      },
    });

    wx.getStorage({
      key: 'comments_count',
      success: function (res) {
        that.setData({
          comments_count: res.data
        })
      },
    });

    wx.getStorage({
      key: 'posts_count',
      success: function(res) {
        that.setData({
          posts_count: res.data
        })
      },
    })

    wx.getStorage({
      key: 'token',
      success: function(res) {
        wx.request({
          url: "https://reading-api.oeaudio.com/api/posts/total-likes",
          data: {
            token: res.data
          },
          success: function (res) {
            that.setData({
              likes_count: res.data
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
      },
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})