var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    content: ''
  },

  // 樊灯图书详情页
 onLoad: function(options) {
    console.log(options)

    var that = this;
    wx.request({
      url: "https://api-miniapp.dushu.io/books/info",
      data: {
        "bookId": options.id,
        "token": "QR1Nqr9n2D7lsmSMsEl"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log(res.data);

        that.setData({
          'content': res.data.content
        });

        var article = that.data.content;
        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */
      
        WxParse.wxParse('article', 'html', article, that, 5);
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }, 
})