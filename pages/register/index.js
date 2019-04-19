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
    token: ''
  },

  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
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

    var that = this;
    
    that.data.userInfo = app.globalData.userInfo;

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
      console.log(that.data.images[0])

      wx.getStorage({
        key: 'token',
        success: function(res) {
          var data = {
            book_name: e.detail.value.book_name,
            post_content: e.detail.value.post_content,
            description: e.detail.value.description,
            cover: that.data.images[0],
            user_nickname: that.data.userInfo.nickName,
            token: res.data
          }

          // 上传图片
          wx.uploadFile({
            url: 'http://127.0.0.1:8001/api/post',
            filePath: that.data.images[0],
            name: 'image',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: data,    //请求额外的form data
            success: function (res) {
              console.log(res.data);

              // 如果 token 过期, 重新登录
              if (res.data.code == 202) {
                console.log('here it is')
                _js.login();
              }

              if (res.statusCode == 200) {
                typeof success == "function" && success(res.data);
              } else {
                typeof fail == "function" && fail(res.data);
              }
            },
            fail: function (res) {
              console.log('or here?')
              console.log(res);
              typeof fail == "function" && fail(res.data);
            }
          })


        },
      })
    }
  },

  formReset() {
    console.log('form发生了reset事件')
  },


})

