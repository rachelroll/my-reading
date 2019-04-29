//index.js
//获取应用实例

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],//临时图片地址
    userInfo: {},
    token: '',
    textareaBValue: ''
  },

  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
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

  // ChooseImage() {
  //   wx.chooseImage({
  //     count: 4, //默认9
  //     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album'], //从相册选择
  //     success: (res) => {
  //       if (this.data.imgList.length != 0) {
  //         this.setData({
  //           imgList: this.data.imgList.concat(res.tempFilePaths)
  //         })
  //       } else {
  //         this.setData({
  //           imgList: res.tempFilePaths
  //         })
  //       }
  //     }
  //   });
  // },
  // ViewImage(e) {
  //   wx.previewImage({
  //     urls: this.data.imgList,
  //     current: e.currentTarget.dataset.url
  //   });
  // },

  formSubmit: function (e) {
    var that = this;

    if (e.detail.value.book_name.length == 0) {
      wx.showToast({
        title: '请填写书名!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.post_content.length == 0) {
      wx.showToast({
        title: '请填写书评!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (that.data.images[0] === undefined) {
      wx.showToast({
        title: '请上传图书封面!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      console.log(that.data.images[0]);
      console.log(app.globalData.userInfo)
console.log('rosssss')
      // 提交表单
      wx.getStorage({
        key: 'token',
        success: function(res) {
          console.log(2793)
          // 表单提交的数据
          var data = {
            book_name: e.detail.value.book_name,
            post_content: e.detail.value.post_content,
            description: e.detail.value.description,
            cover: that.data.images[0],
            user_nickname: app.globalData.userInfo.nickname,
            token: res.data
          };

          app.globalData.book_name = e.detail.value.book_name;
          app.globalData.content = e.detail.value.post_content;

          // 上传图片及表单内容
          wx.uploadFile({
            url: 'https://reading-api.oeaudio.com/api/post',
            filePath: that.data.images[0],
            name: 'image',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: data,    //请求额外的form data
            success: function (res) {
              console.log(2424242342);
              // 如果 token 过期, 重新登录
              if (res.data.code == 202) {
                console.log('here it is');
                _js.login();
              } else {

                wx.request({
                  url: "https://reading-api.oeaudio.com/api/qrcode",
                  data: {
                    page: "pages/index",
                    scene: "1234&123",
                    width: 300
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  dataType: 'json',
                  success: function (res) {
                    console.log('表单提交成功')
                    app.globalData.qrcode = res.data;
                    console.log(app.globalData.qrcode)
                    // 关闭当前页面，跳转到生成读书卡页面
                    wx.navigateTo({
                      url: '../card/index?book='+ e.detail.value.book_name +'&' + 'content=' + e.detail.value.post_content
                    })
                  },
                  fail: function () {
                    console.log('qrcode gain fails')
                  },
                });
              }
            },
            fail: function (res) {
              console.log('or here?');
              console.log(res);
              typeof fail == "function" && fail(res.data);
            }
          })
        },
        fail: function(res) {
          console.log('获取缓存 token 失败')
        }
      })
    }
  },

  onPosterSuccess(e) {
    console.log(77)
    this.getQrcode();
    const { detail } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    })
  },
  onPosterFail(err) {
    console.log('really?');
    console.error(err);
  },

  // 获取小程序码
  getQrcode() {
    var that = this;
    wx.request({
      url: "https://reading-api.oeaudio.com/api/qrcode",
      data: {
        page: "pages/index",
        scene: "1234&123",
        width: 300
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },

      dataType: 'json',
      success: function (res) {
        console.log(12)
        console.log(res)
        let qrcodeUrl = res.data; //服务器小程序码地址
        console.log(qrcodeUrl)
        that.setData({
          qrcode: qrcodeUrl
        })

        this.setData({ posterConfig: {  } }, () => {
          Poster.create(true);
        });

        console.log(that.data.qrcode)
      },
      fail: function () {
        console.log(999)
       },
    })
  },

  formReset() {
    console.log('form发生了reset事件')
  },
})
