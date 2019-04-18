//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],//临时图片地址
    userInfo: {},
  },

  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        })
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },

  formSubmit: function (e) {
    // console.log(e);
    // console.log(app.globalData.userInfo)
    
    this.data.userInfo = app.globalData.userInfo,


    console.log(this.data.userInfo);

    if (e.detail.value.book_name.length == 0 || e.detail.value.post_content.length == 0) {
      wx.showToast({
        title: '书名和书评不得为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: 'http://127.0.0.1:8001/api/post',
        data: { 
          book_name: e.detail.value.book_name, 
          post_content: e.detail.value.post_content, 
          description: e.detail.value.description,
          user_nickname: this.data.userInfo.nickName,
          openid: app.globalData.openid
          },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function (res) {
          console.log(res);
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          // success
        },
        fail: function (res) {
          console.log(res);
          // fail
        }
      })
    }
  },

  formReset() {
    console.log('form发生了reset事件')
  },


})

