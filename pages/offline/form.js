// pages/offline/form.js
import util from '../../utils/util'

var _js = require("../../utils/util.js");

//获取应用实例
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    region: ['北京市', '北京市', '朝阳区'],
    items: [
      {name: 1, value: '读书沙龙', checked: 'true'},
      {name: 2, value: '专题讲座'},
      {name: 3, value: '技能培训'},
    ],
    subject: '各种沙龙',
    token: '',
    imgList: [],
    time: '12:01',
    images: [],//临时图片地址
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    });
    wx.navigateTo({
      url: '../offline/index'
    })
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      subject: e.detail.value
    })
  },

  DateChange(e) {
    console.log('date 发生change事件，携带value值为：', e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
  TimeChange(e) {
    console.log('time 发生change事件，携带value值为：', e.detail.value);
    this.setData({
      time: e.detail.value
    })
  },
  RegionChange: function(e) {
    console.log('region 发生change事件，携带value值为：', e.detail.value);
    this.setData({
      region: e.detail.value
    })
  },

  // ChooseImage() {
  //   wx.chooseImage({
  //     count: 1, //默认9
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
  // DelImg(e) {
  //   wx.showModal({
  //     title: '才子',
  //     content: '确定要删除这张照片吗？',
  //     cancelText: '再看看',
  //     confirmText: '再见',
  //     success: res => {
  //       if (res.confirm) {
  //         this.data.imgList.splice(e.currentTarget.dataset.index, 1);
  //         this.setData({
  //           imgList: this.data.imgList
  //         })
  //       }
  //     }
  //   })
  // },


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
    console.log('city' + e.detail.value.city)
    console.log(e.detail.value)

    var that = this;
    that.data.userInfo = app.globalData.userInfo;
    if (e.detail.value.title.length == 0 || e.detail.value.address.length == 0 || e.detail.value.contact_name.length == 0 || e.detail.value.phone.length == 0 || e.detail.value.description.length == 0) {
      wx.showToast({
        title: '请补全必填信息!',
        icon: 'loading',
        duration: 1500
      });
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      console.log(that.data.images[0]);

      // 提交表单
      wx.getStorage({
        key: 'token',
        success: function(res) {
          console.log(that.data.images[0]);
          // 表单提交的数据
          var data = {
            company: e.detail.value.company,
            title: e.detail.value.title,
            date: that.data.date,
            time: that.data.time,
            city: e.detail.value.city.join('|'),
            
            address: e.detail.value.address,
            contact: e.detail.value.contact_name,
            phone: e.detail.value.phone,
            email: e.detail.value.email,
            subject: that.data.subject,
            description: e.detail.value.description,
            token: res.data,
          }

       

          // 上传图片及表单内容
          wx.uploadFile({
            url: 'https://reading-api.oeaudio.com/api/offline',
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
                console.log('here it is');
                _js.login();
              } else {
                that.setData({
                  modalName: 'Image'
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
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var time = util.formatDate(new Date());
    this.setData({
      date: time
    });

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
});
