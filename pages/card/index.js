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

Page({
  data: {
    posterConfig: posterConfig.jdConfig,
    qrcode:'',
  },
  onPosterSuccess(e) {
    getQrcode()
    const { detail } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    })
  },
  onPosterFail(err) {
    console.error(err);
  },

  /**
   * 异步生成海报
   */
  onCreatePoster() {
    this.setData({ posterConfig: posterConfig.demoConfig }, () => {
      Poster.create(true);    // 入参：true为抹掉重新生成
    });
  },

  onCreateOtherPoster() {
    this.setData({ posterConfig: posterConfig.jdConfig }, () => {
      Poster.create(true);    // 入参：true为抹掉重新生成 
    });
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
        console.log(res)
        let qrcodeUrl = res.data; //服务器小程序码地址
        console.log(qrcodeUrl)
        that.setData({
          qrcode: 'https:'.res.path
        }) 
      },
      fail: function () { },
      // complete: options.complete || function () { }
    })
  },
})