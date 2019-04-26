//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    images: [
      '../resources/good1.jpg',
      '../resources/good2.jpg',
    ],

    posts: [],
  },

  cutComments() {
    this.setData({
      comments: comments.substring(0, 50)
    })
  },

  onLoad: function (options) {
    var that = this;

    // 书评列表
    wx.getStorage({
      key: 'posts',
      success: function (res) {
        console.log(res.data)

        that.setData({
          posts: res.data
        })
      },
    })
  },

  // 点赞
  like: function(event) {
    var that = this;
    console.log(event.target.dataset.id)

    // 从缓存中取出 token
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          'token': res.data
        })

        // 点赞
        wx.request({
          url: "https://reading-api.oeaudio.com/api/post/like",

          data: {
            'id': event.target.dataset.id,
            'token': that.data.token
          },
          method: 'POST',
          success: function (res) {
            if (res.data.code == 202) {
              console.log('here it is')
              _js.login();
            } else {
              console.log(res)
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
      },
    })
  },


  // 转发
  onShareAppMessage: function (res) {
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
