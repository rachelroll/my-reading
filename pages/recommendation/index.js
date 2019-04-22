//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    images:[
      '../resources/good1.jpg' ,
      '../resources/good2.jpg' ,
    ], 

    books: [],

    posts: [],
  },

  cutComments() {
    this.setData({
      comments: comments.substring(0, 50)
    })
  },

  // 樊灯图书列表
  bookList(event){
    console.log(event)

    var that = this;
    wx.request({
      url: "https://api-miniapp.dushu.io/books/books",
      data: {
        "categoryid": event.currentTarget.dataset.variable,
        "order": 2,
        "page": 1,
        "pageSize": 10,
        "token": "QR1Nqr9n2D7lsmSMsEl"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        that.setData({
          'books': res.data.books
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

// 樊登推荐列表页
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://api-miniapp.dushu.io/books/books",
      data: {
        "categoryid": 5,
        "order": 2,
        "page": 1,
        "pageSize": 10,
        "token": "QR1Nqr9n2D7lsmSMsEl"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // console.log(res.data);

        that.setData({
          'books': res.data.books
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })

    // 书评列表
    wx.getStorage({
      key: 'posts',
      success: function(res) {
        console.log(res.data)

        that.setData({
          posts: res.data
        })
      },
    })
  },

  // 点赞
  like: function (event) {
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
          url: "http://127.0.0.1:8000/api/post/like",

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