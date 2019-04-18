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

    list: {},

    comments: 'laravel框架默认加载了很多的服务，一个服务就是一个类，比如Auth,Cache,Route等等。如果想自定义一个服务怎么办，很简单，自己创建一个类然后再绑定就行。服务容器和服务提供器是没有直接关系的，一般都是按照什么提供器就提供什么服务的规则来命名两者，但是你创建一个 火车serviceprovider， 然后再这个火车serviceprovider里绑定汽车类，那么火车serviceprovider提供的就是汽车对象，虽然用起来很尴尬，但你自己'
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

// 推荐列表页
  onLoad: function (options) {
    console.log(options)

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
        console.log(res.data);

        that.setData({
          'books': res.data.books
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

})