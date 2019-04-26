//index.js
//获取应用实例
const app = getApp();

import { promisify } from './promisify'
var util = require('../../utils/util.js');
const wxGetImageInfo = promisify(wx.getImageInfo);

Page({
  data: {

  },

  onLoad(options) {
      var that = this;

      // 调用函数时，传入new Date()参数，返回值是日期和时间
      var time = util.formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      this.setData({
          time: time
      });

    var content = util.Sub(options.content)

      console.log(app.globalData.userInfo.nickName);

      Promise.all([
          wxGetImageInfo({
              src: '../../images/register-card@2x.png'
          }),
          // wxGetImageInfo({
          //     src: 'https://file.iviewui.com/weapp/dist/e5da9fdc97a0b3fb16c115d379820583.jpg'
          // })
      ]).then(res => {
          const ctx = wx.createCanvasContext('shareCanvas')
          let image_path = '../../' + res[0].path;
          console.log(image_path);
          console.log('昵称' + app.globalData.userInfo.nickName)

          // 底图
          ctx.drawImage(image_path, 15, 15, res[0].width/2, res[0].height/2)

          // 书名
          ctx.setFillStyle('#333');  // 文字颜色：黑色
          ctx.setFontSize(16);        // 文字字号：22px
          ctx.fillText('书名:《' + options.book + '》', 40, 180);

          // 昵称
          ctx.setFillStyle('#333');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText(app.globalData.userInfo.nickName, 250, 180);

          // 头像
          const avatarImgSize = 38
          ctx.drawImage(app.globalData.userInfo.avatarUrl, (640 - avatarImgSize) / 2, 156, avatarImgSize, avatarImgSize)

          // 报名时间
          ctx.setFillStyle('#666');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText('报名时间: ' + that.data.time, 40, 230);

          // 我的书评
          ctx.setFillStyle('#666');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText('我的书评:', 40, 260);

          const metrics = ctx.measureText(options.content)
          console.log(metrics.width)

         ctx.setFillStyle('#666');  // 文字颜色：黑色
         ctx.setFontSize(14);        // 文字字号：22px
            ctx.fillText(content, 40, 285);


          // 比赛规则
          ctx.setFillStyle('#666');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText('比赛规则:', 40, 340);

          ctx.setFillStyle('#666');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText('进入小程序注册账号，通读一本书，参与书籍评', 40, 365);

          ctx.setFillStyle('#666');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText('论比赛，邀请好友点赞，点赞数值达到一定量，', 40, 385);

          ctx.setFillStyle('#666');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText('即可获得小程序赠送的精美礼品。', 40, 405);

          ctx.setFillStyle('#666');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText('赶紧扫码参与佳禾读书会，帮我点赞，', 40, 445);

          ctx.setFillStyle('#666');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText('和我一起畅游在知识的海洋，给自己', 40, 465);

          ctx.setFillStyle('#666');  // 文字颜色：黑色
          ctx.setFontSize(14);        // 文字字号：22px
          ctx.fillText('创造机会做出改变。', 40, 485);



          // 小程序码
          const qrImgSize = 45;
          var qrUrl = app.globalData.qrcode;
          ctx.drawImage(qrUrl, (636 - qrImgSize) / 2, 430, qrImgSize, qrImgSize);

          ctx.stroke()
          ctx.draw()
      });
  },


  savePic: function () {
    wx.canvasToTempFilePath({//canvas 生成图片 生成临时路径
      canvasId: 'shareCanvas',
      success: function (res) {
        console.log(res)
          util.savePicToAlbum(res.tempFilePath)

        // wx.saveImageToPhotosAlbum({ //下载图片
        //   filePath: res.tempFilePath,
        //   success: function () {
        //     wx.showToast({
        //       title: "保存成功",
        //       icon: "success",
        //     })
        //   }
        // })
      }
    })


  }
});
