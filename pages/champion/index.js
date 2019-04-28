Page({
  data: {
    images: [
      'https://reading-api.oss-cn-beijing.aliyuncs.com/images/banner1%402x.png',
      'https://reading-api.oss-cn-beijing.aliyuncs.com/images/banner2%402x.png'
    ],
    userInfo: {},
    posts:[]
  },

  onLoad:function() {
    var that = this;

    this.setData({
      loadModal: true
    })

    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: res.data
        })
      }
    });

    wx.request({
      url: 'https://reading-api.oeaudio.com/api/posts',
      success: function (res) {

        console.log(res.data.data)
        that.setData({
          'posts': res.data.data,
          'loadModal': false
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })

    // 分享群的时候才需要
    // wx.showShareMenu({
    //   // 要求小程序返回分享目标信息
    //   withShareTicket: true
    // });
  },

  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '佳禾读书争霸赛，邀你一起来读书',
      path: '/page/index',
      imageUrl: 'https://reading-api.oss-cn-beijing.aliyuncs.com/images/share.png',
    }
  }
})
