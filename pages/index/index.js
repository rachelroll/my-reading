//index.js
//获取应用实例
const app = getApp();

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
      console.log('这是首页:' + app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      console.log('这是首页赋值之后: ' + this.data.userInfo.nickName)
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
      url: "https://reading-api.oeaudio.com/api/posts",

      success: function (res) {
        // console.log(res.data.data[0].cover)
        that.setData({
          'posts': res.data.data
        });
        app.globalData.posts = res.data.data

        wx.setStorage({
          key: 'posts',
          data: res.data.data,
        })
      },
      fail: function (err) {
        console.log(err)
      }
    });

    // 从缓存中取出 token, 请求用户表的详细信息
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          'token': res.data
        })

        console.log(that.data.token);

        // 请求用户表
        wx.request({
          url: "https://reading-api.oeaudio.com/api/user",

          data: {
            'token': that.data.token
          },
          success: function (res) {
              console.log(res)
            if (res.data.code == 202) {
              console.log('here it is')
              _js.login();
            } else {
              console.log(res.data.data.age)
              that.setData({
                'posts_count': res.data.data.posts_count,
                'age': res.data.data.age
              });

              wx.setStorage({
                key: 'age',
                data: res.data.data.age,
              });

              wx.setStorage({
                key: 'posts_count',
                data: res.data.data.posts_count,
              })
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })

        // 从缓存中取出用的基本信息
        wx.getStorage({
          key: 'userInfo',
          success: function(res) {
            that.setData({
              'userInfo': res.data
            })
          },
        })
      },
    })
  },
});
