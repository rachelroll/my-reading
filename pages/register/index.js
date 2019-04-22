//index.js
import Poster from '../../wxa-plugin-canvas/poster/poster';

const posterConfig = {
  jdConfig: {
    width: 750,
    height: 1334,
    backgroundColor: '#fff',
    debug: false,
    blocks: [
      {
        width: 690,
        height: 808,
        x: 30,
        y: 183,
        borderWidth: 2,
        borderColor: '#f0c2a0',
        borderRadius: 20,
      },
      {
        width: 634,
        height: 74,
        x: 59,
        y: 770,
        backgroundColor: '#fff',
        opacity: 0.5,
        zIndex: 100,
      },
    ],
    texts: [
      {
        x: 113,
        y: 61,
        baseLine: 'middle',
        text: '伟仔',
        fontSize: 32,
        color: '#8d8d8d',
      },
      {
        x: 120,
        y: 113,
        baseLine: 'top',
        text: '佳禾读书会',
        fontSize: 38,
        color: '#080808',
      },
      {
        x: 50,
        y: 160,
        baseLine: 'top',
        text: '随你行万里路, 伴你读万卷书',
        fontSize: 38,
        color: '#080808',
      },
      {
        x: 92,
        y: 810,
        fontSize: 38,
        baseLine: 'middle',
        text: '书名:',
        width: 570,
        lineNum: 1,
        color: '#8d8d8d',
        zIndex: 200,
      },
      {
        x: 59,
        y: 895,
        baseLine: 'middle',
        text: [
          {
            text: '2人拼',
            fontSize: 28,
            color: '#ec1731',
          },
          {
            text: '¥99',
            fontSize: 36,
            color: '#ec1731',
            marginLeft: 30,
          }
        ]
      },
      {
        x: 522,
        y: 895,
        baseLine: 'middle',
        text: '已拼2件',
        fontSize: 28,
        color: '#929292',
      },
      {
        x: 59,
        y: 945,
        baseLine: 'middle',
        text: [
          {
            text: '商家发货&售后',
            fontSize: 28,
            color: '#929292',
          },
          {
            text: '七天退货',
            fontSize: 28,
            color: '#929292',
            marginLeft: 50,
          },
          {
            text: '运费险',
            fontSize: 28,
            color: '#929292',
            marginLeft: 50,
          },
        ]
      },
      {
        x: 360,
        y: 1065,
        baseLine: 'top',
        text: '赶紧扫码参与佳禾读书会',
        fontSize: 30,
        color: '#080808',
      },
      {
        x: 360,
        y: 1123,
        baseLine: 'top',
        text: '帮我点赞',
        fontSize: 28,
        color: '#929292',
      },
      {
        x: 360,
        y: 1170,
        baseLine: 'top',
        text: '和我一起畅游知识的海洋',
        fontSize: 28,
        color: '#929292',
      },
    ],
    images: [
      {
        width: 62,
        height: 62,
        x: 30,
        y: 30,
        borderRadius: 62,
        url: 'https://lc-I0j7ktVK.cn-n1.lcfile.com/02bb99132352b5b5dcea.jpg',
      },
      {
        width: 634,
        height: 634,
        x: 59,
        y: 210,
        url: 'https://lc-I0j7ktVK.cn-n1.lcfile.com/193256f45999757701f2.jpeg',
      },
      {
        width: 220,
        height: 220,
        x: 92,
        y: 1020,
        url: 'this.data.qrcode',
      },
      // {
      //   width: 750,
      //   height: 90,
      //   x: 0,
      //   y: 1244,
      //   url: 'https://lc-I0j7ktVK.cn-n1.lcfile.com/67b0a8ad316b44841c69.png',
      // }
    ]

  }
}

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],//临时图片地址
    userInfo: {},
    token: '',
    posterConfig: posterConfig.jdConfig,
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
      console.log(that.data.images[0])

      // 提交表单
      wx.getStorage({
        key: 'token',
        success: function(res) {
          // 表单提交的数据
          var data = {
            book_name: e.detail.value.book_name,
            post_content: e.detail.value.post_content,
            description: e.detail.value.description,
            cover: that.data.images[0],
            user_nickname: that.data.userInfo.nickName,
            token: res.data
          }

          app.globalData.book_name = e.detail.value.book_name;
          app.globalData.content = e.detail.value.post_content;

          // 上传图片及表单内容
          wx.uploadFile({
            url: 'http://127.0.0.1:8000/api/post',
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
              } else {
                // 关闭当前页面，跳转到生成读书卡页面
                wx.navigateTo({
                  url: '../card/index?book=e.detail.value.book_name'
                })
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
    console.log('really?')
    console.error(err);
  },

  // 获取小程序码
  getQrcode() {
    var that = this;
    wx.request({
      url: "http://127.0.0.1:8000/api/qrcode",
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