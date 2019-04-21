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
    console.log(app.globalData.posts)
    this.setData({
      posts: app.globalData.posts
    })

    console.log(this.data.posts)
  },

})