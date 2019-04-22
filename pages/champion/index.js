Page({
  data: {
    images: [
      '../resources/good1.jpg',
      '../resources/good2.jpg'
    ], 
    userInfo: {},
    users:[]
  },

  onLoad:function() {
    var that = this;

    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: res.data
        })
      }
    })

    wx.request({
      url: 'http://127.0.0.1:8000/api/users',
      success: function (res) {
        that.setData({
          'users': res.data.data
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
      title: '佳禾读书会',
      path: '/page/index',
      imageUrl: '',
    }
  }
})