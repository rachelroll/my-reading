import util from '../../utils/util'

const app = getApp();

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    contentHeight: 0,
    thinkList: [],
    // header: "佳禾读书会",
    footer1: "赶紧扫码参与佳禾读书会, ",
    footer2: "帮我点赞, 和我一起畅游在知识的海洋.",
    offset: 0,
    lineHeight: 30,
    content: '王小波的黄金时代有一片紫色的天空，天上飘着懒洋洋的云，他有好多奢望，想爱，想吃，想和陈清扬敦伟大的友谊。',
    time:'',
    book_name:'',
    userInfo:{}
  },

  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          offset: (res.windowWidth - 300) / 2
        });
      }
    });

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });

    this.getQrcode()

  },

  onShow: function () {
    this.getData()
  },

  getData: function () {
    let that = this;

    let i = 0;
    let lineNum = 1;
    let thinkStr = '';
    let thinkList = [];
    for (let item of that.data.content) {
      if (item === '\n') {
        thinkList.push(thinkStr);
        thinkList.push('a');
        i = 0;
        thinkStr = '';
        lineNum += 1;
      } else if (i === 19) {
        thinkList.push(thinkStr);
        i = 1;
        thinkStr = item;
        lineNum += 1;
      } else {
        thinkStr += item;
        i += 1;
      }
    }
    thinkList.push(thinkStr);
    that.setData({ thinkList: thinkList });
    that.createNewImg(lineNum);
  },

  drawSquare: function (ctx, height) {
    ctx.rect(0, 20, this.data.windowWidth, height); // 画布的起始位置
    ctx.setFillStyle("#f5f6fd");
    ctx.fill()
  },

  drawFont: function (ctx, content, height) {
    ctx.setFontSize(14);
    ctx.setFillStyle("#484a3d");
    ctx.fillText(content, this.data.offset, height);
  },

  drawLine: function (ctx, height) {
    ctx.beginPath();
    ctx.moveTo(this.data.offset, height);
    ctx.lineTo(this.data.windowWidth - this.data.offset, height);
    ctx.stroke('#eee');
    ctx.closePath();
  },

  createNewImg: function (lineNum) {
    let that = this;
    let ctx = wx.createCanvasContext('myCanvas');
    let contentHeight = lineNum * that.data.lineHeight + 480; // 画布的高度
    that.drawSquare(ctx, contentHeight);
    that.setData({ contentHeight: contentHeight });
    let height = 100; // 文字的位置
    for (let item of that.data.thinkList) {
      if (item !== 'a') {
        that.drawFont(ctx, item, height);
        height += that.data.lineHeight;
      }
    }
    // ctx.fillText(header, 50, 50);
    that.drawLine(ctx, lineNum * that.data.lineHeight + 400); // 分割线的位置
    that.drawFont(ctx, that.data.footer1, lineNum * that.data.lineHeight + 425); 
    that.drawFont(ctx, that.data.footer2, lineNum * that.data.lineHeight + 425 + that.data.lineHeight); 
    ctx.drawImage('../resources/user.png', that.data.windowWidth - that.data.offset - 50, lineNum * that.data.lineHeight + 410, 50, 50); // 图片的尺寸
    ctx.draw();
  },

  savePic: function () {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 50,
      width: that.data.windowWidth,
      height: that.data.contentHeight,
      canvasId: 'myCanvas',
      success: function (res) {
        util.savePicToAlbum(res.tempFilePath)
      }
    })
  },

  // 获取小程序码
  getQrcode() {
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
        let qrcodeUrl = res.data;//服务器小程序码地址
        console.log(qrcodeUrl)

      },
      fail: function () { },
      // complete: options.complete || function () { }
    })
  } 
  
});